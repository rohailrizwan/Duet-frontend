import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Typography,
    Grid,
    Chip,
    Divider,
    Card,
    CardContent,
    CircularProgress,
    Link,
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    CalendarToday as CalendarIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import FacultyService from '../../apis/Faculty';
import Colors from '../../assets/Style';
import { ErrorToaster } from '../../Components/Toaster';
import Container from '../../Components/Container';

const InfoItem = ({ icon: Icon, text, color }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
            sx={{
                mr: 1,
                backgroundColor: color || Colors?.PrimaryBlue,
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
        >
            <Icon fontSize="small" />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 500, color: Colors?.PrimaryDark }}>
            {text}
        </Typography>
    </Box>
);

const ChipSection = ({ title, data }) => (
    <>
        <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mt: 4, mb: 2, color: Colors?.PrimaryDark }}
        >
            {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data?.length > 0 ? (
                data.map((item, idx) => (
                    <Chip
                        key={idx}
                        label={item}
                        sx={{
                            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                            color: '#fff',
                            fontWeight: '600',
                            boxShadow: '0 4px 8px rgba(101, 41, 255, 0.4)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0 6px 12px rgba(101, 41, 255, 0.6)',
                            },
                        }}
                    />
                ))
            ) : (
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    No {title} Found
                </Typography>
            )}
        </Box>
    </>
);

const FacultyProfile = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFaculty = async () => {
            try {
                const res = await FacultyService.getProfile('6830cf1403414c821d034ef6');
                setData(res?.data);
                setLoading(false);
            } catch (err) {
                ErrorToaster(err?.message || 'Error fetching profile');
                setLoading(false);
            }
        };
        getFaculty();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    height: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(120deg, #f0f4ff, #dbe9ff)',
                }}
            >
                <CircularProgress sx={{ color: Colors?.PrimaryBlue }} />
            </Box>
        );
    }

    const {
        name,
        profilePicture,
        email,
        contactNumber,
        dob,
        linkedInUrl,
        gitHubUrl,
        personalizedDescription,
        academicDetails,
    } = data;

    const {
        designation,
        specialization,
        qualification,
        experienceYear,
        department,
        awards,
        subjects,
        skills,
        researchPapers,
    } = academicDetails || {};

    return (
        <Container sx={{ backgroundColor: '#f5f8ff', borderRadius: 3, py: 5 }}>
            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {/* Profile Card */}
                    <Grid item xs={12} lg={12}>
                        <Card
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 3,
                                boxShadow: 'none',
                                backgroundColor:'none', // Removed gradient, simple white bg
                                color: Colors?.PrimaryDark,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: "10px"
                            }}
                        >
                            <Avatar
                                src={profilePicture || 'https://via.placeholder.com/150'}
                                alt={'name'}
                                sx={{
                                    width: 140,
                                    height: 140,
                                    mb: 3,
                                    border: '4px solid rgba(37, 117, 252, 0.2)',
                                    boxShadow: '0 8px 20px rgba(37, 117, 252, 0.15)',
                                }}
                            />
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"start"}}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {name}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ opacity: 0.8, mb: 1 }}>
                                    {designation}
                                </Typography>
                                <Chip
                                    label="Faculty"
                                    sx={{
                                        backgroundColor: 'rgba(37, 117, 252, 0.15)',
                                        color: Colors?.PrimaryBlue,
                                        fontWeight: 'bold',
                                        letterSpacing: 1.2,
                                        mb: 1,
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 2,
                                        boxShadow: 'none',
                                    }}
                                />
                            </Box>
                        </Card>
                    </Grid>

                    {/* Basic Info */}
                    <Grid item xs={12} lg={12}>
                        <Card
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                boxShadow: 'none',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    gutterBottom
                                    sx={{ color: Colors?.PrimaryDark }}
                                >
                                    Basic Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} lg={6}>
                                        <InfoItem icon={EmailIcon} text={email} color="#0a66c2" />
                                        <InfoItem icon={PhoneIcon} text={contactNumber} color="#1e88e5" />
                                        <InfoItem
                                            icon={CalendarIcon}
                                            text={dob ? new Date(dob).toDateString() : 'N/A'}
                                            color="#43a047"
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <InfoItem
                                            icon={SchoolIcon}
                                            text={`Experience: ${experienceYear || 'N/A'} Years`}
                                            color="#fb8c00"
                                        />
                                        <InfoItem
                                            icon={SchoolIcon}
                                            text={`Qualification: ${qualification || 'N/A'}`}
                                            color="#8e24aa"
                                        />
                                        <InfoItem
                                            icon={SchoolIcon}
                                            text={`Specialization: ${specialization || 'N/A'}`}
                                            color="#00897b"
                                        />
                                    </Grid>
                                </Grid>

                                {department?.length > 0 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            sx={{ mb: 1, color: Colors?.PrimaryDark }}
                                        >
                                            Departments:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {department.map((dept, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={dept?.name}
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                        boxShadow: '0 2px 10px rgba(25, 118, 210, 0.5)',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Social Links */}
                                <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                    {linkedInUrl && (
                                        <Link
                                            href={linkedInUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                color: '#0A66C2',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: '#0A66C2',
                                                    borderRadius: '50%',
                                                    width: 36,
                                                    height: 36,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: '#fff',
                                                    boxShadow: '0 4px 10px rgba(10, 102, 194, 0.5)',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.15)',
                                                    },
                                                }}
                                            >
                                                <LinkedInIcon />
                                            </Box>
                                            LinkedIn Profile
                                        </Link>
                                    )}
                                    {gitHubUrl && (
                                        <Link
                                            href={gitHubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                color: '#000',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: '#000',
                                                    borderRadius: '50%',
                                                    width: 36,
                                                    height: 36,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: '#fff',
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.15)',
                                                    },
                                                }}
                                            >
                                                <GitHubIcon />
                                            </Box>
                                            GitHub Profile
                                        </Link>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* About Section */}
                <Divider sx={{ my: 6, borderColor: '#cfd8dc' }} />
                <Card sx={{ p: 3, borderRadius: 3 ,boxShadow:"none"}}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        About
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: Colors?.PrimaryDark }}>
                        {personalizedDescription || 'No description available.'}
                    </Typography>
                </Card>

                {/* Academic Details Section */}
                <Divider sx={{ my: 6, borderColor: '#cfd8dc',boxShadow:"none" }} />
                <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        Academic Details
                    </Typography>

                    <ChipSection title="Awards" data={awards} />
                    <ChipSection title="Subjects" data={subjects} />
                    <ChipSection title="Skills" data={skills} />
                    <ChipSection title="Research Papers" data={researchPapers} />
                </Card>
            </Box>
        </Container>
    );
};

export default FacultyProfile;
