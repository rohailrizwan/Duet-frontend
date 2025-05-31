import { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, CircularProgress, Fade, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import { Description } from '@mui/icons-material';
import AlumniService from '../../apis/Alumni';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import UpdateProfileHeader from '../../Components/ProfileHeader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from "@mui/icons-material/Badge";
import GradeIcon from "@mui/icons-material/Grade";
import DescriptionIcon from '@mui/icons-material/Description';
const steps = [
  { label: 'PERSONAL INFORMATION', subLabel: 'Basic personal details', icon: <PersonIcon /> },
  { label: 'ACADEMIC DETAILS', subLabel: 'Educational background', icon: <SchoolIcon /> },
  { label: 'WORK EXPERIENCE', subLabel: 'Professional history', icon: <WorkIcon /> },
];

export default function AlumniProfile({ userid }) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  const [workExperience, setWorkExperience] = useState([
    {
      companyName: '',
      jobTitle: '',
      startYear: '',
      endYear: '',
      responsibilities: ''
    }
  ]);


  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      profilePicture: null,
      name: '',
      email: '',
      contactNumber: '',
      dob: '',
      address: '',
      personalizedDescription: "",
      linkedInUrl: '',
      gitHubUrl: '', // step 1
      rollNumber: '',
      department: '',
      cgpa: '',

      matriculationDetails: {
        schoolName: '',
        passingYear: '',
        grade: ''
      },
      intermediateDetails: {
        collegeName: '',
        passingYear: '',
        grade: ''
      },

    },
  });

  const next = async () => {
    let valid = false;
    if (!watch('profilePicture')) {
      ErrorToaster('Profile image is required')
      return; // Don't proceed
    }
    if (activeStep === 0) {
      valid = await trigger(['profilePicture', 'name', 'email', 'contactNumber', 'dob', 'address', 'gitHubUrl', 'linkedInUrl', 'personalizedDescription']);
    } else if (activeStep === 1) {
      valid = await trigger(['rollNumber', 'department', 'cgpa', 'matriculationDetails', 'intermediateDetails']);
    }
    if (valid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (newdata) => {
    if (
      !workExperience?.length || // check if array is empty
      workExperience.every(item =>
        !item.companyName.trim() &&
        !item.jobTitle.trim() &&
        !item.startYear.trim() &&
        !item.endYear.trim() &&
        !item.responsibilities.trim()
      )
    ) {
      ErrorToaster('At least one complete work experience is required');
      return;
    }
    let profilePicture = '';
    setloading(true)
    if (typeof newdata?.profilePicture === 'string') {
      // Already a URL
      profilePicture = newdata?.profilePicture;
    } else {
      // File or Blob - needs to be uploaded
      const formdata = new FormData();
      formdata.append('document', newdata?.profilePicture);

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

    let obj = {
      ...newdata,
      profilePicture: profilePicture,
      department: data?.department?._id,
      workExperience: workExperience
    }
    handleFormSubmit(obj)
  };

  const handleFormSubmit = async (obj) => {
    try {
      const response = await AlumniService?.updatePost({ id: userid, obj: obj })
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
    setValue('profilePicture', file, { shouldValidate: true });
  };

  const addWorkExperience = () => {
    setWorkExperience(prev => [
      ...prev,
      {
        companyName: '',
        jobTitle: '',
        startYear: '',
        endYear: '',
        responsibilities: ''
      }
    ]);
  };


  const removeWorkExperience = (index) => {
    setWorkExperience(prev => prev.filter((_, i) => i !== index));
  };


  const getAlumni = async () => {
    try {
      const response = await AlumniService?.getProfile(userid)
      console.log(response);
      setdata(response?.data)
    } catch (error) {
      ErrorToaster(error?.message || 'Error')
    }
  }

  useEffect(() => {
    getAlumni()
  }, [])

  useEffect(() => {
    if (data) {
      setValue('profilePicture', data?.profilePicture)
      setValue('name', data?.name)
      setValue('email', data?.email)
      setValue('contactNumber', data?.contactNumber)
      setValue('dob', convertToDateInputFormat(data?.dob))
      setValue('address', data?.address)
      setValue('personalizedDescription', data?.personalizedDescription)
      setValue('linkedInUrl', data?.linkedInUrl)
      setValue('gitHubUrl', data?.gitHubUrl) // step 1
      // step 2
      setValue('rollNumber', data?.rollNumber)
      setValue('department', data?.department?.name)
      setValue('cgpa', data?.cgpa)

      setValue('matriculationDetails.schoolName', data?.matriculationDetails?.schoolName)
      setValue('matriculationDetails.passingYear', data?.matriculationDetails?.passingYear)
      setValue('matriculationDetails.grade', data?.matriculationDetails?.grade)

      setValue('intermediateDetails.collegeName', data?.intermediateDetails?.collegeName)
      setValue('intermediateDetails.passingYear', data?.intermediateDetails?.passingYear)
      setValue('intermediateDetails.grade', data?.intermediateDetails?.grade)

      setWorkExperience(data?.workExperience)
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

  const handleChange = (index, field, value) => {
    const updated = [...workExperience];
    updated[index][field] = value;
    setWorkExperience(updated);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 0 }}>
      <Box sx={{ px: 4, py: 2, maxWidth: 1200, mx: 'auto' }}>
        <UpdateProfileHeader text={"Update Profile"} />
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
            <Box sx={{
              mx: 'auto',
              p: 3,
              bgcolor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e0e7ff',
            }}>
              {/* Avatar */}
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
                      watch('profilePicture')
                        ? typeof watch('profilePicture') === 'string'
                          ? watch('profilePicture')
                          : URL.createObjectURL(watch('profilePicture'))
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
              <TextField
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Email"
                {...register('email', { required: 'Email is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                disabled
              />
              <TextField
                label="Phone Number"
                {...register('contactNumber', { required: 'Phone number is required' })}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                margin="normal"
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
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Linked In (Url)"
                {...register('linkedInUrl', { required: 'Linkedin url is required' })}
                error={Boolean(errors.linkedInUrl)}
                helperText={errors.linkedInUrl?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Github (Url)"
                {...register('gitHubUrl', { required: 'GitHub url is required' })}
                error={Boolean(errors.gitHubUrl)}
                helperText={errors.gitHubUrl?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
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
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e3a8a", mb: 3 }}
              >
                Academic Details
              </Typography>

              <TextField
                label="Roll Number"
                {...register("rollNumber", { required: "Roll number is required" })}
                error={Boolean(errors.rollNumber)}
                helperText={errors.rollNumber?.message}
                fullWidth
                margin="normal"
                disabled
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="Department"
                {...register("department", { required: "Department is required" })}
                error={Boolean(errors.department)}
                helperText={errors.department?.message}
                fullWidth
                margin="normal"
                disabled
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="CGPA"
                {...register("cgpa", { required: "CGPA is required" })}
                error={Boolean(errors.cgpa)}
                helperText={errors.cgpa?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GradeIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />

              {/* Matriculation Details */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e3a8a", mt: 3, mb: 2 }}
              >
                Matriculation Details
              </Typography>
              <TextField
                label="School Name"
                {...register("matriculationDetails.schoolName", {
                  required: "School name is required",
                })}
                error={Boolean(errors.matriculationDetails?.schoolName)}
                helperText={errors.matriculationDetails?.schoolName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register("matriculationDetails.passingYear", {
                  required: "Passing year is required",
                })}
                error={Boolean(errors.matriculationDetails?.passingYear)}
                helperText={errors.matriculationDetails?.passingYear?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="Grade"
                {...register("matriculationDetails.grade", {
                  required: "Grade is required",
                })}
                error={Boolean(errors.matriculationDetails?.grade)}
                helperText={errors.matriculationDetails?.grade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GradeIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />

              {/* Intermediate Details */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e3a8a", mt: 3, mb: 2 }}
              >
                Intermediate Details
              </Typography>
              <TextField
                label="College Name"
                {...register("intermediateDetails.collegeName", {
                  required: "College name is required",
                })}
                error={Boolean(errors.intermediateDetails?.collegeName)}
                helperText={errors.intermediateDetails?.collegeName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register("intermediateDetails.passingYear", {
                  required: "Passing year is required",
                })}
                error={Boolean(errors.intermediateDetails?.passingYear)}
                helperText={errors.intermediateDetails?.passingYear?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
              <TextField
                label="Grade"
                {...register("intermediateDetails.grade", {
                  required: "Grade is required",
                })}
                error={Boolean(errors.intermediateDetails?.grade)}
                helperText={errors.intermediateDetails?.grade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GradeIcon sx={{ color: "#3b5998" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1,
                    backgroundColor: "#fff",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3a8a" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#3b5998" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b5998",
                  },
                }}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{
              p: 3,
              bgcolor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e0e7ff',
            }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Work Experience
              </Typography>

              {workExperience?.map((item, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                  <TextField
                    label="Company Name"
                    value={item.companyName}
                    onChange={(e) => handleChange(index, 'companyName', e.target.value)}
                    fullWidth
                    margin="normal"
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
                    value={item.jobTitle}
                    onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                    fullWidth
                    margin="normal"
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
                    value={item.startYear}
                    onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                    fullWidth
                    margin="normal"
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
                    value={item.endYear}
                    onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                    fullWidth
                    margin="normal"
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
                    multiline
                    rows={3}
                    value={item.responsibilities}
                    onChange={(e) => handleChange(index, 'responsibilities', e.target.value)}
                    fullWidth
                    margin="normal"
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
                  <Box textAlign="right">
                    <Button onClick={() => removeWorkExperience(index)} color="error">
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}

              <Button variant="outlined" onClick={addWorkExperience} sx={{ mt: 2 }}>
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
                {loading ? <CircularProgress size={12} color='white' /> : "Submit"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
