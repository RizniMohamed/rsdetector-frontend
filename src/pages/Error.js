import React from 'react';
import { Button, Container, Typography } from '@mui/material';


const NotFoundPage = () => {

  return (
    <Container sx={theme => {
      return {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[200],
      }
    }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={theme => {
          return {
            marginTop: theme.spacing(2),
          }
        }}
        onClick={() => window.location.href = '/'}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
