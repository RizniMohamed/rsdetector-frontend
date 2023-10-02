import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import video_img from '../images/video_default.jpeg';
import Logs from '../components/Logs';

const Uploads = () => {
  const videoRef = useRef(null);
  const logRef = useRef();
  const socketRef = useRef(null);
  const intervalRef = useRef(null);  
  const [isRecording, setIsRecording] = useState(false);

  const captureFrame = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return blob;
  };

  useEffect(() => {

    // WebSocket initialization
    
    // socketRef.current = new WebSocket('ws://127.0.0.1:8000/ws');
    socketRef.current = new WebSocket('wss://rsdetector.onrender.com/ws');

    socketRef.current.onopen = () => {
      logRef.current.log('WebSocket Client Connected');
    };

    socketRef.current.onmessage = (message) => {
      console.log(message);
      logRef.current.log(`Received: ${message.data}`);
    };

  
    // Request access to the user's camera and start the video stream
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
        videoRef.current.srcObject = stream;
        logRef.current.log('Camera initialized');
      } catch (error) {
        logRef.current.log('Error accessing camera: ' + error.message);
      }
    };

    initCamera();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();  // Close the WebSocket connection
      }
    };

  }, []);

  const handleStart = () => {
    setIsRecording(true);
    logRef.current.log('Recording started');
  };

  const handleStop = () => {
    setIsRecording(false);
    clearInterval(intervalRef.current); 
    logRef.current.log('Recording stopped');
  };

  useEffect(() => {
   
    if (isRecording) {
      intervalRef.current = setInterval(async () => {  // Store the interval ID in the ref
        const frame = await captureFrame();
        if (socketRef.current.readyState === WebSocket.OPEN) {  // Check if the WebSocket connection is open
          frame.arrayBuffer().then(buffer => {
            socketRef.current.send(buffer);
          });
        }
      }, 500);  
    } else {
      clearInterval(intervalRef.current);  
    }

    return () => {
      clearInterval(intervalRef.current);  
    };
  }, [isRecording]);


  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={10}>
      <Box sx={{ border: "1px solid red", width: [300, 600], height: [200, 400], backgroundImage: `url(${video_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%" }}>
        <video ref={videoRef} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} autoPlay muted></video>
      </Box>
      <Box display="flex">
        {!isRecording ? (
          <Button variant='contained' size='small' sx={{ my: 2 }} onClick={handleStart}>Start</Button>
        ) : (
          <Button variant='contained' size='small' sx={{ my: 2 }} onClick={handleStop}>Stop</Button>
        )}
      </Box>
      <Logs ref={logRef} />
    </Box>
  );
};

export default Uploads;
