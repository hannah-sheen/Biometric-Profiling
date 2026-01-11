import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";


const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [user, userInfo] = useState(null);
  const [found, setFound] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  
  //WEBSOCKET CONNECTION
  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5001"); 
    setSocket(newSocket);
    newSocket.on("response", (data) => {
      console.log("Connected!");
    });
    return () => newSocket.close();
  }, []);

  
  // CAPTURE IMAGE FROM WEBCAM
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);


  // AUTOCAPTURE EVERY 5 SECONDS
  useEffect(() => {
    const timer = setInterval(() => {
      capturePhoto();
    }, 5000);
    return () => clearInterval(timer);
  }, [capturePhoto]);


  useEffect(() => {
    if (image && !found && socket) {
      socket.emit("send_to_flask", image);
    }
  }, [image, found, socket]);


  useEffect(() => {
    if (socket) {
      socket.on("receive_from_flask", (response) => {
        console.log("Response received from Flask:", response);
  
        if (response && response.status === "success") {
          userInfo(response.user);
          setFound(true);
          navigate("/view-profile", { state: { users: response.user } });
        } else if (response && response.status === "failure") {
          alert(response.message || "No profile found, register first.");
          navigate("/create-profile");
          location.reload()
        } else {
          alert("Unexpected error. Please try again.");
          navigate("/");
        }
      });
  
      return () => {
        socket.off("receive_from_flask");
      };
    }
  }, [socket, navigate]);
  

  

  const videoConstraints = {
    width: 600,
    facingMode: "environment",
  };

  return (
    <div className="camera-container flex flex-col items-center justify-center h-[760px] bg-custom-blue rounded-lg drop-shadow-lg">
      <div className = "webcam-container">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        mirrored={true} // Mirror the webcam for a more intuitive UI
        className="rounded-md"
      />
      <h1 className="text-[20px] font-montserrat text-white">Scanning...</h1>
      </div>

      {/* Display personal information if a match is found */}
      {found && userInfo && (
        <div className="profile-info mt-4">
          <h2 className="text-xl text-white">Profile Found:</h2>
          <p className="text-white">{JSON.stringify(userInfo)}</p>
        </div>
      )}
    </div>
  );

};

export default Camera;
