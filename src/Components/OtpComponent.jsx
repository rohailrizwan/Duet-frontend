"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import OTPInput from "react-otp-input"

const OtpComponent = ({ visible, onClose, onVerify, onResend, otploading }) => {
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    let timer
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendTimer])

  const handleResend = () => {
    setResendTimer(30)
    onResend()
  }

  const handleVerify = () => {
    onVerify(otp)
  }

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "8px",
          boxShadow:
            "0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          paddingBottom: "8px",
          position: "relative",
          fontWeight: 600,
          fontSize: {md:"24px",sm:"18px",xs:"18px"},
          color: "#1a1a1a",
        }}
      >
        Verify Your Account
        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            right: "8px",
            top: "8px",
            color: "#666",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ padding: "0 24px 32px 24px" }}>
        <Box style={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            style={{
              color: "#666",
              marginBottom: "32px",
              fontSize: "16px",
              lineHeight: "1.5",
          fontSize: {md:"24px",sm:"18px",xs:"18px"},

            }}
          >
            Enter the 4-digit verification code sent to your device
          </Typography>

          <Box style={{ marginBottom: "32px",justifyContent: "center",display:'flex' }}>
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

          <Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={5}>
    <Button
      fullWidth
      variant="contained"
      onClick={handleVerify}
      disabled={otp.length !== 4 || otploading}
      style={{
        height: "48px",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        backgroundColor: otp.length === 4 && !otploading ? "#1976d2" : "#ccc",
        boxShadow: otp.length === 4 && !otploading ? "0 4px 12px rgba(25, 118, 210, 0.3)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {otploading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Verify Code"}
    </Button>
  </Grid>

  <Grid item xs={12} sm={6} md={5}>
    <Button
      fullWidth
      variant="outlined"
      onClick={handleResend}
      disabled={resendTimer > 0}
      style={{
        height: "48px",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        borderColor: resendTimer > 0 ? "#ccc" : "#1976d2",
        color: resendTimer > 0 ? "#ccc" : "#1976d2",
        transition: "all 0.2s ease",
      }}
    >
      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
    </Button>
  </Grid>
</Grid>

          {resendTimer > 0 && (
            <Typography
              variant="caption"
              style={{
                display: "block",
                marginTop: "16px",
                color: "#999",
                fontSize: "14px",
              }}
            >
              Didn't receive the code? Please wait before requesting a new one.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default OtpComponent
