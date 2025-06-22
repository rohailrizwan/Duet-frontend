import { Box, TextField, Grid, Paper, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import Container from '../../Components/Container';
import { NewButton2 } from '../../Components/BtnComponent';
import Headertext from '../../Components/Headertext';
import JobService from '../../apis/Job';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import { useLocation } from 'react-router-dom';

function AddJob() {
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
  const [loading,setloading]=useState(false)
  const location=useLocation()

  useEffect(()=>{
    if(location){
      console.log(location?.state);
      setValue('name',location?.state?.name)
      setValue('companyname',location?.state?.companyname)
      setValue('description',location?.state?.description)
      setValue('timing',location?.state?.timing)
      setValue('phonenumber',location?.state?.phonenumber)
      setValue('location',location?.state?.location)
    }
  },[])

  const onSubmit = async (data) => {
    setloading(true)
    console.log(data);
    try {
        let response
        if(location?.state){
          response = await JobService?.updateJob({id:location?.state?._id,obj:data})
        }
        else{
          response = await JobService.addJob(data)
        }
        if(response){
          console.log(response);
          SuccessToaster(response?.message || "Job add successfully")
          setloading(false)
          setValue('name','')
          setValue('companyname','')
          setValue('timing','')
          setValue('description','')
          setValue('phonenumber','')
          setValue('location','')
        }
    } catch (error) {
      ErrorToaster(error?.message || "Job post failed !")
      setloading(false)
    }
  };

  return (
    <Box sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',borderRadius:4 }}>
      <Container>
        <Headertext title={location?.state ?"Edit Job" :"Post a New Job"} />
        
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 4, 
            backgroundColor: '#ffffff', 
            mt: 3, 
            maxWidth: 1200, 
            mx: 'auto',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'translateY(-5px)' }
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('name', { required: 'Job Title is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('companyname', { required: 'Company Name is required' })}
                  error={!!errors.companyname}
                  helperText={errors.companyname?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Work Schedule"
                  variant="outlined"
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScheduleIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('timing', { required: 'Work Schedule is required' })}
                  error={!!errors.timing}
                  helperText={errors.timing?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('location', { required: 'Location is required' })}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('description', { required: 'Job Description is required' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  className="bg-gray-50"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...register('phonenumber', { 
                    required: 'Phone Number is required',
                    // pattern: {
                    //   value: /^[0-9]{10,11}$/,
                    //   message: 'Enter a valid phone number (10-15 digits)'
                    // }
                  })}
                  error={!!errors.phonenumber}
                  helperText={errors.phonenumber?.message}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '12px',
                      '&:hover fieldset': { borderColor: '#1976d2' },
                    },
                    '& .MuiInputLabel-root': { fontWeight: 500 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <NewButton2 
                  title={location?.state ?"Update Job" :"Post Job"} 
                  radius={2} 
                  type="submit"
                  loading={loading}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 transform transition-transform hover:scale-105"
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddJob;