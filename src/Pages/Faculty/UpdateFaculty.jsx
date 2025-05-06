import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';

const steps = ['Personal Information', 'Academic Details'];

export default function UpdateFaculty() {
  const [activeStep, setActiveStep] = useState(0);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [researchList, setResearchList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      image: null,
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      github: "",
      linkedin: "",
      description: "", // personal
      subjects: '',
      researchPapers: '',
      awards: '',
      specialization: '',
      skills: '',
      department: '',
      qualification: '',
      designation: '',
      experience: '',
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



  const addToList = (list, setList, key, value) => {
    if (value && !list.includes(value)) {
      const updated = [...list, value];
      setList(updated);
      setValue(key, updated);
    }
  };

  const removeFromList = (list, setList, key, index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
    setValue(key, updated);
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
              <TextField
                label="Description (max 400 characters)"
                multiline
                rows={4}
                inputProps={{ maxLength: 400 }}
                {...register('description', { required: 'Description is required' })}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Linked In (Url)"
                {...register('linkedin', { required: 'Url is required' })}
                error={Boolean(errors.linkedin)}
                helperText={errors.linkedin?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Github (Url)"
                {...register('github', { required: 'Github is required' })}
                error={Boolean(errors.github)}
                helperText={errors.github?.message}
                fullWidth
                margin="normal"
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <FormControl fullWidth margin="normal" error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  defaultValue=""
                  {...register('department', { required: 'Department is required' })}
                >
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                  <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                  <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                </Select>
                <FormHelperText>{errors.department?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={!!errors.designation}>
                <InputLabel>Designation</InputLabel>
                <Select
                  defaultValue=""
                  {...register('designation', { required: 'Designation is required' })}
                >
                  <MenuItem value="Professor">Professor</MenuItem>
                  <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                  <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                  <MenuItem value="Lecturer">Lecturer</MenuItem>
                </Select>
                <FormHelperText>{errors.designation?.message}</FormHelperText>
              </FormControl>

              <TextField label="Qualification" {...register('qualification', { required: 'Qualification is required' })}
                error={!!errors.qualification} helperText={errors.qualification?.message} fullWidth margin="normal" />

              <TextField label="Experience (in years)" {...register('experience', { required: 'Experience is required' })}
                error={!!errors.experience} helperText={errors.experience?.message} fullWidth margin="normal" />

              <TextField label="Specializations" multiline rows={2}
                {...register('specialization')}
                fullWidth margin="normal" />

              <TextField
                label="Add Subject"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(subjectsList, setSubjectsList, 'subjects', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
              />
              {subjectsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography>{item}</Typography>
                  <Button color="error" onClick={() => removeFromList(subjectsList, setSubjectsList, 'subjects', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                label="Add Research Paper"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(researchList, setResearchList, 'researchPapers', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
              />
              {researchList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography>{item}</Typography>
                  <Button color="error" onClick={() => removeFromList(researchList, setResearchList, 'researchPapers', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                label="Add Award"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(awardsList, setAwardsList, 'awards', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
              />
              {awardsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography>{item}</Typography>
                  <Button color="error" onClick={() => removeFromList(awardsList, setAwardsList, 'awards', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                label="Add Skill"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(skillsList, setSkillsList, 'skills', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
              />
              {skillsList?.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography>{item}</Typography>
                  <Button color="error" onClick={() => removeFromList(skillsList, setSkillsList, 'skills', idx)}>Remove</Button>
                </Box>
              ))}

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
