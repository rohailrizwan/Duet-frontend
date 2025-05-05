"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import {
    Box,
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Button,
    Grid,
    TextField,
    Avatar,
    Card,
    CardContent,
    Divider,
    Paper,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
    Chip, // Import Chip from @mui/material
} from "@mui/material"

// Import MUI Icons
import {
    Person,
    Email,
    Phone,
    Home,
    Description,
    LinkedIn,
    GitHub,
    Language,
    School,
    MenuBook,
    AccountBalance,
    Work,
    EmojiEvents,
    Add,
    Delete,
    ChevronLeft,
    ChevronRight,
    Save,
    Upload,
    FiberManualRecord,
    Psychology,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

// Create a custom theme with blue color scheme
const theme = createTheme({
    palette: {
        primary: {
            main: "#2156a8", // Blue color as requested
            light: "#4f7dcf",
            dark: "#163b75",
        },
        secondary: {
            main: "#1e88e5", // Lighter blue for secondary
        },
        background: {
            default: "#f8f9fa",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                },
            },
        },
    },
})

// Steps for the resume builder
const steps = ["Personal Info", "Social Links", "Academic Detail", "Work Experience", "Co Activities"]

function CreateResume() {
    const [activeStep, setActiveStep] = useState(0)
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(20)
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate()
    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        trigger,
        setValue,
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            description: "",
            linkedin: "",
            github: "",
            portfolio: "",
            enrollment: "",
            department: "",
            semester: "",
            matricDetails: {
                schoolName: "",
                passingYear: "",
                grade: "",
            },
            interDetails: {
                collegeName: "",
                passingYear: "",
                grade: "",
            },
            workExperience: [
                {
                    organization: "",
                    role: "",
                    duration: "",
                    responsibilities: "",
                },
            ],
            activities: "",
            skills: [],
        },
    })

    useEffect(() => {
        setValue("skills", skills);
    }, [skills, setValue]);

    // Field array for work experience
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperience",
    })

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
            setValue("profileImage", file)
        }
    }

    // Handle next button click
    const handleNext = async () => {
        let isValid = true

        // Validate current step fields before proceeding
        if (activeStep === 0) {
            isValid = await trigger(["fullName", "email", "phone", "address", "description"])
        } else if (activeStep === 2) {
            isValid = await trigger([
                "enrollment",
                "department",
                "semester",
                "matricDetails.schoolName",
                "matricDetails.passingYear",
                "matricDetails.grade",
                "interDetails.collegeName",
                "interDetails.passingYear",
                "interDetails.grade",
            ])
        } else if (activeStep === 4) {
            isValid = await trigger(["activities", "skills"])
        }

        if (isValid) {
            setActiveStep((prevStep) => prevStep + 1)
            setProgress((activeStep + 2) * 20)
        }
    }

    // Handle back button click
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1)
        setProgress(activeStep * 20)
    }

    // Handle form submission
    const onSubmit = (data) => {
        console.log("Resume Submitted:", data)
        navigate('/profile/candidateResume', { state: data });
        // alert("Resume submitted successfully!")
    }

    // Personal Info Form
    const renderPersonalInfoForm = () => (
        <Box sx={{ py: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                <Avatar
                    src={image}
                    sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: "4px solid #d0e1f9",
                        backgroundColor: "#e3f2fd",
                    }}
                >
                    {!image && <Person sx={{ fontSize: 60, color: "#2156a8" }} />}
                </Avatar>

                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<Upload />}
                    sx={{
                        borderRadius: 2,
                        color: "#2156a8",
                        borderColor: "#2156a8",
                        "&:hover": {
                            borderColor: "#163b75",
                            backgroundColor: "#e3f2fd",
                        },
                    }}
                >
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        placeholder="John Doe"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="action" />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        {...register("fullName", { required: "Full name is required" })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        placeholder="john.doe@example.com"
                        variant="outlined"
                        type="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="action" />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        placeholder="+1 (555) 123-4567"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone color="action" />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        {...register("phone", {
                            required: "Phone number is required",
                            minLength: {
                                value: 10,
                                message: "Phone number must be at least 10 digits",
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Address"
                        placeholder="123 Main St, City, Country"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Home color="action" />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        {...register("address", { required: "Address is required" })}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Professional Summary"
                        placeholder="Write a short description about yourself and your professional background..."
                        variant="outlined"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...register("description", {
                            required: "Professional summary is required",
                            minLength: {
                                value: 10,
                                message: "Please provide a more detailed description",
                            },
                        })}
                    />
                </Grid>
            </Grid>
        </Box>
    )

    // Social Links Form
    const renderSocialLinksForm = () => (
        <Box sx={{ py: 2 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Connect Your Professional Profiles
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Add your social media profiles to enhance your resume
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="LinkedIn Profile"
                        placeholder="https://linkedin.com/in/yourprofile"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkedIn sx={{ color: "#0077b5" }} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.linkedin}
                        helperText={errors.linkedin?.message}
                        {...register("linkedin", {
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
                                message: "Please enter a valid LinkedIn URL",
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="GitHub Profile"
                        placeholder="https://github.com/yourusername"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GitHub sx={{ color: "#333" }} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.github}
                        helperText={errors.github?.message}
                        {...register("github", {
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                                message: "Please enter a valid GitHub URL",
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Portfolio Website"
                        placeholder="https://yourportfolio.com"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Language color="action" />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.portfolio}
                        helperText={errors.portfolio?.message}
                        {...register("portfolio", {
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/,
                                message: "Please enter a valid URL",
                            },
                        })}
                    />
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mt: 4,
                    bgcolor: "#e3f2fd",
                    borderRadius: 2,
                }}
            >
                <Typography variant="body2" color="#2156a8">
                    <strong>Pro Tip:</strong> Adding your professional profiles can increase your visibility to potential
                    employers and showcase your work beyond what's in your resume.
                </Typography>
            </Paper>
        </Box>
    )

    // Academic Details Form
    const renderAcademicDetailsForm = () => (
        <Box sx={{ py: 2 }}>
            {/* University Information */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccountBalance sx={{ color: "#2156a8", mr: 1 }} />
                    <Typography variant="h6">University Information</Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Enrollment Number"
                            placeholder="e.g., 2021CS1234"
                            variant="outlined"
                            error={!!errors.enrollment}
                            helperText={errors.enrollment?.message}
                            {...register("enrollment", { required: "Enrollment number is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Department"
                            placeholder="e.g., Computer Science"
                            variant="outlined"
                            error={!!errors.department}
                            helperText={errors.department?.message}
                            {...register("department", { required: "Department is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Semester"
                            placeholder="e.g., 5th"
                            variant="outlined"
                            error={!!errors.semester}
                            helperText={errors.semester?.message}
                            {...register("semester", { required: "Semester is required" })}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Matriculation Details */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <School sx={{ color: "#2156a8", mr: 1 }} />
                    <Typography variant="h6">Matriculation Details</Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="School Name"
                            placeholder="e.g., ABC High School"
                            variant="outlined"
                            error={!!errors.matricDetails?.schoolName}
                            helperText={errors.matricDetails?.schoolName?.message}
                            {...register("matricDetails.schoolName", { required: "School name is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Passing Year"
                            placeholder="e.g., 2018"
                            variant="outlined"
                            error={!!errors.matricDetails?.passingYear}
                            helperText={errors.matricDetails?.passingYear?.message}
                            {...register("matricDetails.passingYear", { required: "Passing year is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Grade/Percentage"
                            placeholder="e.g., 95% or A+"
                            variant="outlined"
                            error={!!errors.matricDetails?.grade}
                            helperText={errors.matricDetails?.grade?.message}
                            {...register("matricDetails.grade", { required: "Grade is required" })}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Intermediate Details */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <MenuBook sx={{ color: "#2156a8", mr: 1 }} />
                    <Typography variant="h6">Intermediate Details</Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="College Name"
                            placeholder="e.g., XYZ Junior College"
                            variant="outlined"
                            error={!!errors.interDetails?.collegeName}
                            helperText={errors.interDetails?.collegeName?.message}
                            {...register("interDetails.collegeName", { required: "College name is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Passing Year"
                            placeholder="e.g., 2020"
                            variant="outlined"
                            error={!!errors.interDetails?.passingYear}
                            helperText={errors.interDetails?.passingYear?.message}
                            {...register("interDetails.passingYear", { required: "Passing year is required" })}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Grade/Percentage"
                            placeholder="e.g., 90% or A"
                            variant="outlined"
                            error={!!errors.interDetails?.grade}
                            helperText={errors.interDetails?.grade?.message}
                            {...register("interDetails.grade", { required: "Grade is required" })}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

    // Work Experience Form
    const renderWorkExperienceForm = () => (
        <Box sx={{ py: 2 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Work Experience (Optional)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Add your professional experience to showcase your skills
                </Typography>
            </Box>

            {fields.map((field, index) => (
                <Card
                    key={field.id}
                    sx={{
                        mb: 3,
                        border: "1px solid #bbdefb",
                        borderRadius: 2,
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Work sx={{ color: "#2156a8", mr: 1 }} />
                                <Typography variant="h6">Experience {index + 1}</Typography>
                            </Box>

                            {index > 0 && (
                                <IconButton onClick={() => remove(index)} color="error" size="small">
                                    <Delete />
                                </IconButton>
                            )}
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Organization Name"
                                    placeholder="e.g., Acme Corporation"
                                    variant="outlined"
                                    error={!!errors.workExperience?.[index]?.organization}
                                    helperText={errors.workExperience?.[index]?.organization?.message}
                                    {...register(`workExperience.${index}.organization`)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Your Role"
                                    placeholder="e.g., Software Engineer"
                                    variant="outlined"
                                    error={!!errors.workExperience?.[index]?.role}
                                    helperText={errors.workExperience?.[index]?.role?.message}
                                    {...register(`workExperience.${index}.role`)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Duration"
                                    placeholder="e.g., Jan 2022 - Present"
                                    variant="outlined"
                                    error={!!errors.workExperience?.[index]?.duration}
                                    helperText={errors.workExperience?.[index]?.duration?.message}
                                    {...register(`workExperience.${index}.duration`)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Responsibilities & Achievements"
                                    placeholder="Describe your key responsibilities and achievements in this role..."
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    error={!!errors.workExperience?.[index]?.responsibilities}
                                    helperText={errors.workExperience?.[index]?.responsibilities?.message}
                                    {...register(`workExperience.${index}.responsibilities`)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => append({ organization: "", role: "", duration: "", responsibilities: "" })}
                fullWidth
                sx={{
                    mt: 2,
                    py: 1.5,
                    borderStyle: "dashed",
                    borderColor: "#bbdefb",
                    color: "#2156a8",
                    "&:hover": {
                        borderColor: "#2156a8",
                        backgroundColor: "#e3f2fd",
                    },
                }}
            >
                Add Another Experience
            </Button>

            {fields.length === 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mt: 4,
                        bgcolor: "#e3f2fd",
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="#2156a8">
                        Work experience is optional but highly recommended to showcase your professional background.
                    </Typography>
                </Paper>
            )}
        </Box>
    )

    // Activities Form
    const renderActivitiesAndSkillsForm = () => {

        // Function to add a new skill
        const addSkill = () => {
            if (newSkill.trim() !== "") {
                const updatedSkills = [...skills, newSkill.trim()];
                setSkills(updatedSkills);
                setNewSkill("");
            }
        };

        // Function to remove a skill
        const removeSkill = (indexToRemove) => {
            const updatedSkills = skills.filter((_, index) => index !== indexToRemove);
            setSkills(updatedSkills);
        };

        // Handle key press (add skill when Enter is pressed)
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
            }
        };

        return (
            <Box sx={{ py: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <EmojiEvents sx={{ color: "#2156a8", mr: 1 }} />
                    <Typography variant="h5">Activities & Skills</Typography>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mb: 4,
                        bgcolor: "#e3f2fd",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="#2156a8">
                        Showcase both your co-curricular activities and professional skills. This helps employers understand your
                        well-rounded personality and technical capabilities.
                    </Typography>
                </Paper>

                {/* Activities Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                        <EmojiEvents sx={{ color: "#2156a8", mr: 1, fontSize: 20 }} />
                        Co-curricular Activities
                    </Typography>

                    <TextField
                        fullWidth
                        label="Your Activities"
                        placeholder="Describe your co-curricular activities, achievements, and leadership roles..."
                        variant="outlined"
                        multiline
                        rows={4}
                        error={!!errors.activities}
                        helperText={errors.activities?.message}
                        {...register("activities", {
                            required: "Activities are required",
                            minLength: {
                                value: 10,
                                message: "Please provide more details about your activities",
                            },
                        })}
                    />
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Skills Section */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                        <Psychology sx={{ color: "#2156a8", mr: 1, fontSize: 20 }} />
                        Professional Skills
                    </Typography>

                    {/* Add skills input */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Add a Skill"
                            placeholder="e.g., JavaScript, React, Team Leadership"
                            variant="outlined"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={addSkill}
                                            disabled={!newSkill.trim()}
                                        >
                                            <Add />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Display skills as chips */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {skills.map((skill, index) => (
                            <Chip
                                key={index}
                                label={skill}
                                onDelete={() => removeSkill(index)}
                                color="primary"
                                variant="outlined"
                                sx={{ borderColor: "#2156a8", color: "#2156a8" }}
                            />
                        ))}
                    </Box>

                    {errors.skills && (
                        <Typography color="error" variant="caption" sx={{ display: "block", mt: 1 }}>
                            {errors.skills.message}
                        </Typography>
                    )}

                    {/* Hidden field to register skills array with react-hook-form */}
                    <input
                        type="hidden"
                        {...register("skills", {
                            validate: value => (value && value.length > 0) || "Please add at least one skill"
                        })}
                    />
                </Box>
            </Box>
        );
    };

    // Render the current step content
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return renderPersonalInfoForm()
            case 1:
                return renderSocialLinksForm()
            case 2:
                return renderAcademicDetailsForm()
            case 3:
                return renderWorkExperienceForm()
            case 4:
                return renderActivitiesAndSkillsForm()
            default:
                return "Unknown step"
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                    py: { xs: 2, sm: 4 },
                    px: { xs: 1, sm: 2 },
                }}
            >
                <Container maxWidth="lg">
                    <Card>
                        <Box
                            sx={{
                                p: { xs: 2, sm: 3 },
                                background: "linear-gradient(to right, #2156a8, #1e88e5)",
                                color: "white",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <Description />
                                <Typography variant="h4" component="h1" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                                    Create Your Resume
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                Build a professional resume in just a few steps
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    mt: 2,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: "white",
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ p: { xs: 1, sm: 2 } }}>
                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                sx={{
                                    pt: 3,
                                    pb: 4,
                                    display: { xs: "none", sm: "flex" }, // Hide on mobile, show on larger screens
                                }}
                            >
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {/* Mobile stepper alternative */}
                            <Box sx={{ display: { xs: "block", sm: "none" }, textAlign: "center", py: 2 }}>
                                <Typography variant="body1" fontWeight="medium">
                                    Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {getStepContent(activeStep)}

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: "space-between",
                                        gap: { xs: 2, sm: 0 },
                                        mt: 4,
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                        startIcon={<ChevronLeft />}
                                        fullWidth={window.innerWidth < 600}
                                    >
                                        Previous
                                    </Button>

                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            endIcon={<Save />}
                                            fullWidth={window.innerWidth < 600}
                                        >
                                            Submit Resume
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            color="primary"
                                            endIcon={<ChevronRight />}
                                            fullWidth={window.innerWidth < 600}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default CreateResume
