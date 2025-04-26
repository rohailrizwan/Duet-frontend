import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';

const steps = ['Personal Information', 'Academic Details'];

export default function UpdateFaculty() {
  const [activeStep, setActiveStep] = useState(0);

  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      image: null,
      name: '',
      email: '',
      phone: '',
      dob: '',
      department: '',
      qualification: '',
      designation: '',
      experience: '',
      address: '',
    },

  });

  const next = async () => {
    let valid = false;
    if (activeStep === 0) {
      valid = await trigger(['image', 'name', 'email', 'phone', 'dob', 'address']);
    } else if (activeStep === 1) {
      valid = await trigger(['enrollment', 'department', 'semester']);
    }
    if (valid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    // API call here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file, { shouldValidate: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 0 }}>

      <Box sx={{ px: 4, py: 2, maxWidth: 1200, mx: 'auto', }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="left" className="font_poppins colorgradient">
          Update Profile
        </Typography>
        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="subtitle1" fontWeight={600}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Box>
              {/* Avatar */}
              <Box textAlign="center" mb={2}>
                <Avatar
                  src={watch('image') ? URL.createObjectURL(watch('image')) : ''}
                  alt="Profile Preview"
                  sx={{ width: 120, height: 120, bgcolor: '#e0e0e0', fontSize: 40 }}
                />
              </Box>

              {/* Upload Button */}
              <Box
                component="label"
                htmlFor="upload-button"
                sx={{
                  display: 'flex',
                  justifyContent: "center", // use 'flex-start' instead of 'start'
                  p: 2,
                  border: '2px dashed #2156a8',
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: '#f9f9f9',
                  textAlign: 'start',
                  mb: 3,
                  width: "200px"
                }}
              >
                <input
                  id="upload-button"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Typography variant="body1" color="primary">
                  {watch('image') ? watch('image')?.name : 'Click to upload'}
                </Typography>
              </Box>



              {/* Personal Fields */}
              <TextField
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                {...register('email', { required: 'Email is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                {...register('phone', { required: 'Phone number is required' })}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.dob)}
                helperText={errors.dob?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                fullWidth
                margin="normal"
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              {/* Department Dropdown */}
              <FormControl fullWidth margin="normal" error={Boolean(errors.department)}>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  {...register('department', { required: 'Department is required' })}
                >
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                  <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                  <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                  {/* Add more departments if needed */}
                </Select>
                <FormHelperText>{errors.department?.message}</FormHelperText>
              </FormControl>

              {/* Qualification TextField */}
              <TextField
                label="Qualification"
                {...register('qualification', { required: 'Qualification is required' })}
                error={Boolean(errors.qualification)}
                helperText={errors.qualification?.message}
                fullWidth
                margin="normal"
              />

              {/* Designation Dropdown */}
              <FormControl fullWidth margin="normal" error={Boolean(errors.designation)}>
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  defaultValue=""
                  {...register('designation', { required: 'Designation is required' })}
                >
                  <MenuItem value="Professor">Professor</MenuItem>
                  <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                  <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                  <MenuItem value="Lecturer">Lecturer</MenuItem>
                  {/* Add more designations if needed */}
                </Select>
                <FormHelperText>{errors.designation?.message}</FormHelperText>
              </FormControl>

              {/* Experience TextField */}
              <TextField
                label="Experience (in years)"
                {...register('experience', { required: 'Experience is required' })}
                error={Boolean(errors.experience)}
                helperText={errors.experience?.message}
                fullWidth
                margin="normal"
              />

            </Box>
          )}



          {/* Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={back}
              disabled={activeStep === 0}
              sx={{
                borderColor: '#2156a8',
                color: '#2156a8',
                '&:hover': { borderColor: '#19499b', color: '#19499b' },
              }}
            >
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <NewButton title='Next' handleFunction={next} />
            ) : (
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: '#2156a8', '&:hover': { background: "linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)", } }}
              >
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
