import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import video_img from '../images/video_default.jpeg'

const Realtime = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [logs, setLogs] = useState([]);  // New state variable for logs
  const videoRef = useRef(null);

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

  const initVideo = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      log(`Video configuration Failed`)
      log(`MediaDevices API not supported on your device/browser.`)
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        log(`blob size ${blob.size}`)
        console.log('blob', blob)
      };

      videoRef.current.srcObject = stream;
      log(`Video configuration initiated`)

    } catch (error) {
      log('Error accessing media devices.')
      console.error('Error accessing media devices.', error);
    }
  };

  useEffect(() => {
    initVideo()
  }, [])


  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      log(`Video caputure stopped`)
    }
  };

  const handleStart = () => {
    if (mediaRecorder) {
      mediaRecorder.start()
      log(`Video caputure Started`)
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
