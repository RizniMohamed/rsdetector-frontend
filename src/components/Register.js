import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { register } from '../api';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Register = () => {

    const navigate = useNavigate()
    const handleLogin = () => navigate('/')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = email ? (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? "" : "Email is not valid") : "Email is required";
        tempErrors.password = password ? "" : "Password is required";
        tempErrors.confirmPassword = confirmPassword ? (password === confirmPassword ? "" : "Passwords do not match") : "Confirm Password is required";
        setErrors({
            ...tempErrors
        });
        return Object.values(tempErrors).every(x => x === "");
    }

    const handleRegister = async () => {
        if (validate()){
            const resp = await register({email,password})
            console.log(resp);
            if (resp.status === 0)
                handleLogin()
            else
                alert(resp.message)
        }
    }
    if (matchesSM)
    return (
        <Box >
            <Typography sx={{
                fontSize: [15, "39px"],
                mt: "80px",
                color: "#C9C9C9",
                fontFamily: "poppins",
                fontWeight: 600
            }}>Welcome to RS Detector,</Typography>
            <Typography sx={{
                fontSize: [15, "28px"],
                fontFamily: "poppins",
                color: "#9F9F9F",
            }}>Register Your Account</Typography>

            <Box mt={10}>
                <Typography sx={{
                    fontSize: [15, "28px"],
                    color: "#C9C9C9",
                    fontFamily: "poppins",
                }}>Email</Typography>
                <TextField
                    variant='filled'
                    size='small'
                    InputProps={{ disableUnderline: true }}
                    sx={{
                        '.MuiFilledInput-root': {
                            borderRadius: 3,
                            width: "480px",
                            fontFamily: "poppins",
                            border: "1px solid red"
                        },
                        '.MuiFilledInput-root input': {
                            padding: 1,
                        },
                    }}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <Box mt={4}>
                    <Typography sx={{
                        fontSize: [15, "28px"],
                        color: "#C9C9C9",
                        fontFamily: "poppins",
                    }}>Password</Typography>
                    <TextField
                        variant='filled'
                        size='small'
                        type='password'
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            '.MuiFilledInput-root': {
                                borderRadius: 3,
                                width: "480px",
                                border: "1px solid red"
                            },
                            '.MuiFilledInput-root input': {
                                padding: 1,
                            },
                        }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Box>

                <Box mt={4}>
                    <Typography sx={{
                        fontSize: [15, "28px"],
                        fontFamily: "poppins",
                        color: "#C9C9C9",
                    }}>Confirm Password</Typography>
                    <TextField
                        variant='filled'
                        size='small'
                        type='password'
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            '.MuiFilledInput-root': {
                                borderRadius: 3,
                                width: "480px",
                                fontFamily: "poppins",
                                border: "1px solid red"
                            },
                            '.MuiFilledInput-root input': {
                                padding: 1,
                            },
                        }}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Box>

                <Box mt={4} display="flex" justifyContent="center" width="480px">
                    <Button onClick={handleRegister}
                        variant='contained'
                        size='small'
                        sx={{ my: 2, width: "176px", borderRadius: 5 }}
                    >Register</Button>
                </Box>

                <Box
                    mt={7} display="flex" justifyContent="center" width="480px">
                    <Typography sx={{
                        fontSize: [15, "17px"],
                        color: "#C9C9C9",
                    }}>Already have an account? <Box sx={{ cursor: "pointer" }} onClick={handleLogin} component="span" color="red">Login</Box> </Typography>
                </Box>

            </Box>
        </Box>
    )
    else
        return (
            <Box mt={1} display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{
                    fontSize: 15,
                    color: "#C9C9C9",
                    fontFamily: "poppins",
                    fontWeight: 600,
                }}>Welcome to RS Detector,</Typography>
                <Typography sx={{
                    fontSize: 15,
                    fontFamily: "poppins",
                    color: "#9F9F9F",
                }}>Register Your Account</Typography>

                <Box mt={2}>
                    <Typography sx={{
                        fontSize: 15,
                        fontFamily: "poppins",
                        color: "#C9C9C9",
                    }}>Email</Typography>
                    <TextField
                        variant='filled'
                        size='small'
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            '.MuiFilledInput-root': {
                                borderRadius: 2,
                                padding: 0,
                                height: 35,
                                width: "70vw",
                                fontFamily: "poppins",
                                border: "1px solid red"
                            },
                            '.MuiFilledInput-root input': {
                                padding: 1,
                            },
                        }}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Box>


                <Box mt={1}>
                    <Typography sx={{
                        fontSize: 15,
                        color: "#C9C9C9",
                        fontFamily: "poppins",
                    }}>Password</Typography>
                    <TextField
                        variant='filled'
                        size='small'
                        type='password'
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            '.MuiFilledInput-root': {
                                borderRadius: 2,
                                padding: 0,
                                height: 35,
                                width: "70vw",
                                fontFamily: "poppins",
                                border: "1px solid red"
                            },
                            '.MuiFilledInput-root input': {
                                padding: 1,
                            },
                        }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Box>

                <Box mt={1}>
                    <Typography sx={{
                        fontSize: 15,
                        color: "#C9C9C9",
                        fontFamily: "poppins",
                    }}>Confirm Password</Typography>
                    <TextField
                        variant='filled'
                        size='small'
                        type='password'
                        InputProps={{ disableUnderline: true }}
                        sx={{
                            '.MuiFilledInput-root': {
                                borderRadius: 2,
                                padding: 0,
                                height: 35,
                                width: "70vw",
                                fontFamily: "poppins",
                                border: "1px solid red"
                            },
                            '.MuiFilledInput-root input': {
                                padding: 1,
                            },
                        }}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Box>

                <Box mt={1} display="flex" justifyContent="center">
                    <Button onClick={handleRegister}
                        variant='contained'
                        size='small'
                        sx={{ my: 2, width: "176px", borderRadius: 5 }}
                    >Register</Button>
                </Box>

                <Box
                    my={2} display="flex" justifyContent="center">
                    <Typography sx={{
                        fontSize: [15, "17px"],
                        color: "#C9C9C9",
                    }}>Already have an account? <Box sx={{ cursor: "pointer" }} onClick={handleLogin} component="span" color="red">Login</Box> </Typography>
                </Box>

            </Box>
        )
}

export default Register