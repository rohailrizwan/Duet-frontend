import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { NewButton2 } from '../../Components/BtnComponent';
import Container from '../../Components/Container';

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Password Change Data:', data);
    // Call API here
    reset();
  };

  return (
    <Box>
      <Container>
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Change Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Current Password"
          type="password"
          {...register('currentPassword', { required: 'Current password is required' })}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          label="New Password"
          type="password"
          {...register('newPassword', {
            required: 'New password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm New Password"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          margin="normal"
        />

        <Box sx={{mt:2}}>
        <NewButton2 title='Change Password'/>
        </Box>
      </form>
    </Paper>
      </Container>
    </Box>
  );
}

export default ChangePassword;
