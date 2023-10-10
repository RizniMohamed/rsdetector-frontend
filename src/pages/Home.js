import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import logo from "../res/home/logo.png";
import img_roadbg from "../res/home/roadbg.png";
import roadbgshade from "../res/home/roadbgshade.png";
import Realtime from '../components/Realtime'

const Home = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={[1,0]}>
            <Box position="relative" width={["100%","1280px"]} height={["360px","700px"]}>
                <Box component={'img'} position="absolute" width="100%" height="100%" sx={{ objectFit: "cover" }} src={img_roadbg} alt='road background' />
                <Box component={'img'} position="absolute" width="100%" height="100%" sx={{ objectFit: "cover" }} src={roadbgshade} alt='road background shade' />
                <Box component={'img'} position="absolute" width={["300px", "508px"]} sx={{ objectFit: "cover", top: ["60px", "137px"], left: ["30px", "385px"] }} src={logo} alt='road background shade' />
                <Typography sx={{
                    position: "absolute",
                    top: ["97px", "200px"],
                    left: ["95px", "495px"],
                    color: "black",
                    fontSize: [15,25],
                    fontStyle: "italic",
                    fontWeight: 600
                }}>Detect, Alert, and Saftey</Typography>
                <Box display="flex" flexDirection="column" mt={[4,2]} alignItems="center" justifyContent="center" position="absolute" width="100%" height="100%">
                    <Typography sx={{
                        color: "black !important",
                        fontSize: [13,30],
                        fontWeight: 600,
                        fontFamily: "poppins",
                        marginBottom: ["15px","20px"]
                    }}>AI Powered Road Sign Detection & Audio Feedback</Typography>
                </Box>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#232323" width={["100%", "1280px"]} >
                <Realtime />
            </Box>
        </Box>

    );
};

export default Home;
