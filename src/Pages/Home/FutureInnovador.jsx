import React from 'react';
import { Grid, Typography, Box, Button, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dummy top student data

const FutureInnovatorsSection = () => {
    const topStudents = [
        {
            name: 'Ahsan Ali',
            role: 'Full Stack Developer',
            avatar: '/avatars/ahsan.jpg',
            resume: '/resumes/ahsan_resume.pdf'
        },
        {
            name: 'Sara Khan',
            role: 'AI Engineer',
            avatar: '/avatars/sara.jpg',
            resume: '/resumes/sara_resume.pdf'
        },
        {
            name: 'Usman Sheikh',
            role: 'UI/UX Designer',
            avatar: '/avatars/usman.jpg',
            resume: '/resumes/usman_resume.pdf'
        },
        {
            name: 'Usman Sheikh',
            role: 'UI/UX Designer',
            avatar: '/avatars/usman.jpg',
            resume: '/resumes/usman_resume.pdf'
        },
        {
            name: 'Usman Sheikh',
            role: 'UI/UX Designer',
            avatar: '/avatars/usman.jpg',
            resume: '/resumes/usman_resume.pdf'
        }
    ];
    const sliderSettings = {
        dots: false,
        infinite: topStudents?.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: topStudents?.length > 3,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            }
        ]
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            sx={{
                background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
                 padding: "100px 0px",
            }}
        >
            <Container>
                <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 2
                    }}
                    className="font_poppins headingcolorgradient"
                >
                    🌟 Future Innovators of DUET
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 6 }}
                >
                    Meet our brightest talents, ready to take on the future. Download their resumes and explore their achievements.
                </Typography>

                <Slider {...sliderSettings}>
                    {topStudents.map((student, index) => (
                        <Box key={index} px={2}>
                            <Card
                                component={motion.div}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,0,0,0.15)' }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                sx={{
                                    p: 3,
                                    borderRadius: 6,
                                    textAlign: 'center',
                                    backdropFilter: 'blur(10px)',
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                }}
                            >
                                <Avatar
                                    alt={student.name}
                                    src={student.avatar}
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        mx: 'auto',
                                        mb: 2,
                                        border: '3px solid #1976d2',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {student.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {student.role}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        component="a"
                                        href={student.resume}
                                        download
                                        sx={{
                                            mt: 2,
                                            borderRadius: 8,
                                            background: 'linear-gradient(to right, #1976d2, #2196f3)',
                                            color: '#fff',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            '&:hover': {
                                                background: 'linear-gradient(to right, #1565c0, #1e88e5)'
                                            }
                                        }}
                                    >
                                        Download Resume
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Slider>

            </Container>
        </Box>
    );
};

export default FutureInnovatorsSection;
