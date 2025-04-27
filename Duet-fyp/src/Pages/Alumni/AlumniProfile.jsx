import { Box, Typography, Grid, Avatar, Chip, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { School as SchoolIcon, Business as BusinessIcon, Email as EmailIcon, Phone as PhoneIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material'; // MUI Icons
import React from 'react';
import Container from '../../Components/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
function AlumniProfile() {
    // Example user profile data
    const user = {
        imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
        name: "Ali Khan",
        designation: "Frontend Developer",
        type: "Alumni", // This could be 'Student', 'Faculty', or 'Alumni'
        academic: {
            school: { name: "XYZ High School", year: "2010", grade: "A+" }, // Matric
            inter: { name: "ABC College", year: "2012", grade: "B" }, // Inter
            university: { name: "Tech University", year: "2016", grade: "A" }, // University
        },
        workExperience: [
            {
                jobTitle: "Frontend Developer",
                startDate: "2017-01-01",
                endDate: "", // Empty means current
                companyName: "TechCorp",
                description: "Developed user-facing features using React and JavaScript.",
            },
            {
                jobTitle: "Software Engineer",
                startDate: "2016-06-01",
                endDate: "2017-12-31",
                companyName: "SoftTech",
                description: "Built web applications using HTML, CSS, and JavaScript.",
            }
        ], // Work experience array
        email: "ali.khan@example.com",
        phone: "+92 300 1234567",
        skills: ["React", "JavaScript", "HTML", "CSS"],
        linkedin: "https://www.linkedin.com/in/alikhan",
        GitHubIcon: "https://www.linkedin.com/in/alikhan",
    };

    return (
        <Box>
            <Container>
                <Box sx={{ padding: 3 }}>
                    {/* Profile Section */}
                    <Box sx={{ display: 'flex', gap: "2px" }}>
                        <Avatar
                            alt={user.name}
                            src={user.imageUrl}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: "30px" }}>
                            <Typography variant="h6" className='font_poppins'>{user.name}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">{user.designation}</Typography>
                            <Box sx={{ mt: 1 }}>
                                <Chip label={user.type} color="primary" sx={{ mr: 1, mb: 1 }} />
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column',marginBottom:'20px' }}>
                        {user?.linkedin && (
                            <IconButton
                                href={user.linkedin}
                                target="_blank"
                                sx={{
                                    mt: 2,
                                    color: "#0A66C2",
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Disable hover background color change
                                        color: "#0A66C2", // Keep the color unchanged
                                    }
                                }}
                            >
                                <LinkedInIcon fontSize="large" />
                                <Typography
                                    sx={{
                                        color: "gray",
                                        marginLeft: "10px",
                                        wordBreak: "break-word",  // Allow the text to break and wrap
                                        whiteSpace: "normal",     // Ensure the text wraps
                                        textAlign: "left",        // Align text to the left
                                        width: '100%',            // Ensure the width takes full available space
                                    }}
                                >
                                    {user?.linkedin}
                                </Typography>
                            </IconButton>
                        )}

                        {user?.GitHubIcon && (
                            <IconButton
                                href={user.GitHubIcon}
                                target="_blank"
                                sx={{
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Disable hover background color change
                                        color: "#0A66C2", // Keep the color unchanged
                                    }
                                }}
                            >
                                <GitHubIcon fontSize="large" />
                                <Typography
                                    sx={{
                                        color: "gray",
                                        marginLeft: "10px",
                                        wordBreak: "break-word",  // Allow the text to break and wrap
                                        whiteSpace: "normal",     // Ensure the text wraps
                                        textAlign: "left",        // Align text to the left
                                        width: '100%',            // Ensure the width takes full available space
                                    }}
                                >
                                    {user?.GitHubIcon}
                                </Typography>
                            </IconButton>
                        )}
                    </Box>



                    {/* About Section */}
                    <Typography variant="h6" className='font_poppins' gutterBottom sx={{ fontWeight: 'bold' }}>About</Typography>
                    <Typography variant="body1">
                        {user.type === 'Alumni' || user.type === 'Faculty' ? (
                            <Box display="flex" alignItems="center" sx={{ mb: 2,paddingLeft:"16px" }}>
                                <BusinessIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                                <Typography variant="body1">{user.workExperience.length} years of experience</Typography>
                            </Box>
                        ) : (
                            <Box display="flex" alignItems="center" sx={{ mb: 2,paddingLeft:"16px" }}>
                                <SchoolIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                                <Typography variant="body1">Student</Typography>
                            </Box>
                        )}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Academic Details */}
                    <Typography variant="h6" className='font_poppins' gutterBottom sx={{ fontWeight: 'bold' }}>
                        Academic Details
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ mb: 2,paddingLeft:"16px" }}>
                        <SchoolIcon sx={{ marginRight: 2, color: '#1976d2', fontSize: 30 }} />
                        <Typography variant="body1" sx={{ fontSize: '1rem', color: 'text.primary' }}>
                            {user.academic.school.name} (Matric) - {user.academic.school.year}, Grade: {user.academic.school.grade}
                        </Typography>
                    </Box>


                    <Box display="flex" alignItems="center" sx={{ mb: 2,paddingLeft:"16px" }}>
                        <SchoolIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                        <Typography variant="body1">
                            {user.academic.inter.name} (Inter) - {user.academic.inter.year}, Grade: {user.academic.inter.grade}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" sx={{ mb: 2,paddingLeft:"16px" }}>
                        <SchoolIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                        <Typography variant="body1">
                            {user.academic.university.name} (University) - {user.academic.university.year}, Grade: {user.academic.university.grade}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Work Experience Section */}
                    <Typography variant="h6" className='font_poppins' gutterBottom sx={{ fontWeight: 'bold' }}>Work Experience</Typography>
                    {user.workExperience.map((job, index) => (
                        <Box key={index} sx={{ mb: 3, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
                            {/* Job Title and Company Name */}
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <BusinessIcon sx={{ marginRight: 2, color: '#1976d2', fontSize: 30 }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {job.jobTitle} at {job.companyName}
                                </Typography>
                            </Box>

                            {/* Dates */}
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {job.startDate} - {job.endDate || 'Present'}
                            </Typography>

                            {/* Job Description */}
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {job.description}
                            </Typography>
                        </Box>
                    ))}


                    <Divider sx={{ my: 2 }} />

                    {/* Contact Information */}
                    <Typography variant="h6" className='font_poppins' gutterBottom sx={{ fontWeight: 'bold' }} >Contact Information</Typography>
                    <List>
                        <ListItem>
                            <EmailIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                            <ListItemText primary={user.email} />
                        </ListItem>
                        <ListItem>
                            <PhoneIcon sx={{ marginRight: 2, color: '#1976d2' }} />
                            <ListItemText primary={user.phone} />
                        </ListItem>
                    </List>

                    {/* <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>Skills</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {user.skills.map((skill, index) => (
                            <Chip key={index} label={skill} sx={{ margin: 1, backgroundColor: '#1976d2', color: 'white' }} />
                        ))}
                    </Box> */}
                </Box>
            </Container>
        </Box>
    );
}

export default AlumniProfile;
