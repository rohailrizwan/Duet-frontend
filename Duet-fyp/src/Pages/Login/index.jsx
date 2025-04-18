
import React, { useState } from 'react';
import { Box, Card, TextField, Typography, Grid, InputAdornment, IconButton } from '@mui/material';
import loginimage from '../../assets/images/loginimage.jpg'
import { NewButton } from '../../Components/BtnComponent';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#E6F0FA',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
        >
            <Card sx={{ maxWidth: 900, width: '100%', borderRadius: 4, boxShadow: 3 }}>
                <Grid container>
                    {/* Left Image Section */}
                    <Grid item xs={12} md={6} sx={{display:{xs:"none",md:"block"}}}>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundImage: `url(${loginimage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderTopLeftRadius: 16,
                                borderBottomLeftRadius: 16,
                                minHeight: 400,
                            }}
                        />
                    </Grid>

                    {/* Right Form Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h5" className='font_poppins colorgradient' gutterBottom sx={{ color: '#1E3A8A', fontWeight: 'bold' }}>
                                Welcome Back
                            </Typography>

                            <Typography variant="body1" className='font_poppins' gutterBottom sx={{ mb: 3, color: '#4B5563' }}>
                                Please login to your account
                            </Typography>

                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 3 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <NewButton title="Login" fullWidth={true} width="100%" />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default LoginPage;
