import { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, TextareaAutosize, IconButton, CircularProgress, Fade, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import { Add, Delete } from '@mui/icons-material';
import studentService from '../../apis/Student';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import UpdateProfileHeader from '../../Components/ProfileHeader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GradeIcon from '@mui/icons-material/Grade';
import SkillsIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
const steps = [
  { label: 'PERSONAL INFORMATION', subLabel: 'Basic personal details', icon: <PersonIcon /> },
  { label: 'ACADEMIC DETAILS', subLabel: 'Educational background', icon: <SchoolIcon /> },
  { label: 'WORK EXPERIENCE', subLabel: 'Professional history', icon: <WorkIcon /> },
];

export default function Studentfaculty({ userid }) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState();
  const [skills, setSkills] = useState(['']);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate()
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      image: null,
      name: '',
      email: "",
      dob: '',
      address: '',
      contactNumber: "",
      linkedInUrl: "",
      gitHubUrl: "",
      personalizedDescription: "", // step 1
      enrollNumber: '',
      department: "",
      semester: '',
      matricDetails: {
        schoolName: '',
        passingYear: '',
        grade: ''
      },
      interDetails: {
        collegeName: '',
        collegepassingYear: '',
        collegegrade: ''
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
    if (!watch('image')) {
      ErrorToaster('Profile image is required')
      return; // Don't proceed
    }
    if (activeStep === 0) {
      valid = await trigger(['linkedInUrl', 'gitHubUrl', 'address', 'dob', 'contactNumber', 'personalizedDescription', 'name', 'image', 'email']);
    } else if (activeStep === 1) {
      if (skills?.length == 0) {
        ErrorToaster('Skills are required')
        return
      }
      valid = await trigger(['enrollNumber', 'department', 'semester', 'matricDetails', 'interDetails']);
    }
    if (valid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (newdata) => {
    setloading(true);
    console.log('Form Submitted:', newdata?.semester);
    // return
    let profilePicture = '';

    if (typeof newdata?.image === 'string') {
      // Already a URL
      profilePicture = newdata?.image;
    } else {
      // File or Blob - needs to be uploaded
      const formdata = new FormData();
      formdata.append('document', newdata?.image);

      try {
        const response = await UploadServices?.uploadImage(formdata);
        if (response) {
          profilePicture = `${imagebaseUrl}/${response?.url}`;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        ErrorToaster(error?.message || "Image Upload Error");
        setloading(false);
        return;
      }
    }

    const obj = {
      profilePicture: profilePicture,
      name: newdata?.name,
      contactNumber: newdata?.contactNumber,
      dob: newdata?.dob,
      address: newdata?.address,
      personalizedDescription: newdata?.personalizedDescription,
      linkedInUrl: newdata?.linkedInUrl,
      gitHubUrl: newdata?.gitHubUrl,
      academicDetails: {
        enrollNumber: newdata?.enrollNumber,
        department: data?.department?._id,
        semester: newdata?.semester,
      },
      matriculationDetails: {
        schoolName: newdata?.schoolName,
        passingYear: newdata?.passingYear,
        grade: newdata?.grade
      },
      intermediateDetails: {
        collegeName: newdata?.collegeName,
        passingYear: newdata?.passingYear,
        grade: newdata?.grade,
      },
      workExperience: newdata?.workExperience,
      skills: skills,
    };
    handleFormSubmit(obj);
  };


  const handleFormSubmit = async (obj) => {
    try {
      const response = await studentService?.updatePost({ id: userid, obj: obj })
      if (response) {
        console.log(response);
        SuccessToaster(response?.message)
        navigate('/profile/userProfile')
        setloading(false)
      }
    } catch (error) {
      ErrorToaster(error?.message || "Error")
      setloading(false)
    }
  }
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

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const getStudent = async () => {
    try {
      const response = await studentService?.getProfile(userid)
      console.log(response);
      setdata(response?.data)
    } catch (error) {
      ErrorToaster(error?.message || 'Error')
    }
  }

  useEffect(() => {
    getStudent()
  }, [])

  useEffect(() => {
    if (data) {
      setValue('image', data?.profilePicture) // step 1
      setValue('name', data?.name) // step 1
      setValue('email', data?.email) // step 1
      setValue('personalizedDescription', data?.personalizedDescription) // step 1
      setValue('contactNumber', data?.contactNumber) // step 1
      setValue('dob', convertToDateInputFormat(data?.dob)) // step 1
      setValue('address', data?.address) // step 1
      setValue('linkedInUrl', data?.linkedInUrl) // step 1
      setValue('gitHubUrl', data?.gitHubUrl) // step 1

      setValue('enrollNumber', data?.academicDetails?.enrollNumber)
      setValue('department', data?.department?.name)
      setValue('semester', data?.academicDetails?.semester)

      setValue("schoolName", data?.matriculationDetails?.schoolName)
      setValue("passingYear", data?.matriculationDetails?.passingYear)
      setValue("grade", data?.matriculationDetails?.grade)
      setValue("collegeName", data?.intermediateDetails?.collegeName)
      setValue("collegepassingYear", data?.intermediateDetails?.passingYear)
      setValue("collegegrade", data?.intermediateDetails?.grade)

      setSkills(data?.skills)
      setValue('workExperience', data?.workExperience)
    }
  }, [setValue, data])

  const convertToDateInputFormat = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  console.log(watch('dob'));
  console.log(skills);


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 0 }}>

      <Box sx={{ px: 4, py: 2, maxWidth: 1200, mx: 'auto', }}>
        <UpdateProfileHeader text={"Update Profile"} />

        {/* Stepper */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              width: '100%',
              mb: 4,
              background: 'linear-gradient(to right, #1e3c72, #2a5298, #4f79c6)', // Updated gradient
              borderRadius: '10px',
              padding: '16px',
              overflowX: 'auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Added subtle shadow for depth
            }}
          >
            {/* Step and Percentage Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#e0e7ff' }}>
                Step {activeStep + 1} of {steps?.length}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  border: '1px solid',
                  borderColor: '#a3bffa',
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  color: 'white',
                }}
              >
                {Math.round(((activeStep + 1) / steps.length) * 100)}% Complete
              </Typography>
            </Box>

            {/* Stepper Component */}
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                mb: 4,
                '& .MuiStepLabel-label': { color: '#e0e7ff' }, // Label color
                '& .MuiStepLabel-label.Mui-active': { color: '#ffffff' }, // Active label color
                '& .MuiStepLabel-label.Mui-completed': { color: '#c7d2fe' }, // Completed label color
                // '& .MuiStepConnector-line': {
                //   borderColor: index <= activeStep ? '#a3bffa' : '#bdbdbd', // Connector line color
                // },
              }}
            >
              {steps?.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    icon={
                      <Box
                        sx={{
                          backgroundColor: index <= activeStep ? '#3b82f6' : 'grey.500',
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          border: '2px solid',
                          borderColor: index <= activeStep ? '#3b5998' : 'grey.600',
                        }}
                      >
                        {step.icon}
                      </Box>
                    }
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {step.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#c7d2fe' }}>
                      {step.subLabel}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Fade>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Box
              sx={{
                mx: 'auto',
                p: 3,
                bgcolor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e7ff',
              }}
            >
              {/* Avatar Section */}
              <Box textAlign="center" mb={3}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    '&:hover .avatar-overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Avatar
                    src={
                      watch('image')
                        ? typeof watch('image') === 'string'
                          ? watch('image')
                          : URL.createObjectURL(watch('image'))
                        : ''
                    }
                    alt="Profile Preview"
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: '#e0e0e0',
                      fontSize: 40,
                      border: '3px solid #3b5998',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    className="avatar-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="#ffffff">
                      Change Photo
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Upload Button */}
              <Box
                component="label"
                htmlFor="upload-button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  border: '2px dashed #3b5998',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  bgcolor: 'linear-gradient(to right, #f0f7ff, #e0e7ff)',
                  textAlign: 'center',
                  mb: 3,
                  width: '200px',
                  mx: 'auto',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    borderColor: '#a3bffa',
                    bgcolor: 'linear-gradient(to right, #e0e7ff, #f0f7ff)',
                  },
                }}
              >
                <input
                  id="upload-button"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <CloudUploadIcon sx={{ mr: 1, color: '#3b5998' }} />
                <Typography variant="body1" sx={{ color: '#3b5998', fontWeight: 500 }}>
                  Upload Photo
                </Typography>
              </Box>

              {/* Personal Fields */}
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, // Responsive grid layout
                }}
              >
                <TextField
                  label="Full Name"
                  {...register('name', { required: 'Name is required' })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Email"
                  {...register('email', { required: 'Email is required' })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  fullWidth
                  margin="normal"
                  disabled
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Phone Number"
                  {...register('contactNumber', { required: 'Phone number is required' })}
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={watch('dob') || ''}
                  {...register('dob', { required: 'Date of birth is required' })}
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.dob)}
                  helperText={errors.dob?.message}
                  fullWidth
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
              </Box>

              {/* Address and Description (Full Width) */}
              <TextField
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#3b5998',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b5998',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#3b5998',
                    '&.Mui-focused': {
                      color: '#3b5998',
                    },
                  },
                }}
              />
              <TextField
                label="Description (max 400 characters)"
                multiline
                rows={4}
                inputProps={{ maxLength: 400 }}
                {...register('personalizedDescription', { required: 'Description is required' })}
                error={Boolean(errors.personalizedDescription)}
                helperText={errors.personalizedDescription?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#3b5998',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b5998',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#3b5998',
                    '&.Mui-focused': {
                      color: '#3b5998',
                    },
                  },
                }}
              />

              {/* Social Links */}
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  mt: 2,
                }}
              >
                <TextField
                  label="LinkedIn (URL)"
                  {...register('linkedInUrl', { required: 'URL is required' })}
                  error={Boolean(errors.linkedInUrl)}
                  helperText={errors.linkedInUrl?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="GitHub (URL)"
                  {...register('gitHubUrl', { required: 'GitHub is required' })}
                  error={Boolean(errors.gitHubUrl)}
                  helperText={errors.gitHubUrl?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e7ff',
              }}
            >
              {/* Academic Details Header */}
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ color: '#3b5998', display: 'flex', alignItems: 'center' }}
              >
                <SchoolIcon sx={{ mr: 1, color: '#3b5998' }} />
                Academic Details
              </Typography>

              {/* Academic Fields */}
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(250px, 1fr))' }, // Responsive grid without fixed width
                }}
              >
                <TextField
                  label="Enrollment Number"
                  {...register('enrollNumber', { required: 'Enrollment number is required' })}
                  error={Boolean(errors.enrollNumber)}
                  helperText={errors.enrollNumber?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Department"
                  {...register('department', { required: 'Department is required' })}
                  error={Boolean(errors.department)}
                  helperText={errors.department?.message}
                  fullWidth
                  margin="normal"
                  disabled
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Semester"
                  {...register('semester', { required: 'Semester is required' })}
                  error={Boolean(errors.semester)}
                  helperText={errors.semester?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
              </Box>

              {/* Matriculation Details */}
              <Typography
                variant="h6"
                fontWeight="bold"
                mt={3}
                mb={1}
                sx={{ color: '#3b5998', display: 'flex', alignItems: 'center' }}
              >
                <SchoolIcon sx={{ mr: 1, color: '#3b5998' }} />
                Matriculation Details
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(250px, 1fr))' },
                }}
              >
                <TextField
                  label="School Name"
                  {...register('schoolName', { required: 'School name is required' })}
                  error={Boolean(errors.schoolName)}
                  helperText={errors.schoolName?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Passing Year"
                  type="number"
                  {...register('passingYear', { required: 'Passing year is required' })}
                  error={Boolean(errors.passingYear)}
                  helperText={errors.passingYear?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Grade"
                  {...register('grade', { required: 'Grade is required' })}
                  error={Boolean(errors.grade)}
                  helperText={errors.grade?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GradeIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
              </Box>

              {/* Intermediate Details */}
              <Typography
                variant="h6"
                fontWeight="bold"
                mt={3}
                mb={1}
                sx={{ color: '#3b5998', display: 'flex', alignItems: 'center' }}
              >
                <SchoolIcon sx={{ mr: 1, color: '#3b5998' }} />
                Intermediate Details
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(250px, 1fr))' },
                }}
              >
                <TextField
                  label="College Name"
                  {...register('collegeName', { required: 'College name is required' })}
                  error={Boolean(errors.collegeName)}
                  helperText={errors.collegeName?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Passing Year"
                  type="number"
                  {...register('collegepassingYear', { required: 'Passing year is required' })}
                  error={Boolean(errors.collegepassingYear)}
                  helperText={errors.collegepassingYear?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
                <TextField
                  label="Grade"
                  {...register('collegegrade', { required: 'Grade is required' })}
                  error={Boolean(errors.collegegrade)}
                  helperText={errors.collegegrade?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GradeIcon sx={{ color: '#3b5998' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b5998',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b5998',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#3b5998',
                      '&.Mui-focused': {
                        color: '#3b5998',
                      },
                    },
                  }}
                />
              </Box>

              {/* Skills Section */}
              <Typography
                variant="h6"
                fontWeight="bold"
                mt={3}
                mb={1}
                sx={{ color: '#3b5998', display: 'flex', alignItems: 'center' }}
              >
                <SkillsIcon sx={{ mr: 1, color: '#3b5998' }} />
                Skills
              </Typography>
              {skills.map((skill, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <TextField
                    label={`Skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = e.target.value;
                      setSkills(updatedSkills);
                    }}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SkillsIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <IconButton onClick={() => handleRemoveSkill(index)} color="error" sx={{ ml: 1 }}>
                    <Delete />
                  </IconButton>
                </Box>
              ))}

              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddSkill}
                startIcon={<Add />}
                sx={{
                  mt: 1,
                  borderRadius: '8px',
                  borderColor: '#3b5998',
                  color: '#3b5998',
                  '&:hover': {
                    borderColor: '#a3bffa',
                    bgcolor: '#f0f7ff',
                  },
                }}
              >
                Add Skill
              </Button>
            </Box>
          )}

          {activeStep === 2 && (
            <Box
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e7ff',
              }}
            >
              {/* Work Experience Header */}
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ color: '#3b5998', display: 'flex', alignItems: 'center' }}
              >
                <WorkIcon sx={{ mr: 1, color: '#3b5998' }} />
                Work Experience (Optional)
              </Typography>

              {/* Work Experience Fields */}
              {watch('workExperience')?.map((work, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e7ff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <TextField
                    label="Company Name"
                    {...register(`workExperience.${index}.companyName`, {
                      required: 'Company name is required',
                    })}
                    error={Boolean(errors.workExperience?.[index]?.companyName)}
                    helperText={errors.workExperience?.[index]?.companyName?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Job Title"
                    {...register(`workExperience.${index}.jobTitle`, {
                      required: 'Job title is required',
                    })}
                    error={Boolean(errors.workExperience?.[index]?.jobTitle)}
                    helperText={errors.workExperience?.[index]?.jobTitle?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Start Year"
                    type="number"
                    {...register(`workExperience.${index}.startYear`, {
                      required: 'Start year is required',
                    })}
                    error={Boolean(errors.workExperience?.[index]?.startYear)}
                    helperText={errors.workExperience?.[index]?.startYear?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="End Year"
                    type="number"
                    {...register(`workExperience.${index}.endYear`, {
                      required: 'End year is required',
                    })}
                    error={Boolean(errors.workExperience?.[index]?.endYear)}
                    helperText={errors.workExperience?.[index]?.endYear?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Responsibilities"
                    {...register(`workExperience.${index}.responsibilities`, {
                      required: 'Responsibilities are required',
                    })}
                    error={Boolean(errors.workExperience?.[index]?.responsibilities)}
                    helperText={errors.workExperience?.[index]?.responsibilities?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon sx={{ color: '#3b5998' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        '&:hover fieldset': {
                          borderColor: '#3b5998',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b5998',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#3b5998',
                        '&.Mui-focused': {
                          color: '#3b5998',
                        },
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeWorkExperience(index)}
                    sx={{ mt: 2, borderRadius: '6px', borderColor: '#ef4444', color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={addWorkExperience}
                sx={{
                  mt: 3,
                  borderRadius: '8px',
                  bgcolor: '#3b5998',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#3b82f6',
                  },
                }}
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
                {loading ? <CircularProgress size={'12'} color='white' /> : 'Submit'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
