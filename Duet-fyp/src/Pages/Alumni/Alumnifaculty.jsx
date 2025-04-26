import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';

const steps = ['Personal Information', 'Academic Details', 'Work Experience'];

export default function AlumniProfile() {
  const [activeStep, setActiveStep] = useState(0);

  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      image: null,
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      enrollment: '',
      department: '',
      semester: '',
      matricDetails: {
        schoolName: '',
        passingYear: '',
        grade: ''
      },
      interDetails: {
        collegeName: '',
        passingYear: '',
        grade: ''
      },
      workExperience: [{
        companyName: '',
        jobTitle: '',
        startYear: '',
        endYear: '',
        responsibilities: ''
      }]
    },
  });

  const next = async () => {
    let valid = false;
    if (activeStep === 0) {
      valid = await trigger(['image', 'name', 'email', 'phone', 'dob', 'address']);
    } else if (activeStep === 1) {
      valid = await trigger(['enrollment', 'department', 'semester', 'matricDetails', 'interDetails']);
    } else if (activeStep === 2) {
      valid = await trigger(['workExperience']);
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

  const addWorkExperience = () => {
    const workExperience = [...watch('workExperience'), {
      companyName: '',
      jobTitle: '',
      startYear: '',
      endYear: '',
      responsibilities: ''
    }];
    setValue('workExperience', workExperience);
  };

  const removeWorkExperience = (index) => {
    const workExperience = [...watch('workExperience')];
    workExperience.splice(index, 1);
    setValue('workExperience', workExperience);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 0 }}>
      <Box sx={{ px: 4, py: 2, maxWidth: 1200, mx: 'auto' }}>
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
                  justifyContent: "center", 
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
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Academic Details
              </Typography>

              <TextField
                label="Enrollment Number"
                {...register('enrollment', { required: 'Enrollment number is required' })}
                error={Boolean(errors.enrollment)}
                helperText={errors.enrollment?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Department"
                {...register('department', { required: 'Department is required' })}
                error={Boolean(errors.department)}
                helperText={errors.department?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Semester"
                {...register('semester', { required: 'Semester is required' })}
                error={Boolean(errors.semester)}
                helperText={errors.semester?.message}
                fullWidth
                margin="normal"
              />

              {/* Matric Details */}
              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Matriculation Details</Typography>
              <TextField
                label="School Name"
                {...register('matricDetails.schoolName', { required: 'School name is required' })}
                error={Boolean(errors.matricDetails?.schoolName)}
                helperText={errors.matricDetails?.schoolName?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register('matricDetails.passingYear', { required: 'Passing year is required' })}
                error={Boolean(errors.matricDetails?.passingYear)}
                helperText={errors.matricDetails?.passingYear?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Grade"
                {...register('matricDetails.grade', { required: 'Grade is required' })}
                error={Boolean(errors.matricDetails?.grade)}
                helperText={errors.matricDetails?.grade?.message}
                fullWidth
                margin="normal"
              />

              {/* Inter Details */}
              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Intermediate Details</Typography>
              <TextField
                label="College Name"
                {...register('interDetails.collegeName', { required: 'College name is required' })}
                error={Boolean(errors.interDetails?.collegeName)}
                helperText={errors.interDetails?.collegeName?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register('interDetails.passingYear', { required: 'Passing year is required' })}
                error={Boolean(errors.interDetails?.passingYear)}
                helperText={errors.interDetails?.passingYear?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Grade"
                {...register('interDetails.grade', { required: 'Grade is required' })}
                error={Boolean(errors.interDetails?.grade)}
                helperText={errors.interDetails?.grade?.message}
                fullWidth
                margin="normal"
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Work Experience
              </Typography>

              {/* Work Experience Fields */}
              {watch('workExperience').map((work, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <TextField
                    label="Company Name"
                    {...register(`workExperience.${index}.companyName`, { required: 'Company name is required' })}
                    error={Boolean(errors.workExperience?.[index]?.companyName)}
                    helperText={errors.workExperience?.[index]?.companyName?.message}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Job Title"
                    {...register(`workExperience.${index}.jobTitle`, { required: 'Job title is required' })}
                    error={Boolean(errors.workExperience?.[index]?.jobTitle)}
                    helperText={errors.workExperience?.[index]?.jobTitle?.message}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Start Year"
                    type="number"
                    {...register(`workExperience.${index}.startYear`, { required: 'Start year is required' })}
                    error={Boolean(errors.workExperience?.[index]?.startYear)}
                    helperText={errors.workExperience?.[index]?.startYear?.message}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="End Year"
                    type="number"
                    {...register(`workExperience.${index}.endYear`, { required: 'End year is required' })}
                    error={Boolean(errors.workExperience?.[index]?.endYear)}
                    helperText={errors.workExperience?.[index]?.endYear?.message}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Responsibilities"
                    {...register(`workExperience.${index}.responsibilities`, { required: 'Responsibilities are required' })}
                    error={Boolean(errors.workExperience?.[index]?.responsibilities)}
                    helperText={errors.workExperience?.[index]?.responsibilities?.message}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeWorkExperience(index)}
                    sx={{ mt: 2 }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={addWorkExperience}
                sx={{ mt: 3 }}
              >
                Add Work Experience
              </Button>
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
