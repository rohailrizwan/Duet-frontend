import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import OTPInput from 'react-otp-input';
import { CircularProgress } from '@mui/material';


const OtpComponent = ({ visible, onClose, onVerify, onResend,otploading }) => {
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleResend = () => {
        setResendTimer(30);
        onResend(); // Call parent resend function
    };

    const handleVerify = () => {
        onVerify(otp);
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            title="Enter OTP"
            centered
        >
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <div className="otp-container">
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span className="separator">-</span>}
                        renderInput={(props) => (
                            <input className="otp-input" {...props} />
                        )}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <Button
                        type="primary"
                        onClick={handleVerify}
                        disabled={otp.length !== 4}
                        style={{ marginRight: 10 }}
                    >
                        {otploading?<CircularProgress size={12} color='white'/>:'Verify'}
                        
                    </Button>

                    <Button
                        onClick={handleResend}
                        disabled={resendTimer > 0}
                    >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default OtpComponent;
