import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import video_img from '../images/video_default.jpeg'
import Logs from '../components/Logs';
import { send_blob } from '../api'

const Realtime = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // eslint-disable-next-line
  const [refresh, setRefresh] = useState(false);
  const logRef = useRef();
  const isRecordingRef = useRef(false);

  let captureTimeout = null;  // Declare captureTimeout variable outside of functions


  const captureFrame = async () => {
    if (!isRecordingRef.current || !videoRef.current || !canvasRef.current) {
      return;  // Exit function if not recording or refs are null
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 9 * 100;
    canvas.height = 16 * 100;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      await sendFrameToAPI(blob);  // Wait for the API call to complete
      captureTimeout = setTimeout(captureFrame, 100);  // Then wait an additional 100ms before capturing the next frame
    });
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };


  const sendFrameToAPI = async (blob) => {

    try {
      const formData = new FormData();
      formData.append('file', blob);
      const response = await send_blob(formData)
      console.log("response", response);
      if (response.message !== "No sign detected") {
        speak(response.message)
      }
      logRef.current.log(`API Response:  ${response.message}`)
    } catch (error) {
      logRef.current.log('Error on API call.')
      console.error('Error on API call.', error);
    }

  };


  const initVideo = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      logRef.current.log(`MediaRecorder configuration Failed`)
      logRef.current.log(`MediaDevices API not supported on your device/browser.`)
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: 16 * 100,
          height: 9 * 100
        }
      });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.onstart = () => {
        logRef.current.log(`MediaRecorder Started`)
        setRefresh(Math.random())
        isRecordingRef.current = true;
        captureFrame();

      };

      recorder.onerror = (event) => {
        logRef.current.log('MediaRecorder error: ', event.error);
      };

      recorder.onstop = async () => {
        setRefresh(Math.random())
        isRecordingRef.current = false;
        clearTimeout(captureTimeout);
        logRef.current.log('MediaRecorder stopped');
      };

      videoRef.current.srcObject = stream;
      logRef.current.log(`MediaRecorder configuration initiated`)

    } catch (error) {
      logRef.current.log('Error accessing media devices.')
      console.error('Error accessing media devices.', error);
    }
  };

  useEffect(() => {
    initVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStart = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }

  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={10}>
      <Box sx={{ border: "1px solid red", width: [16 * 22, 16 * 50], height: [9 * 22, 9 * 50], backgroundImage: `url(${video_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%" }}>
        <video ref={videoRef} style={{
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        }} autoPlay muted></video>
      </Box>
      <Box display="flex">
        {mediaRecorder?.state === 'inactive' ? (
          <Button disabled={mediaRecorder?.state !== 'inactive'} variant='contained' size='small' sx={{ my: 2 }} onClick={handleStart}>Start</Button>
        ) : (
          <Button disabled={mediaRecorder?.state !== 'recording'} variant='contained' size='small' sx={{ my: 2 }} onClick={handleStop}>Stop</Button>
        )}
      </Box>
      <Box sx={{ border: "1px solid red", width: [16 * 22, 16 * 50], height: [9 * 22, 9 * 50], mb: 2 }}>
        <canvas ref={canvasRef} style={{
          display: "",
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        }} ></canvas>  {/* Hidden canvas element */}
      </Box>

      <Logs ref={logRef} />

    </Box>
  );
};

export default Realtime;
