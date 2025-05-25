import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Grid, Avatar, Chip, CircularProgress,
    Card, Link, CardContent, Divider
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    CalendarToday as CalendarIcon,
    School as SchoolIcon,
    BusinessCenter as WorkIcon,
    Home as HomeIcon
} from '@mui/icons-material';
import Container from '../../Components/Container';
import Colors from '../../assets/Style';
import studentService from '../../apis/Student';

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
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2, color: Colors?.PrimaryDark }}>
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

function StudentProfile() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudent = async () => {
            try {
                const res = await studentService.getProfile('682cd27dd0b25c1b3b77b793');
                setData(res?.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile', err);
                setLoading(false);
            }
        };
        getStudent();
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

    return (
        <Box>
            <Container sx={{ backgroundColor: '#f5f8ff', borderRadius: 3, py: 5 }}>
                <Box sx={{ px: { xs: 2, md: 4 } }}>
                    {/* Profile Header */}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <Avatar
                                    src={data?.profilePicture || 'https://via.placeholder.com/150'}
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        border: '4px solid rgba(37, 117, 252, 0.2)',
                                        boxShadow: '0 8px 20px rgba(37, 117, 252, 0.15)',
                                    }}
                                />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {data?.name}
                                    </Typography>
                                    <Chip
                                        label="Student"
                                        sx={{
                                            mt: 1,
                                            backgroundColor: 'rgba(37, 117, 252, 0.15)',
                                            color: Colors?.PrimaryBlue,
                                            fontWeight: 'bold',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Grid>

                        {/* Basic Info */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Basic Information
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <InfoItem icon={EmailIcon} text={data?.email} color="#0a66c2" />
                                            <InfoItem icon={PhoneIcon} text={data?.contactNumber} color="#1e88e5" />
                                            <InfoItem
                                                icon={CalendarIcon}
                                                text={data?.dob ? new Date(data?.dob).toDateString() : 'N/A'}
                                                color="#43a047"
                                            />
                                            <InfoItem icon={HomeIcon} text={data?.address || 'N/A'} color="#43a047" />
                                        </Grid>
                                    </Grid>

                                    {/* Social Links */}
                                    <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                        {data?.linkedInUrl && (
                                            <Link
                                                href={data?.linkedInUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    color: '#0A66C2',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
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
                                                    }}
                                                >
                                                    <LinkedInIcon />
                                                </Box>
                                                LinkedIn Profile
                                            </Link>
                                        )}
                                        {data?.gitHubUrl && (
                                            <Link
                                                href={data?.gitHubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    color: '#000',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
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

                    <Divider sx={{ my: 3 }} />

                    {/* About Section */}
                    {data?.personalizedDescription && (
                        <>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                About
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, pl: 2 }}>
                                {data.personalizedDescription}
                            </Typography>
                            <Divider sx={{ my: 3 }} />
                        </>
                    )}

                    {/* Academic Details */}
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Academic Details
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                        <SchoolIcon sx={{ mr: 2, color: '#1976d2' }} />
                        <Typography variant="body1">
                            Dawood University - Enroll Number: {data?.academicDetails?.enrollNumber}, Semester: {data?.academicDetails?.semester}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                        <SchoolIcon sx={{ mr: 2, color: '#1976d2' }} />
                        <Typography variant="body1">
                            {data?.intermediateDetails?.collegeName} - Passing year: {data?.intermediateDetails?.passingYear} - Grade: {data?.intermediateDetails?.grade}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                        <SchoolIcon sx={{ mr: 2, color: '#1976d2' }} />
                        <Typography variant="body1">
                            {data?.matriculationDetails?.schoolName} - Passing year: {data?.matriculationDetails?.passingYear} - Grade: {data?.matriculationDetails?.grade}
                        </Typography>
                    </Box>

                    {data?.workExperience?.length > 0 && (
                        <>
                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2, color: Colors?.PrimaryDark }}>
                                Work Experience
                            </Typography>
                            {data?.workExperience?.map((exp, index) => (
                                <Card key={index} sx={{ mb: 2, p: 2 }}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <WorkIcon sx={{ color: Colors?.PrimaryBlue }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {exp.jobTitle} - {exp.organizationName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {exp.startYear} - {exp?.endYear || "Present"}
                                            </Typography>
                                            <Typography variant="body2">
                                                {exp.responsibilities}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </>
                    )}
                    {/* Skills */}
                    <ChipSection title="Skills" data={data?.skills} />

                </Box>
            </Container>
        </Box>
    );
}

export default StudentProfile;
