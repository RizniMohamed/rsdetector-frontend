import { Box, Typography } from '@mui/material';
import React from 'react';
import Login from '../components/Login';
import bg from "../res/auth/bg.png";
import mbg from "../res/auth/mobile/bg.png";
import logo from "../res/auth/logo.png";
import { useLocation } from 'react-router-dom';
import Register from '../components/Register';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Auth = () => {
    let location = useLocation();

    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    if (bigScreen)
        return (
            <Box display="flex" alignItems="center" justifyContent="center" px={[1, 0]} position="relative">
                <Box bgcolor="#232323" width={["100%", "1280px"]} position="relative">
                    <Box component={'img'} sx={{ fontFamily: "poppins", objectFit: "fit", minWidth: "716px", height: "100vh", zIndex: 5 }} src={bg} alt='road background' />
                    <Box component={'img'} position="absolute" width={["300px", "450px"]} sx={{ fontFamily: "poppins", objectFit: "fit", top: ["80px", "180px"], left: ["30px", "108px"] }} src={logo} alt='road background shade' />
                    <Typography sx={{
                        position: "absolute",
                        top: ["97px", "470px"],
                        left: ["95px", "220.5px"],
                        color: "black",
                        fontSize: [15, 25],
                        fontFamily: "poppins",
                        fontStyle: "italic",
                        fontWeight: 600
                    }}>Detect, Alert, and Saftey</Typography>
                    <Typography sx={{
                        position: "absolute",
                        top: ["97px", "500px"],
                        left: ["95px", "49.5px"],
                        color: "black",
                        fontFamily: "poppins",
                        fontSize: [15, 25],
                        mt: 10,
                        fontWeight: 600
                    }}>AI Powered Road Sign Detection & Audio Feedback</Typography>
                    <Box width={["100%", "613px"]} height="100%" sx={{ bgcolor: "#232323", position: "absolute", top: 0, right: 0, zIndex: 2, pl: "40px" }}>
                        {location.pathname.includes('register') ? <Register /> : <Login />}
                    </Box>
                </Box>
            </Box>
        )
        else  return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={[1, 0]}>
            <Box position="relative" width={["100%", "1280px"]} height={["360px", "700px"]}>
                <Box component={'img'} position="absolute" width="100%" height="100%" sx={{ objectFit: "cover" }} src={mbg} alt='road background' />

                <Box display="flex" flexDirection="column" mt={[4, 2]} alignItems="center"  position="absolute" width="100%" height="100%">
                    <Box component={'img'}  width={["200px"]} sx={{ objectFit: "cover", mt:5 }} src={logo} alt='road background shade' />
                    <Typography sx={{
                        color: "black",
                        fontFamily: "poppins",
                        fontSize: 15,
                        mt:1,
                        fontStyle: "italic",
                        fontWeight: 600
                    }}>Detect, Alert, and Saftey</Typography>
                    <Typography sx={{
                        color: "black !important",
                        fontSize: 13,
                        mt:5,
                        fontWeight: 600,
                        fontFamily: "poppins",
                        marginBottom: "15px"
                    }}>AI Powered Road Sign Detection & Audio Feedback</Typography>
                </Box>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#232323" height="calc( 100vh - 360px)" width={["100%", "1280px"]} >
                {location.pathname.includes('register') ? <Register /> : <Login />}
            </Box>
        </Box>
        )
}

export default Auth