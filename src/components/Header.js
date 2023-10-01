import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Logo from './Logo';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pages = [
    { name: 'Home', path: "" },
    { name: 'Real Time', path: "realtime" },
    { name: 'Uploads', path: "uploads" },
];

function Header({ page, setPage }) {

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handlePages = (page) => {
        navigate("/"+page);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: sm && "center", my: sm && 1 }}>
                <Box component="img" src={Logo} sx={{
                    width: 50,
                    height: 50,
                    marginRight: 1,
                    bgcolor: "white",
                    padding: 0.5,
                    borderRadius: 1,
                }} />
                <Toolbar disableGutters>
                    <Box>
                        <Typography
                            noWrap
                            sx={{
                                m:0,
                                p:0,
                                mr: 2,
                                fontWeight: 700,
                                color: "white",
                                fontSize:22,
                            }}
                        >
                            RSDetector
                        </Typography>
                        <Typography
                            noWrap
                            sx={{
                                m: 0,
                                p: 0,
                                mr: 2,
                                fontWeight: 500,
                                color: "white",
                                fontStyle:"italic"

                            }}
                        >
                            Detect, Alert, and Safety
                        </Typography>
                    </Box>


                    {!sm && (
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handlePages(page.path)}
                                    sx={theme => { return { my: 2, color: 'white', borderBottom: "1.5px solid white", mr: 1, fontWeight: 700, width: 90, padding: 0, borderRadius: 1 } }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                    )}

                </Toolbar>



            </Container>

            {sm && (
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "space-evenly"}}>
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={() => handlePages(page.path)}
                            sx={theme => { return { my: 2, color: 'white', borderBottom: "1.5px solid white", mr: 1, fontWeight: 700, width: 90, padding: 0, borderRadius: 1 } }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box>
            )}
        </AppBar>
    );
}
export default Header;
