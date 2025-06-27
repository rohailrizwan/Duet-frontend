import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
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
import Colors from '../../assets/Style';
import AlumniService from '../../apis/Alumni';

// InfoItem component with enhanced styling
const InfoItem = ({ icon: Icon, text, color }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' }
        }}
    >
        <Box
            sx={{
                mr: 2,
                background: `linear-gradient(45deg, ${color || Colors?.PrimaryBlue || '#3b5998'}, #5c80bc)`,
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }
            }}
        >
            <Icon fontSize="small" />
        </Box>
        <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: Colors?.PrimaryDark || '#1e3a8a' }}
        >
            {text}
        </Typography>
    </Box>
);


function AlumniProfile({ userid }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAlumni = async () => {
            try {
                const res = await AlumniService.getProfile(userid);
                setData(res?.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile', err);
                setLoading(false);
            }
        };
        getAlumni();
    }, [userid]);
    console.log(data, 'data');

    return (
        <Box sx={{ minHeight: '100vh', background: 'transparent' }}>
            {/* <Container sx={{ py: 6, maxWidth: 'lg' }}> */}
                <Card
                    sx={{
                        // borderRadius: 4,
                        boxShadow: 'none',
                        // background: 'linear-gradient(180deg, #ffffff, #f5f8ff)',
                        // transition: 'all 0.3s ease-in-out',
                        // '&:hover': { boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }
                    }}
                >
                    <CardContent sx={{ px: { xs: 3, md: 6 }, py: 4 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: 'center',
                                        gap: 5,
                                        p: 5,
                                        borderRadius: 3,
                                        backdropFilter: 'blur(10px)',
                                        // background: 'rgba(255, 255, 255, 0.1)',
                                        // boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '30%',
                                            background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27%23e6ecf5%27 fill-opacity=%271%27 d=%27M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E") no-repeat bottom',
                                            zIndex: 0
                                        },
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
                                        }
                                    }}
                                >
                                    <Avatar
                                        src={data?.profilePicture || 'https://via.placeholder.com/150'}
                                        sx={{
                                            width: 200,
                                            height: 200,
                                            border: '3px solid rgba(59, 89, 152, 0.5)',
                                            boxShadow: '0 10px 30px rgba(59, 89, 152, 0.3)',
                                            background: 'linear-gradient(45deg, #3b5998, #5c80bc)',
                                            transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.08) rotate(2deg)',
                                                boxShadow: '0 15px 40px rgba(59, 89, 152, 0.5)'
                                            }
                                        }}
                                    />
                                    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mb: 1.5,
                                                color: '#1e3a8a',
                                                textShadow: '0 3px 6px rgba(0,0,0,0.15)',
                                                fontFamily: '"Playfair Display", serif'
                                            }}
                                        >
                                            {data?.name || 'N/A'}
                                        </Typography>
                                        <Chip
                                            label="Alumni"
                                            sx={{
                                                background: 'linear-gradient(45deg, #3b5998, #5c80bc)',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                px: 4,
                                                py: 1,
                                                borderRadius: 16,
                                                fontSize: '1.1rem',
                                                letterSpacing: '0.05em',
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                    background: 'linear-gradient(45deg, #2a4373, #4a6ea3)',
                                                    boxShadow: '0 4px 12px rgba(59, 89, 152, 0.4)'
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Basic Info */}
                            <Grid item xs={12}>
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                        background: 'linear-gradient(45deg, #f5f8ff, #e6ecf5)'
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            sx={{ mb: 3, color: Colors?.PrimaryDark || '#1e3a8a' }}
                                        >
                                            Basic Information
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <InfoItem icon={EmailIcon} text={data?.email || 'N/A'} color="#3b5998" />
                                                <InfoItem icon={PhoneIcon} text={data?.contactNumber || 'N/A'} color="#3b5998" />
                                                <InfoItem
                                                    icon={CalendarIcon}
                                                    text={data?.dob ? new Date(data.dob).toDateString() : 'N/A'}
                                                    color="#3b5998"
                                                />
                                                <InfoItem icon={HomeIcon} text={data?.address || 'N/A'} color="#3b5998" />
                                            </Grid>
                                        </Grid>

                                        {/* Social Links */}
                                        <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                            {data?.linkedInUrl && (
                                                <Link
                                                    href={data.linkedInUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                        textDecoration: 'none',
                                                        background: 'linear-gradient(45deg, #3b5998, #5c80bc)',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: 2,
                                                        transition: 'all 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                            background: 'linear-gradient(45deg, #2a4373, #4a6ea3)'
                                                        }
                                                    }}
                                                >
                                                    <LinkedInIcon />
                                                    LinkedIn Profile
                                                </Link>
                                            )}
                                            {data?.gitHubUrl && (
                                                <Link
                                                    href={data.gitHubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                        textDecoration: 'none',
                                                        background: 'linear-gradient(45deg, #1f2a44, #374151)',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: 2,
                                                        transition: 'all 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                            background: 'linear-gradient(45deg, #1f2a44, #4b5563)'
                                                        }
                                                    }}
                                                >
                                                    <GitHubIcon />
                                                    GitHub Profile
                                                </Link>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 4, background: 'linear-gradient(90deg, #3b5998, #5c80bc)' }} />
                        {data?.personalizedDescription && (
                            <>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mb: 2, color: Colors?.PrimaryDark || '#1e3a8a' }}
                                >
                                    About
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2, pl: 2, color: '#4b5563' }}>
                                    {data.personalizedDescription}
                                </Typography>
                                <Divider sx={{ my: 4, background: 'linear-gradient(90deg, #3b5998, #5c80bc)' }} />
                            </>
                        )}

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ mb: 2, color: Colors?.PrimaryDark || '#1e3a8a' }}
                        >
                            Academic Details
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                            <SchoolIcon sx={{ mr: 2, color: '#3b5998' }} />
                            <Typography variant="body1">
                                Dawood University - Roll Number: {data?.rollNumber || 'N/A'}, CGPA: {data?.cgpa || 'N/A'} ,Passed Year: {data?.graduationYear || 'N/A'}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                            <SchoolIcon sx={{ mr: 2, color: '#3b5998' }} />
                            <Typography variant="body1">
                                {data?.intermediateDetails?.collegeName || 'N/A'} - Passing year: {data?.intermediateDetails?.passingYear || 'N/A'} - Grade: {data?.intermediateDetails?.grade || 'N/A'}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ mb: 2, pl: 2 }}>
                            <SchoolIcon sx={{ mr: 2, color: '#3b5998' }} />
                            <Typography variant="body1">
                                {data?.matriculationDetails?.schoolName || 'N/A'} - Passing year: {data?.matriculationDetails?.passingYear || 'N/A'} - Grade: {data?.matriculationDetails?.grade || 'N/A'}
                            </Typography>
                        </Box>

                        {data?.workExperience?.length > 0 && (
                            <>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mt: 4, mb: 2, color: Colors?.PrimaryDark || '#1e3a8a' }}
                                >
                                    Work Experience
                                </Typography>
                                {data.workExperience.map((exp, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            mb: 2,
                                            p: 3,
                                            borderRadius: 3,
                                            background: 'linear-gradient(45deg, #f5f8ff, #e6ecf5)',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <WorkIcon sx={{ color: Colors?.PrimaryBlue || '#3b5998' }} />
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{ color: Colors?.PrimaryDark || '#1e3a8a' }}
                                                >
                                                    {exp.jobTitle} - {exp.companyName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {exp.startYear} - {exp?.endYear || 'Present'}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1, color: '#4b5563' }}>
                                                    {exp.responsibilities}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            {/* </Container > */}
        </Box >
    );
}

export default AlumniProfile;
