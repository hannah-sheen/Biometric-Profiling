import React, { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const handleProceed = async ({profile, setUrl}) => {
  await fetch('http://localhost:5000/temp-profile', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({data, capturedImage})
})
}; 

const Camera = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const queryClient = useQueryClient();
  // const location = useLocation();
  const profile = location.state?.profile;

  //get Screenshot
  const capturePhoto = React.useCallback(() => {
    if (webcamRef.current) {
      const imgsrc = webcamRef.current.getScreenshot();
      setUrl(imgsrc);
    } 
  }, [webcamRef]);

  // Auto capture after the component renders timer
  useEffect(() => { 
    if (webcamRef.current || !url) {
      const timer = setTimeout(() => {
        capturePhoto();
      }, 5000); // Capture after 0.5 seconds
    
      return () => clearTimeout(timer); // Clear the timeout on cleanup
    }
  }, [url, capturePhoto, webcamRef]);


  // Retry capture
  const handleRetry = () => {
    setUrl(null); // Reset URL to trigger a new capture
  };


  const createMutation = useMutation({
    mutationFn: handleProceed, 
    onSettled: () => {
        queryClient.invalidateQueries(['profile'])
        setUrl(null)   
    }
  })
  
  
  return (
    <div className="camera-container flex flex-col items-center justify-center h-[760px] bg-custom-blue rounded-lg drop-shadow-lg">
      {url ? (
        <div className="relative flex flex-col items-center mt-[5rem]">
          <img src={url} alt="Captured" className="mb-[4rem] rounded-md" />
          <div className="flex justify-center gap-[2rem] mt-[1rem]">
            <button
              onClick={handleProceed}
              className="w-[8rem] h-[3.5rem] bg-lime-700 text-white font-montserrat text-[16px] border-white border-[2px] rounded-md mr-[5rem]">Proceed</button>
            <button
              onClick={handleRetry}
              className="w-[8rem] h-[3.5rem] bg-red-700 text-white font-montserrat text-[16px] border-white border-[2px] rounded-md">Retry</button>
          </div>
        </div>
      ) : (
        <div className = "capture-container">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            mirrored={true}
          />
          <h1 className="text-[20px] font-montserrat text-white">Scanning...</h1>
        </div>
      )} 
    </div>
  );
};

export default Camera;
