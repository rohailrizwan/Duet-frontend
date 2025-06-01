import { useEffect, useRef, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, MenuItem, Select, InputLabel, FormControl, FormHelperText, OutlinedInput, CircularProgress, InputAdornment, Fade } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import Facultyservice from '../../apis/Faculty';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import UpdateProfileHeader from '../../Components/ProfileHeader';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
const steps = [
  { label: 'PERSONAL INFORMATION', subLabel: 'Basic personal details', icon: <PersonIcon /> },
  { label: 'ACADEMIC DETAILS', subLabel: 'Educational background', icon: <SchoolIcon /> },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UpdateFaculty({ userid }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [researchList, setResearchList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designation, setDesignation] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const subjectRef = useRef();
  const awardRef = useRef();
  const researchRef = useRef();
  const skillRef = useRef();
  const navigate=useNavigate()
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      profilePicture: null,
      name: '',
      email: '',
      contactNumber: '',
      dob: '',
      address: '',
      personalizedDescription: '',
      gitHubUrl: '',
      linkedInUrl: '',
      academicDetails: {
        department: [],
        qualification: '',
        designation: '',
        specialization: '',
        experienceYear: '',
        subjects: [],
        skills: [],
        awards: [],
        researchPapers: [],
      },
    },
  });



  const next = async () => {
    let valid = false;
    if (!watch('profilePicture')) {
      ErrorToaster('Profile image is required');
      return;
    }
    if (activeStep === 0) {
      valid = await trigger(['profilePicture', 'name', 'email', 'contactNumber', 'gitHubUrl', 'personalizedDescription', 'dob', 'address', 'linkedInUrl']);
    }
    if (activeStep === 1) {
      valid = await trigger(['specialization', 'experienceYear', 'qualification', 'designation']);
      if (selectDepartment.length === 0) {
        ErrorToaster('Department is required');
        return;
      }
    }
    if (valid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (newdata) => {
    if (selectDepartment.length === 0) {
      ErrorToaster('Department is required');
      return;
    }
    let profilePicture = '';
    setLoading(true);
    if (typeof newdata?.profilePicture === 'string') {
      profilePicture = newdata?.profilePicture;
    } else {
      const formdata = new FormData();
      formdata.append('document', newdata?.profilePicture);
      try {
        const response = await UploadServices?.uploadImage(formdata);
        if (response) {
          profilePicture = `${imagebaseUrl}/${response?.url}`;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        ErrorToaster(error?.message || 'Image Upload Error');
        setLoading(false);
        return;
      }
    }
    const obj = {
      profilePicture,
      name: newdata?.name,
      contactNumber: newdata?.contactNumber,
      dob: newdata?.dob,
      address: newdata?.address,
      personalizedDescription: newdata?.personalizedDescription,
      linkedInUrl: newdata?.linkedInUrl,
      gitHubUrl: newdata?.gitHubUrl,
      academicDetails: {
        department: selectDepartment,
        designation: newdata?.designation,
        qualification: newdata?.qualification,
        experienceYear: newdata?.experienceYear,
        specialization: newdata?.specialization,
        subjects: subjectsList,
        researchPapers: researchList,
        awards: awardsList,
        skills: skillsList,
      },
    };
    handleFormSubmit(obj);
  };

  const handleFormSubmit = async (obj) => {
    try {
      const response = await Facultyservice?.updatePost({ id: userid, obj });
      if (response) {
        SuccessToaster(response?.message);
        navigate('/profile/userProfile')
      }
    } catch (error) {
      ErrorToaster(error?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('profilePicture', file, { shouldValidate: true });
  };

  const addToList = (list, setList, value) => {
    if (value && !list.includes(value)) {
      setList([...list, value]);
    }
  };

  const removeFromList = (list, setList, index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const getFaculty = async () => {
    try {
      const response = await Facultyservice?.getProfile(userid);
      setData(response?.data);
    } catch (error) {
      ErrorToaster(error?.message || 'Error');
    }
  };

  const getDepartments = async () => {
    try {
      const response = await Facultyservice.getDepartment();
      setDepartments(response?.data || []);
    } catch (error) {
      ErrorToaster(error?.message || 'Error');
    }
  };

  useEffect(() => {
    getFaculty();
    getDepartments();
  }, []);

  useEffect(() => {
    if (data) {
      setValue('profilePicture', data?.profilePicture);
      setValue('name', data?.name);
      setValue('email', data?.email);
      setValue('personalizedDescription', data?.personalizedDescription);
      setValue('contactNumber', data?.contactNumber);
      setValue('dob', convertToDateInputFormat(data?.dob));
      setValue('address', data?.address);
      setValue('linkedInUrl', data?.linkedInUrl);
      setValue('gitHubUrl', data?.gitHubUrl);
      setValue('experienceYear', data?.academicDetails?.experienceYear);
      setValue('specialization', data?.academicDetails?.specialization);
      setValue('qualification', data?.academicDetails?.qualification);
      setValue('designation', data?.academicDetails?.designation);
      setSelectDepartment(data?.academicDetails?.department?.map((item) => item?._id) || []);
      setSubjectsList(data?.academicDetails?.subjects || []);
      setAwardsList(data?.academicDetails?.awards || []);
      setResearchList(data?.academicDetails?.researchPapers || []);
      setSkillsList(data?.academicDetails?.skills || []);
    }
  }, [data, setValue]);

  const convertToDateInputFormat = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChangeDepartment = (event) => {
    const value = event.target.value;
    setSelectDepartment(Array.isArray(value) ? value : []);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, maxWidth: 1200, mx: 'auto', backgroundColor: '#ffffff', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box textAlign="center" mb={2}>
                <Avatar
                  src={
                    watch('profilePicture')
                      ? typeof watch('profilePicture') === 'string'
                        ? watch('profilePicture')
                        : URL.createObjectURL(watch('profilePicture'))
                      : ''
                  }
                  alt="Profile Preview"
                  sx={{ width: 120, height: 120, bgcolor: '#e0e0e0', fontSize: 40, mx: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                />
              </Box>

              <Box
                component="label"
                htmlFor="upload-button"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                  border: '2px dashed #1976d2',
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: '#f9f9f9',
                  textAlign: 'center',
                  mb: 3,
                  width: 'fit-content',
                  mx: 'auto',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: '#1565c0', bgcolor: 'rgba(25, 118, 210, 0.04)' },
                }}
              >
                <input
                  id="upload-button"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                  Click to upload profile picture
                </Typography>
              </Box>

              <TextField
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Email"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Phone Number"
                {...register('contactNumber', {
                  required: 'Phone number is required',
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Date of Birth"
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Description (max 400 characters)"
                multiline
                rows={4}
                inputProps={{ maxLength: 400 }}
                {...register('personalizedDescription', { required: 'Description is required' })}
                error={!!errors.personalizedDescription}
                helperText={errors.personalizedDescription?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="LinkedIn URL"
                {...register('linkedInUrl', {
                  required: 'LinkedIn URL is required',
                  // pattern: {
                  //   value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                  //   message: 'Enter a valid LinkedIn URL',
                  // },
                })}
                error={!!errors.linkedInUrl}
                helperText={errors.linkedInUrl?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Social URL"
                {...register('gitHubUrl', {
                  required: 'Social URL is required',
                  // pattern: {
                  //   value: /^(https?:\/\/)?(www\.)?github\.com\/.*$/,
                  //   message: 'Enter a valid GitHub URL',
                  // },
                })}
                error={!!errors.gitHubUrl}
                helperText={errors.gitHubUrl?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHubIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel shrink>Department</InputLabel>
                <Select
                  multiple
                  value={selectDepartment || []}
                  onChange={handleChangeDepartment}
                  input={<OutlinedInput label="Department" />}
                  MenuProps={MenuProps}
                  renderValue={(selected) =>
                    selected
                      .map((id) => departments.find((dep) => dep._id === id)?.name)
                      .join(', ')
                  }
                >
                  {Array.isArray(departments) && departments.length > 0 ? (
                    departments.map((department) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No departments available</MenuItem>
                  )}
                </Select>
                <FormHelperText error={selectDepartment.length === 0 && activeStep === 1}>
                  {selectDepartment.length === 0 && activeStep === 1 ? 'Department is required' : ''}
                </FormHelperText>
              </FormControl>

              <TextField
                label="Designation"
                {...register('designation', { required: 'Designation is required' })}
                error={!!errors.designation}
                helperText={errors.designation?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />


              <TextField
                label="Qualification"
                {...register('qualification', { required: 'Qualification is required' })}
                error={!!errors.qualification}
                helperText={errors.qualification?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Experience (in years)"
                type="number"
                {...register('experienceYear', {
                  required: 'Experience is required',
                  min: { value: 0, message: 'Experience cannot be negative' },
                })}
                error={!!errors.experienceYear}
                helperText={errors.experienceYear?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkHistoryIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                label="Specializations"
                multiline
                rows={2}
                {...register('specialization', { required: 'Specialization is required' })}
                error={!!errors.specialization}
                helperText={errors.specialization?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                inputRef={subjectRef}
                label="Add Subject (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = subjectRef.current.value.trim();
                    addToList(subjectsList, setSubjectsList, value);
                    subjectRef.current.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = subjectRef.current.value.trim();
                          if (value) {
                            addToList(subjectsList, setSubjectsList, value);
                            subjectRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              {subjectsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                  <Typography sx={{ mr: 2, flexGrow: 1 }}>{idx + 1}. {item}</Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeFromList(subjectsList, setSubjectsList, idx)}
                    className="hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              <TextField
                inputRef={researchRef}
                label="Add Research Paper (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = researchRef.current.value.trim();
                    addToList(researchList, setResearchList, value);
                    researchRef.current.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = researchRef.current.value.trim();
                          if (value) {
                            addToList(researchList, setResearchList, value);
                            researchRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              {researchList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                  <Typography sx={{ mr: 2, flexGrow: 1 }}>{idx + 1}. {item}</Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeFromList(researchList, setResearchList, idx)}
                    className="hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              <TextField
                inputRef={awardRef}
                label="Add Award (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = awardRef.current.value.trim();
                    addToList(awardsList, setAwardsList, value);
                    awardRef.current.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = awardRef.current.value.trim();
                          if (value) {
                            addToList(awardsList, setAwardsList, value);
                            awardRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              {awardsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                  <Typography sx={{ mr: 2, flexGrow: 1 }}>{idx + 1}. {item}</Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeFromList(awardsList, setAwardsList, idx)}
                    className="hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              <TextField
                inputRef={skillRef}
                label="Add Skill (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = skillRef.current.value.trim();
                    addToList(skillsList, setSkillsList, value);
                    skillRef.current.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = skillRef.current.value.trim();
                          if (value) {
                            addToList(skillsList, setSkillsList, value);
                            skillRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              {skillsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1, pl: 2 }}>
                  <Typography sx={{ mr: 2, flexGrow: 1 }}>{idx + 1}. {item}</Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeFromList(skillsList, setSkillsList, idx)}
                    className="hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={back}
              disabled={activeStep === 0}
              sx={{
                borderColor: '#1976d2',
                color: '#1976d2',
                borderRadius: '12px',
                px: 3,
                py: 1,
                fontWeight: 500,
                '&:hover': { borderColor: '#1565c0', color: '#1565c0', backgroundColor: 'rgba(25, 118, 210, 0.04)' },
              }}
            >
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <NewButton
                title="Next"
                handleFunction={next}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  background: 'linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)',
                  '&:hover': { background: 'linear-gradient(90deg, #1565c0 0%, #0b3d91 100%)' },
                }}
              />
            ) : (
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  background: 'linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)',
                  '&:hover': { background: 'linear-gradient(90deg, #1565c0 0%, #0b3d91 100%)' },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Submit'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}