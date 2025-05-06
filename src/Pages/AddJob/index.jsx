import { Box, TextField, Grid, Paper } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../Components/Container';
import { NewButton2 } from '../../Components/BtnComponent';
import Headertext from '../../Components/Headertext';

function AddJob() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ py: 0, minHeight: '100vh' }}>
      <Container>
        <Headertext title={"Post a Job"} />

        <Paper 
          elevation={3} 
          sx={{ p: 4, borderRadius: 4, backgroundColor: '#ffffff', mt: 3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Name"
                  variant="outlined"
                  fullWidth
                  {...register('jobName', { required: 'Job Name is required' })}
                  error={!!errors.jobName}
                  helperText={errors.jobName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  {...register('companyName', { required: 'Company Name is required' })}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Timing"
                  variant="outlined"
                  fullWidth
                  {...register('timing', { required: 'Timing is required' })}
                  error={!!errors.timing}
                  helperText={errors.timing?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  {...register('location', { required: 'Location is required' })}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  {...register('description', { required: 'Description is required' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  type='number'
                  variant="outlined"
                  fullWidth
                  {...register('phone_number', { required: 'Phone Number is required' })}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <NewButton2 title="Post Job" radius={2} type="submit" />
              </Grid>

            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddJob;
