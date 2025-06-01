
import React, { useEffect, useState } from 'react';
import { Box, Card, TextField, Typography, Grid, InputAdornment, IconButton } from '@mui/material';
import loginimage from '../../assets/images/loginimage.jpg'
import { NewButton } from '../../Components/BtnComponent';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authServices from '../../apis/auth';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import OtpComponent from '../../Components/OtpComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState(false);
    const [otploading ,setotploading] = useState(false);
    const [otpModal, setotpModal] = useState(false);
    const [isloading, setisloading] = useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    const user=useSelector((state)=>state?.auth?.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleSubmit = async () => {
        setisloading(true)
        console.log(email, password);
        let obj = {
            email: email,
            password: password
        }
        console.log(obj);
        try {
            const response = await authServices?.postLogin(obj)
            if (response?.message) {
                console.log(response);
                SuccessToaster(response?.message)
                setotpModal(true)
                setisloading(false)
            }
            else {
                setisloading(false)
            }
        } catch (error) {
            console.log(error, "error");
            setisloading(false)
            ErrorToaster(error || '')
        }
    }
    const handleOtp=async(otp)=>{
        console.log(otp);
         let obj = {
            email: email,
            otp: otp
        }
        console.log(obj);
        setotploading(true)
        try {
            const response = await authServices?.verifyOtp(obj)
            if (response?.message) {
                console.log(response);
                SuccessToaster(response?.message || "Login Successfull")
                dispatch(setLogin({
                    user:response?.user,
                    token:response?.token
                }))
                setotploading(false)
                navigate('/profile/updateprofile')
            }
            else {
                setotploading(false)
            }
        } catch (error) {
            console.log(error, "error");
            setotpModal(true)
            setotploading(false)
            ErrorToaster(error || '')
        }
    }
    useEffect(()=>{
        if(user){
            navigate('/profile')
        }
    },[])
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
                    <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
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
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 3 }}
                                onChange={(e) => setpassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {!showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <NewButton title="Login" fullWidth={true} width="100%" type='submit' isloading={isloading} handleFunction={handleSubmit} />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
           <OtpComponent visible={otpModal} onClose={()=>setotpModal(false)} onVerify={handleOtp} onResend={handleSubmit} otploading={otploading}/>

        </Box>
    );
};

export default LoginPage;
