import { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import { Description } from '@mui/icons-material';
import AlumniService from '../../apis/Alumni';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';

const steps = ['Personal Information', 'Academic Details', 'Work Experience'];

export default function AlumniProfile() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState();
  const [loading, setloading] = useState(false);
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

      enrollNumber: '',
      department: '',
      semester: '',

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
      valid = await trigger(['enrollNumber', 'department', 'semester', 'matriculationDetails', 'intermediateDetails']);
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

    let obj={
      ...newdata,
      profilePicture:profilePicture,
      department:data?.department?._id,
      workExperience:workExperience
    }
    handleFormSubmit(obj)
  };

  const handleFormSubmit = async (obj) => {
    try {
      const response = await AlumniService?.updatePost({ id: "6830cebc03414c821d034ebb", obj: obj })
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
      const response = await AlumniService?.getProfile('6830cebc03414c821d034ebb')
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
      setValue('enrollNumber', data?.academicDetails?.enrollNumber)
      setValue('department', data?.department?.name)
      setValue('semester', data?.academicDetails?.semester)

      setValue('matriculationDetails.schoolName', data?.matriculationDetails?.schoolName)
      setValue('matriculationDetails.passingYear', data?.matriculationDetails?.passingYear)
      setValue('matriculationDetails.grade', data?.matriculationDetails?.grade)

      setValue('intermediateDetails.collegeName', data?.intermediateDetails?.collegeName)
      setValue('intermediateDetails.passingYear', data?.intermediateDetails?.passingYear)
      setValue('intermediateDetails.grade', data?.intermediateDetails?.grade)

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

  const handleChange = (index, field, value) => {
    const updated = [...workExperience];
    updated[index][field] = value;
    setWorkExperience(updated);
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
                  src={
                    watch('profilePicture')
                      ? typeof watch('profilePicture') === 'string'
                        ? watch('profilePicture') // already a URL
                        : URL.createObjectURL(watch('profilePicture')) // binary file
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
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Academic Details
              </Typography>

              <TextField
                label="Enrollment Number"
                {...register('enrollNumber', { required: 'Enroll number is required' })}
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
                {...register('matriculationDetails.schoolName', { required: 'School name is required' })}
                error={Boolean(errors.matriculationDetails?.schoolName)}
                helperText={errors.matriculationDetails?.schoolName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register('matriculationDetails.passingYear', { required: 'Passing year is required' })}
                error={Boolean(errors.matriculationDetails?.passingYear)}
                helperText={errors.matriculationDetails?.passingYear?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Grade"
                {...register('matriculationDetails.grade', { required: 'Grade is required' })}
                error={Boolean(errors.matriculationDetails?.grade)}
                helperText={errors.matriculationDetails?.grade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}

              />

              {/* Inter Details */}
              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>Intermediate Details</Typography>
              <TextField
                label="College Name"
                {...register('intermediateDetails.collegeName', { required: 'College name is required' })}
                error={Boolean(errors.intermediateDetails?.collegeName)}
                helperText={errors.intermediateDetails?.collegeName?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Passing Year"
                type="number"
                {...register('intermediateDetails.passingYear', { required: 'Passing year is required' })}
                error={Boolean(errors.intermediateDetails?.passingYear)}
                helperText={errors.intermediateDetails?.passingYear?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Grade"
                {...register('intermediateDetails.grade', { required: 'Grade is required' })}
                error={Boolean(errors.intermediateDetails?.grade)}
                helperText={errors.intermediateDetails?.grade?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Work Experience
              </Typography>

              {workExperience.map((item, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                  <TextField
                    label="Company Name"
                    value={item.companyName}
                    onChange={(e) => handleChange(index, 'companyName', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Job Title"
                    value={item.jobTitle}
                    onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Start Year"
                    value={item.startYear}
                    onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="End Year"
                    value={item.endYear}
                    onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Responsibilities"
                    multiline
                    rows={3}
                    value={item.responsibilities}
                    onChange={(e) => handleChange(index, 'responsibilities', e.target.value)}
                    fullWidth
                    margin="normal"
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
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
