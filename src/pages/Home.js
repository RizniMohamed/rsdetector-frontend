import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Road Sign Detection
            </Typography>
            <Typography variant="body1" paragraph sx={{  color: "white" }}>
                Welcome to our Road Sign Detection project. This project utilizes a custom CNN architecture and YOLO v8 for real-time road sign detection. Our model is capable of detecting 11 different road signs with an accuracy of 99%.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Features:
            </Typography>
            <ul sx={{
                listStyle: 'none',
                pl: 0,
                textAlign: 'left',
                '& li': {
                    mb: 1,
                    '&::before': {
                        content: '"• "',
                        color: 'primary.main',
                    }
                }
            }}>
                <li>Real-time road sign detection</li>
                <li>Audio feedback for detected signs</li>
                <li>Detailed logging mechanism</li>
                <li>JWT authentication</li>
            </ul>
            <Button variant="contained" color="primary" component={Link} to="/realtime" sx={{ mt: 4 }}>
                Go to Real-Time Detection
            </Button>
            <Typography variant="body1" paragraph sx={{ mt: 8, color:"white" }}>
                Our application employs JWT for secure authentication, ensuring a protected user experience.
            </Typography>
        </Container>
    );
};

export default Home;
