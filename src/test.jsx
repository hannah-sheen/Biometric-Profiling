import {useRef, useState, useCallback, useEffect} from 'react'
import Webcam from "react-webcam"
import io from 'socket.io-client';
import {Alert, Button} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

const socket = io('http://127.0.0.1:5000');

const Scan = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [personalInfo, setPersonalInfo] = useState('');
    const [found, setFound] = useState(false);
    const navigate = useNavigate();

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc); 
    }, [webcamRef]);

    useEffect(() => {
        socket.on('receive_from_flask', (response) => {
            setPersonalInfo(response);
            if(response){
                setFound(true)
                navigate('/profile', { state : {data: response}});
            }
        });

        return () => {
            socket.off('receive_from_flask'); // Cleanup event listener on unmount
        };
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleCapture();
        }, 500);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [handleCapture]);

    useEffect(() => {
        if (capturedImage && !found) {
            socket.emit('send_to_flask', capturedImage);
        }
    }, [capturedImage, found]);

    const camera = <div className='w-full h-[100vh] p-10 flex flex-col items-center gap-3 bg-[#ECF8FF]'>

        {personalInfo == null && 
            <div className='w-[56rem] h-[5rem] absolute'>
                <Alert
                color="danger"
                description="Register your profile to continue"
                endContent={
                    <Link to='/register'>
                        <Button color="danger" size="sm" variant="flat">
                            Register
                        </Button>
                    </Link>  
                }
                title="Face Unrecognized"
                variant="faded"
                />
            </div>
        }

        <Webcam
            className='mt-[8rem]'
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width='50%'
            mirrored={true}
        />  

        <h1 className='text-[20px]'>Scanning...</h1>
    </div>
    return (<>
        {camera}
    </>)
}

export default Scan