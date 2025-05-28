import { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, TextareaAutosize, IconButton, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import { Add, Delete } from '@mui/icons-material';
import studentService from '../../apis/Student';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';


const steps = ['Personal Information', 'Academic Details', 'Work Experience'];

export default function Studentfaculty({userid}) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState();
  const [skills, setSkills] = useState(['']);
  const [loading, setloading] = useState(false);

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
    else if (activeStep === 2) {
      valid = await trigger(['workExperience']);
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
    profilePicture:profilePicture,
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
    matriculationDetails:{
      schoolName:newdata?.schoolName,
      passingYear:newdata?.passingYear,
      grade:newdata?.grade
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
      const response = await studentService?.updatePost({ id: "682cd27dd0b25c1b3b77b793", obj: obj })
      if (response) {
        console.log(response);
        SuccessToaster(response?.message)
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

      setValue("schoolName",data?.matriculationDetails?.schoolName)
      setValue("passingYear",data?.matriculationDetails?.passingYear)
      setValue("grade",data?.matriculationDetails?.grade)
      setValue("collegeName",data?.intermediateDetails?.collegeName)
      setValue("collegepassingYear",data?.intermediateDetails?.passingYear)
      setValue("collegegrade",data?.intermediateDetails?.grade)

      setSkills(data?.skills)
      setValue('workExperience',data?.workExperience)
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
                  src={
                    watch('image')
                      ? typeof watch('image') === 'string'
                        ? watch('image') // already a URL
                        : URL.createObjectURL(watch('image')) // binary file
                      : ''
                  }
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
                  {'Click to upload'}
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
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant='outlined'
                label="Email"
                {...register('email', { required: 'Email is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
                disabled
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Phone Number"
                {...register('contactNumber', { required: 'Phone number is required' })}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
              />



              <TextField
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
              />

              <TextField
                label="Linked In (Url)"
                {...register('linkedInUrl', { required: 'Url is required' })}
                error={Boolean(errors.linkedInUrl)}
                helperText={errors.linkedInUrl?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Github (Url)"
                {...register('gitHubUrl', { required: 'Github is required' })}
                error={Boolean(errors.gitHubUrl)}
                helperText={errors.gitHubUrl?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
                {...register('enrollNumber', { required: 'Enrollment number is required' })}
                error={Boolean(errors.enrollNumber)}
                helperText={errors.enrollNumber?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
              />
              <TextField
                label="Semester"
                {...register('semester', { required: 'Semester is required' })}
                error={Boolean(errors.semester)}
                helperText={errors.semester?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              {/* Matric Details */}
              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Matriculation Details</Typography>
              <TextField
                label="School Name"
                {...register('schoolName', { required: 'School name is required' })}
                error={Boolean(errors.schoolName)}
                helperText={errors.schoolName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
              />
              <TextField
                label="Grade"
                {...register('grade', { required: 'Grade is required' })}
                error={Boolean(errors.grade)}
                helperText={errors.grade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              {/* Inter Details */}
              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Intermediate Details</Typography>
              <TextField
                label="College Name"
                {...register('collegeName', { required: 'College name is required' })}
                error={Boolean(errors.collegeName)}
                helperText={errors.collegeName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
              />
              <TextField
                label="Grade"
                {...register('collegegrade', { required: 'Grade is required' })}
                error={Boolean(errors.collegegrade)}
                helperText={errors.collegegrade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
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
              >
                Add Skill
              </Button>

            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Work Experience
              </Typography>

              {/* Work Experience Fields */}
              {watch('workExperience')?.map((work, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <TextField
                    label="Company Name"
                    {...register(`workExperience.${index}.companyName`, { required: 'Company name is required' })}
                    error={Boolean(errors.workExperience?.[index]?.companyName)}
                    helperText={errors.workExperience?.[index]?.companyName?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Job Title"
                    {...register(`workExperience.${index}.jobTitle`, { required: 'Job title is required' })}
                    error={Boolean(errors.workExperience?.[index]?.jobTitle)}
                    helperText={errors.workExperience?.[index]?.jobTitle?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Start Year"
                    type="number"
                    {...register(`workExperience.${index}.startYear`, { required: 'Start year is required' })}
                    error={Boolean(errors.workExperience?.[index]?.startYear)}
                    helperText={errors.workExperience?.[index]?.startYear?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="End Year"
                    type="number"
                    {...register(`workExperience.${index}.endYear`, { required: 'End year is required' })}
                    error={Boolean(errors.workExperience?.[index]?.endYear)}
                    helperText={errors.workExperience?.[index]?.endYear?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Responsibilities"
                    {...register(`workExperience.${index}.responsibilities`, { required: 'Responsibilities are required' })}
                    error={Boolean(errors.workExperience?.[index]?.responsibilities)}
                    helperText={errors.workExperience?.[index]?.responsibilities?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
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
                {loading ? <CircularProgress size={'12'} color='white' /> : 'Submit'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
