import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import video_img from '../images/video_default.jpeg'

const Realtime = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [logs, setLogs] = useState([]);  
  const videoRef = useRef(null);
  const canvasRef = useRef(null); 


  function getTimestamp() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return timestamp;
  }

  const log = (message) => {
    setLogs(prevLogs => [...prevLogs, `${getTimestamp()}: ${message}`])
  }

  const captureFrame = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording' && videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);


      canvas.toBlob((blob, i) => {
        // Log the API call for now
        log(`blob ${blob.size}`);
        // For future reference: send blob to your API
        // sendFrameToAPI(blob);
      });
    }
  };


  useEffect(() => {
    let frameInterval;
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      frameInterval = setInterval(captureFrame, 100);  // Set interval to capture frames every 100ms (10 frames per second)
    }

    return () => {
      clearInterval(frameInterval);  // Clear interval when component is unmounted or mediaRecorder state changes
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaRecorder?.state]);

  const initVideo = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      log(`MediaRecorder configuration Failed`)
      log(`MediaDevices API not supported on your device/browser.`)
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const recorder = new MediaRecorder(stream);

      recorder.onstart = () => {
        log(`MediaRecorder Started`)
      };

      recorder.onerror = (event) => {
        log('MediaRecorder error: ', event.error);
      };
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        // const blob = new Blob(chunks, { type: 'video/webm' });
        log('MediaRecorder stopped');
      };

      videoRef.current.srcObject = stream;
      log(`MediaRecorder configuration initiated`)

    } catch (error) {
      log('Error accessing media devices.')
      console.error('Error accessing media devices.', error);
    }
  };

  useEffect(() => {
    initVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleStart = () => {
    if (mediaRecorder) {
      mediaRecorder.start()
    }
  };

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
        <Button variant='contained' size='small' sx={{ my: 2, mr: 2 }} onClick={handleStart}>Start</Button>
        <Button variant='contained' size='small' sx={{ my: 2, mr: 2 }} onClick={handleStop}>Stop</Button>
      </Box>
      <canvas ref={canvasRef} style={{ display: "none" }} ></canvas>  {/* Hidden canvas element */}

      <Box sx={{
        border: "1px solid red",
        width: [300, 600],
        height: [200, 400],
        overflowY: 'auto'  // Make the box scrollable
      }}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </Box>
    </Box>
  );
};

export default Realtime;
