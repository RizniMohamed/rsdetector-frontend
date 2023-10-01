import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

const Realtime = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);

  const handleStart = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('MediaDevices API not supported on your device/browser.');
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
        console.log('blob', blob)
        // Send blob to your backend
      };

      videoRef.current.srcObject = stream;
      recorder.start();
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="calc( 100vh - 100px)" alignItems="center" my={10}>
      <Box sx={{ border: "1px solid red", width: [300, 600], height: [200, 500] }}>
        <video ref={videoRef} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} autoPlay muted></video>
      </Box>
      <Button variant='contained' size='small' sx={{ my: 2 }} onClick={handleStart}>Start</Button>
      <Button variant='contained' size='small' sx={{ my: 2 }} onClick={handleStop}>Stop</Button>
    </Box>
  );
};

export default Realtime;
