import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Logo from './Logo';

const pages = ['Home', 'Real Time', 'Uploads'];

function Header({page,setPage}) {

    const handlePages = (page) => {
        setPage(page)
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{display:"flex", alignItems:"center"}}>
                <Box component="img" src={Logo} sx={{
                    width: 50,
                    height: 50,
                    marginRight:1,
                    bgcolor:"white",
                    padding:0.5,
                    borderRadius:1,
                }}/>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color:"white"
                        }}
                    >
                        RSDetector
                    </Typography>

                   
                    <Box sx={{ flexGrow: 1, display:'flex'  }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={ () => handlePages(page)}
                                sx={theme => { return { my: 2, color: 'white', borderBottom:"1.5px solid white", mr:1, fontWeight:700, width:90, padding:0, borderRadius:1}}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
