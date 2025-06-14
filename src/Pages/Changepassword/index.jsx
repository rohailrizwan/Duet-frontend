import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { NewButton2 } from '../../Components/BtnComponent';
import Container from '../../Components/Container';
import { useSelector } from 'react-redux';
import authServices from '../../apis/auth';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import OTPInput from 'react-otp-input';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const user = useSelector((state) => state?.auth?.user)
  const [loader, setloader] = useState(true)
  const [isloading, setisloading] = useState(false)
  const [otp, setOtp] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log(user);

  const onSubmit = async (data) => {

    if (otp.length < 4) {
      ErrorToaster('OTP must be at least 4 digits long');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      ErrorToaster('New password and confirm password do not match');
      return;
    }
    setisloading(true)
    try {
      const obj = {
        otp: otp,
        newPassword: data?.newPassword,
        email: user?.email
      };
      const response = await authServices?.reset(obj)
      if (response) {
        SuccessToaster(response?.message || "Password reset successfully")
        setisloading(false)
      }
    } catch (error) {
      ErrorToaster(error || 'An error occurred while processing your request');
      setisloading(false)
    }
  };

  const sendotp = async () => {
    try {
      const response = await authServices?.forget({ email: user?.email })
      if (response) {
        SuccessToaster(response?.message)
        setloader(false)
      }
    } catch (error) {
      setloader(false)
      ErrorToaster(error || "Something went wrong")
    }
  }

  useEffect(() => {
    sendotp()
  }, [])
  if (loader) {
    return (
      <Box sx={{ py: 4, minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Container>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Change Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="body1"
              style={{
                color: "#666",
                marginBottom: "32px",
                fontSize: "16px",
                lineHeight: "1.5",
                fontSize: { md: "24px", sm: "18px", xs: "18px" },

              }}
            >
              Enter the 4-digit verification code sent to your device
            </Typography>
            <Box style={{ marginBottom: "32px", justifyContent: "center", display: 'flex' }}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: 600,
                  textAlign: "center",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  backgroundColor: "#fafafa",
                  color: "#1a1a1a",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                renderSeparator={
                  <span
                    style={{
                      margin: "0 8px",
                      color: "#ddd",
                      fontSize: "20px",
                      fontWeight: "bold",

                    }}
                  >
                    •
                  </span>
                }
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: "56px !important",
                      height: "56px !important",
                      // padding:"10px 25px",
                      fontSize: "24px",
                      fontWeight: "600",
                      textAlign: "center",
                      border: "2px solid #e0e0e0",
                      borderRadius: "12px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      // backgroundColor: "#fafafa",
                      color: "black",
                      ...props.style,
                      ...(props.value && {
                        borderColor: "#1976d2",
                        backgroundColor: "#f3f8ff",
                      }),
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#1976d2"
                      e.target.style.backgroundColor = "#f3f8ff"
                      e.target.style.boxShadow = "0 0 0 3px rgba(25, 118, 210, 0.1)"
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.style.borderColor = "#e0e0e0"
                        e.target.style.backgroundColor = "#fafafa"
                      }
                      e.target.style.boxShadow = "none"
                    }}
                  />
                )}
              />
            </Box>
            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('newPassword') || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2 }}>
              <NewButton2 title='Change Password' loading={isloading} />
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default ChangePassword;
