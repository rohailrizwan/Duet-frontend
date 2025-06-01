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
    Fade,
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
import 'tailwindcss/tailwind.css';
import DescriptionIcon from '@mui/icons-material/Description';

const InfoItem = ({ icon: Icon, text, color }) => (
    <Fade in timeout={600}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, transition: 'all 0.3s ease' }}>
            <Box
                sx={{
                    mr: 1.5,
                    backgroundColor: color || Colors?.PrimaryBlue,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            >
                <Icon fontSize="medium" />
            </Box>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 500,
                    color: Colors?.PrimaryDark,
                    fontSize: '1.1rem',
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {text}
            </Typography>
        </Box>
    </Fade>
);

const ChipSection = ({ title, data }) => (
    <Box sx={{ mb: 4 }}>
        <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
                mb: 2,
                color: Colors?.PrimaryDark,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.5px',
            }}
        >
            {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {data?.length > 0 ? (
                data.map((item, idx) => (
                    <Chip
                        key={idx}
                        label={item}
                        sx={{
                            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(101, 41, 255, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(101, 41, 255, 0.5)',
                            },
                        }}
                    />
                ))
            ) : (
                <Typography
                    variant="body2"
                    sx={{
                        color: 'gray',
                        fontStyle: 'italic',
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    No {title} Found
                </Typography>
            )}
        </Box>
    </Box>
);

const FacultyProfile = ({ userid }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFaculty = async () => {
            try {
                const res = await FacultyService.getProfile(userid);
                setData(res?.data);
                setLoading(false);
            } catch (err) {
                ErrorToaster(err?.message || 'Error fetching profile');
                setLoading(false);
            }
        };
        getFaculty();
    }, [userid]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #e6f0fa, #ffffff)',
                }}
            >
                <CircularProgress
                    sx={{
                        color: Colors?.PrimaryBlue,
                        size: 60,
                        thickness: 5,
                    }}
                />
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
        <Container
            sx={{
                background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                borderRadius: 4,
                py: 6,
                px: { xs: 3, md: 5 },
                minHeight: '100vh',
            }}
        >
            <Fade in timeout={800}>
                <Box>
                    <Grid container spacing={4}>
                        {/* Profile Header */}
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: 'center',
                                    gap: 3,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Avatar
                                    src={profilePicture || 'https://via.placeholder.com/150'}
                                    alt={name}
                                    sx={{
                                        width: { xs: 120, md: 160 },
                                        height: { xs: 120, md: 160 },
                                        border: '5px solid rgba(37, 117, 252, 0.15)',
                                        boxShadow: '0 8px 20px rgba(37, 117, 252, 0.2)',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        sx={{
                                            color: Colors?.PrimaryDark,
                                            fontFamily: "'Inter', sans-serif",
                                            mb: 1,
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: Colors?.PrimaryDark,
                                            opacity: 0.7,
                                            fontFamily: "'Inter', sans-serif",
                                            mb: 2,
                                        }}
                                    >
                                        {designation}
                                    </Typography>
                                    <Chip
                                        label="Faculty"
                                        sx={{
                                            backgroundColor: 'rgba(37, 117, 252, 0.1)',
                                            color: Colors?.PrimaryBlue,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: '16px',
                                            boxShadow: '0 2px 8px rgba(37, 117, 252, 0.2)',
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Grid>

                        {/* Basic Information */}
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 2.5,
                                            fontWeight: 700,
                                            color: '#1a237e',
                                            fontFamily: "'Inter', sans-serif",
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        Profile Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <InfoItem
                                                icon={EmailIcon}
                                                text={email}
                                                color="#2563eb"
                                                sx={{ mb: 2 }}
                                            />
                                            <InfoItem
                                                icon={PhoneIcon}
                                                text={contactNumber}
                                                color="#0284c7"
                                                sx={{ mb: 2 }}
                                            />
                                            <InfoItem
                                                icon={CalendarIcon}
                                                text={
                                                    dob
                                                        ? new Date(dob).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })
                                                        : 'N/A'
                                                }
                                                color="#16a34a"
                                                sx={{ mb: 2 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InfoItem
                                                icon={SchoolIcon}
                                                text={`Experience: ${experienceYear || 'N/A'} Years`}
                                                color="#d97706"
                                                sx={{ mb: 2 }}
                                            />
                                            <InfoItem
                                                icon={SchoolIcon}
                                                text={`Qualification: ${qualification || 'N/A'}`}
                                                color="#7c3aed"
                                                sx={{ mb: 2 }}
                                            />
                                            {/* <InfoItem
                                                icon={SchoolIcon}
                                                text={`Specialization: ${specialization || 'N/A'}`}
                                                color="#0d9488"
                                                sx={{ mb: 2 }}
                                            /> */}
                                        </Grid>
                                    </Grid>

                                    {department?.length > 0 && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 600,
                                                    color: '#1a237e',
                                                    fontFamily: "'Inter', sans-serif",
                                                }}
                                            >
                                                Departments
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {department.map((dept, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={dept?.name}
                                                        sx={{
                                                            background: 'linear-gradient(45deg, #3b82f6, #60a5fa)',
                                                            color: 'white',
                                                            fontWeight: 500,
                                                            fontSize: '0.85rem',
                                                            borderRadius: '12px',
                                                            px: 1,
                                                            py: 0.5,
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                                                                transform: 'translateY(-1px)',
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}

                                    <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                        {linkedInUrl && (
                                            <Link
                                                href={linkedInUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    color: '#1e40af',
                                                    textDecoration: 'none',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                    fontFamily: "'Inter', sans-serif",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    transition: 'background 0.2s ease',
                                                    '&:hover': {
                                                        background: '#dbeafe',
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                                                        borderRadius: '8px',
                                                        width: 36,
                                                        height: 36,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: '#fff',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    <LinkedInIcon fontSize="small" />
                                                </Box>
                                                LinkedIn
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
                                                    color: '#111827',
                                                    textDecoration: 'none',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                    fontFamily: "'Inter', sans-serif",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    transition: 'background 0.2s ease',
                                                    '&:hover': {
                                                        background: '#f3f4f6',
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #111827, #374151)',
                                                        borderRadius: '8px',
                                                        width: 36,
                                                        height: 36,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: '#fff',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    <GitHubIcon fontSize="small" />
                                                </Box>
                                                GitHub
                                            </Link>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* About Section */}
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                                    <DescriptionIcon sx={{ mr: 1, color: '#1a237e', fontSize: '1.5rem' }} />
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a237e',
                                            fontFamily: "'Inter', sans-serif",
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        About
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        whiteSpace: 'pre-line',
                                        color: '#1a237e',
                                        lineHeight: 1.8,
                                        fontFamily: "'Inter', sans-serif",
                                        mb: specialization ? 3 : 0,
                                    }}
                                >
                                    {personalizedDescription || 'No description available.'}
                                </Typography>
                                {specialization && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <SchoolIcon sx={{ mr: 1, color: '#0d9488', fontSize: '1.5rem' }} />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                color: '#0d9488',
                                                fontFamily: "'Inter', sans-serif",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            <strong>Specialization:</strong> {specialization}
                                        </Typography>
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                        {/* Academic Details Section */}
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    background: 'white',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{
                                        mb: 3,
                                        color: Colors?.PrimaryDark,
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                >
                                    Academic Details
                                </Typography>
                                <ChipSection title="Awards" data={awards} />
                                <ChipSection title="Subjects" data={subjects} />
                                <ChipSection title="Skills" data={skills} />
                                <ChipSection title="Research Papers" data={researchPapers} />
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Container>
    );
};

export default FacultyProfile;