import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Grid,
    Paper
} from '@mui/material';
import {
    School as SchoolIcon,
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    MenuBook as ResearchIcon,
    Article as ArticleIcon,
} from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from '../../Components/Container';

const FacultyProfile = () => {
    const user = {
        imageUrl: "https://via.placeholder.com/150",
        name: "Dr. Ali Khan",
        designation: "Associate Professor - Computer Science",
        type: "Faculty",
        description: "Passionate educator and researcher in Artificial Intelligence and Web Technologies with 10+ years of academic experience.",
        email: "ali.khan@duet.edu.pk",
        phone: "+92 300 1234567",
        linkedin: "https://linkedin.com/in/alikhan",
        github: "https://github.com/alikhan",
        academic: {
            matric: { name: "XYZ High School", year: "2005", grade: "A+" },
            inter: { name: "ABC College", year: "2007", grade: "A" },
            bachelors: { name: "Tech University", year: "2011", grade: "A" },
            masters: { name: "Innovative Tech Institute", year: "2013", grade: "A+" },
            phd: { name: "University of Research", year: "2018", title: "AI-Powered Web Systems" }
        },
        workExperience: [
            {
                jobTitle: "Associate Professor",
                companyName: "Dawood University",
                startDate: "2019-01-01",
                endDate: "",
                description: "Teaching, mentoring, and leading research in Computer Science."
            },
            {
                jobTitle: "Lecturer",
                companyName: "ABC Institute",
                startDate: "2014-01-01",
                endDate: "2018-12-31",
                description: "Taught core courses including Web Development and Data Structures."
            }
        ],
        researchInterests: [
            "Artificial Intelligence",
            "Natural Language Processing",
            "Web Technologies",
            "Human-Computer Interaction"
        ],
        publications: [
            {
                title: "Smart NLP for Urdu Language",
                journal: "Journal of AI Research",
                year: 2021
            },
            {
                title: "Web 4.0 and Semantic Intelligence",
                journal: "International Web Journal",
                year: 2022
            }
        ],
        skills: ["React", "Node.js", "Machine Learning", "LaTeX"]
    };

    return (
        <Box>
            <Container>
                <Box sx={{ p: 3 }}>
                    {/* Top Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={user.imageUrl} sx={{ width: 100, height: 100 }} />
                        <Box>
                            <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">{user.designation}</Typography>
                            <Chip label={user.type} color="primary" sx={{ mt: 1 }} />
                        </Box>
                    </Box>

                    {/* Contact & Links */}
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <List>
                                    <ListItem>
                                        <EmailIcon sx={{ mr: 2, color: '#1976d2' }} />
                                        <ListItemText primary={user.email} />
                                    </ListItem>
                                    <ListItem>
                                        <PhoneIcon sx={{ mr: 2, color: '#1976d2' }} />
                                        <ListItemText primary={user.phone} />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
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

                        {user?.github && (
                            <IconButton
                                href={user.github}
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
                                    {user?.github}
                                </Typography>
                            </IconButton>
                        )}
                    </Box>
                    {/* About */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">About</Typography>
                    <Typography variant="body1" sx={{ pl: 2, mt: 1 }}>{user.description}</Typography>

                    {/* Academic Background */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">Academic Background</Typography>
                    {Object.entries(user.academic).map(([key, value]) => (
                        <Box key={key} sx={{ pl: 2, mt: 1, display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon sx={{ mr: 2, color: '#1976d2' }} />
                            <Typography>
                                {value.name} ({key.charAt(0).toUpperCase() + key.slice(1)}) - {value.year}
                                {value.grade && `, Grade: ${value.grade}`}
                                {value.title && `, Thesis: "${value.title}"`}
                            </Typography>
                        </Box>
                    ))}

                    {/* Work Experience */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">Work Experience</Typography>
                    {user.workExperience.map((exp, idx) => (
                        <Paper key={idx} sx={{ mt: 2, p: 2 }}>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <BusinessIcon sx={{ mr: 2, color: '#1976d2' }} />
                                <Typography fontWeight="bold">{exp.jobTitle} at {exp.companyName}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {exp.startDate} - {exp.endDate || 'Present'}
                            </Typography>
                            <Typography variant="body2">{exp.description}</Typography>
                        </Paper>
                    ))}

                    {/* Research Interests */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">Research Interests</Typography>
                    <Box sx={{ pl: 2, mt: 1 }}>
                        {user.researchInterests.map((interest, idx) => (
                            <Chip key={idx} label={interest} sx={{ mr: 1, mb: 1, backgroundColor: '#e3f2fd' }} icon={<ResearchIcon />} />
                        ))}
                    </Box>

                    {/* Publications */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">Publications</Typography>
                    <Box sx={{ pl: 2, mt: 1 }}>
                        {user.publications.map((pub, idx) => (
                            <Box key={idx} sx={{ mb: 1 }}>
                                <Typography variant="body1">
                                    <ArticleIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    <strong>{pub.title}</strong> - <em>{pub.journal}, {pub.year}</em>
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Skills */}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="bold">Skills</Typography>
                    <Box sx={{ mt: 1 }}>
                        {user.skills.map((skill, idx) => (
                            <Chip key={idx} label={skill} sx={{ mr: 1, mb: 1, backgroundColor: '#1976d2', color: '#fff' }} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FacultyProfile;
