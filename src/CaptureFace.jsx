import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [found, setFound] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);



  // Connect to WebSocket server
  useEffect(() => {
    const newSocket = io("http://localhost:5001"); // Replace with your Flask server URL
    setSocket(newSocket);

    // Handle incoming messages once socket is connected
    newSocket.on("response", (data) => {
      console.log("Connected!");
    });

    // Cleanup on component unmount
    return () => newSocket.close();
  }, []);


  //===================================================================================================

  // Capture the image from the webcam
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  // Auto capture every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      capturePhoto();
    }, 5000);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, [capturePhoto]);

  //===================================================================================================

  // Send captured image to the server when it's available and not found
  useEffect(() => {
    if (image && !found && socket) {
      socket.emit("send_to_flask", image);
    }
  }, [image, found, socket]);

  // Listen for responses from the Flask server
  useEffect(() => {
    if (socket) {
      socket.on("receive_from_flask", (response) => {
        console.log("Response received from Flask:", response);
        if (response) {
          setPersonalInfo(response);
          setFound(true);
          navigate("/view-profile", { state: { data: response } });
        }
      });

      // Cleanup the event listener when the component unmounts
      return () => {
        socket.off("receive_from_flask");
      };
    }
  }, [socket, navigate]);
// 

  const videoConstraints = {
    width: 500,
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

      {/* Display captured image */}
      {/* {image && (
        <div className="captured-image mt-4">
          <h2 className="text-xl text-white">Captured Image:</h2>
          <img
            src={image}
            alt="Captured"
            className="rounded-md border-2 border-white"
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      )} */}

      {/* Display personal information if a match is found */}
      {found && personalInfo && (
        <div className="profile-info mt-4">
          <h2 className="text-xl text-white">Profile Found:</h2>
          <p className="text-white">{JSON.stringify(personalInfo)}</p>
        </div>
      )}
    </div>
  );

};

export default Camera;
