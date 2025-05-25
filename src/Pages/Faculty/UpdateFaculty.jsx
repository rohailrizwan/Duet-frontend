import { useEffect, useRef, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Divider, Avatar, MenuItem, Select, InputLabel, FormControl, FormHelperText, OutlinedInput, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NewButton } from '../../Components/BtnComponent';
import Facultyservice from '../../apis/Faculty';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import UploadServices from '../../apis/Upload';
import { imagebaseUrl } from '../../Config/axios';
const steps = ['Personal Information', 'Academic Details'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
export default function UpdateFaculty() {
  const [activeStep, setActiveStep] = useState(0);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [researchList, setResearchList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectDepartment, setselectDepartment] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [designations, setdesignations] = useState('');
  const [data, setdata] = useState();
  const [loading, setloading] = useState(false);
  const subjectRef = useRef();
  const awardRef = useRef();
  const researchRef = useRef();
  const skillref = useRef();
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: {
      profilePicture: null,
      name: '',
      email: '',
      contactNumber: '',
      dob: '',
      address: '',
      gitHubUrl: "",
      linkedInUrl: "",
      personalizedDescription: "", // step 1
      designation: ""
    },

  });
  const designationsArray = ["Professor", "Lecturer"];
  const next = async () => {
    let valid = false;
    if (!watch('profilePicture')) {
      ErrorToaster('Profile image is required')
      return; // Don't proceed
    }
    if (activeStep === 0) {
      valid = await trigger(['profilePicture', 'name', 'email', 'contactNumber', 'gitHubUrl', 'personalizedDescription', 'dob', 'address', 'linkedInUrl']);
    }
    if (activeStep === 1) {
      valid = await trigger(['specialization', 'experienceYear', 'qualification']);
    }
    if (valid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (newdata) => {
    console.log(newdata, selectDepartment, awardsList, skillsList, subjectsList, researchList);
    if (selectDepartment?.length == 0) {
      return ErrorToaster('department is required')
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
      profilePicture: profilePicture,
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
      }
    }

    handleFormSubmit(obj)
  };

  const handleFormSubmit = async (obj) => {
    try {
      const response = await Facultyservice?.updatePost({ id: "6830cf1403414c821d034ef6", obj: obj })
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



  const addToList = (list, setList, key, value) => {
    if (value && !list.includes(value)) {
      const updated = [...list, value];
      setList(updated);
      // setValue(key, updated);
    }
  };

  const removeFromList = (list, setList, key, index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
    // setValue(key, updated);
  };

  const getFaculty = async () => {
    try {
      const response = await Facultyservice?.getProfile('6830cf1403414c821d034ef6')
      console.log(response);
      setdata(response?.data)
    } catch (error) {
      ErrorToaster(error?.message || 'Error')
    }
  }

  useEffect(() => {
    getFaculty()
    getDepartments()
  }, [])

  useEffect(() => {
    if (data) {
      setValue('profilePicture', data?.profilePicture) // step 1 ok
      setValue('name', data?.name) // step 1 ok
      setValue('email', data?.email) // step 1 ok
      setValue('personalizedDescription', data?.personalizedDescription) // step 1 ok
      setValue('contactNumber', data?.contactNumber) // step 1 ok
      setValue('dob', convertToDateInputFormat(data?.dob)) // step 1
      setValue('address', data?.address) // step 1
      setValue('linkedInUrl', data?.linkedInUrl) // step 1
      setValue('gitHubUrl', data?.gitHubUrl) // step 1


      setValue('experienceYear', data?.academicDetails?.experienceYear) // step 1
      setValue('specialization', data?.academicDetails?.specialization) // step 1
      setValue('qualification', data?.academicDetails?.qualification) // step 1
      setdesignations(data.academicDetails.designation); // step 1
      setselectDepartment(data?.academicDetails?.department?.map((item) => item?._id))
      setSubjectsList(data?.academicDetails?.subjects)
      setAwardsList(data?.academicDetails?.awards) // ok
      setResearchList(data?.academicDetails?.researchPapers) // ok
      setSkillsList(data?.academicDetails?.skills) // ok

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

  const getDepartments = async () => {
    try {
      const response = await Facultyservice.getDepartment();
      console.log(response?.data);
      setdepartments(response?.data || [])
    }
    catch (error) {
      ErrorToaster(error)
    }
  }
  const handleChangeDepartment = (event) => {
    const value = event.target.value;
    setselectDepartment(Array.isArray(value) ? value : []);
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
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Email"
                {...register('email', { required: 'Email is required' })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                disabled
              />
              <TextField
                label="Phone Number"
                {...register('contactNumber', { required: 'Phone number is required' })}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
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
                {...register('linkedInUrl', { required: 'Linkedin url is required' })}
                error={Boolean(errors.linkedInUrl)}
                helperText={errors.linkedInUrl?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Github (Url)"
                {...register('gitHubUrl', { required: 'GitHubUrl is required' })}
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
              <FormControl fullWidth sx={{marginBottom:"15px"}}>
                <InputLabel>Department</InputLabel>
                <Select
                  multiple
                  name="department"
                  value={selectDepartment || []}
                  onChange={handleChangeDepartment}
                  input={<OutlinedInput label="Department" />}
                  MenuProps={MenuProps}
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
              </FormControl>

              <FormControl fullWidth >
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  name="designation"
                  defaultValue=""
                  required
                  value={designations}
                  onChange={(e) => setdesignations(e.target.value)}
                >
                  {designationsArray.map((designation) => (
                    <MenuItem key={designation} value={designation}>
                      {designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>




              <TextField label="Qualification" {...register('qualification', { required: 'Qualification is required' })}
                error={!!errors.qualification} helperText={errors.qualification?.message} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

              <TextField label="Experience (in years)" {...register('experienceYear', { required: 'Experience is required' })}
                error={!!errors.experienceYear} helperText={errors.experienceYear?.message} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

              <TextField label="Specializations" multiline rows={2} {...register('specialization', { required: 'Specialization is required' })}
                error={!!errors.specialization} helperText={errors.specialization?.message} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />



              <TextField
                inputRef={subjectRef}
                label="Add Subject (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(subjectsList, setSubjectsList, 'subjects', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = subjectRef.current.value.trim();
                          if (value) {
                            addToList(subjectsList, setSubjectsList, 'subjects', value);
                            subjectRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {subjectsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ mr: 2 }}>{idx + 1}. {item}</Typography>
                  <Button color="error" onClick={() => removeFromList(subjectsList, setSubjectsList, 'subjects', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                inputRef={researchRef}
                label="Add Research Paper (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(researchList, setResearchList, 'researchPapers', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = researchRef.current.value.trim();
                          if (value) {
                            addToList(researchList, setResearchList, 'researchPapers', value);
                            researchRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {researchList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ mr: 2 }}>{idx + 1}. {item}</Typography>
                  <Button color="error" onClick={() => removeFromList(researchList, setResearchList, 'researchPapers', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                inputRef={awardRef}
                label="Add Award (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(awardsList, setAwardsList, 'awards', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = awardRef.current.value.trim();
                          if (value) {
                            addToList(awardsList, setAwardsList, 'awards', value);
                            awardRef.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {awardsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ mr: 2 }}>{idx + 1}. {item}</Typography>
                  <Button color="error" onClick={() => removeFromList(awardsList, setAwardsList, 'awards', idx)}>Remove</Button>
                </Box>
              ))}

              <TextField
                inputRef={skillref}
                label="Add Skill (Optional)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToList(skillsList, setSkillsList, 'skills', e.target.value);
                    e.target.value = '';
                  }
                }}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddIcon
                        color="action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const value = skillref.current.value.trim();
                          if (value) {
                            addToList(skillsList, setSkillsList, 'skills', value);
                            skillref.current.value = '';
                          }
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {skillsList.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ mr: 2 }}>{idx + 1}. {item}</Typography>
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
                {loading ? <CircularProgress size={12} color='white' /> : "Submit"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
