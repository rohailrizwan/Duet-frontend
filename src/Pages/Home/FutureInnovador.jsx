import React from 'react';
import {
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    Avatar,
    Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FutureInnovatorsSection = ({ data = [], loading = false }) => {
    const sliderSettings = {
        dots: false,
        infinite: data?.length > 3,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: data?.length > 3,
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

    const renderSkeletons = () => (
        Array.from({ length: 3 }).map((_, index) => (
            <Box key={index} px={2}>
                <Card sx={{ p: 3, borderRadius: 6, textAlign: 'center' }}>
                    <Skeleton variant="circular" width={90} height={90} sx={{ mx: 'auto', mb: 2 }} />
                    <CardContent>
                        <Skeleton width="60%" height={25} sx={{ mx: 'auto', mb: 1 }} />
                        <Skeleton width="40%" height={20} sx={{ mx: 'auto', mb: 2 }} />
                        <Skeleton variant="rectangular" width={120} height={36} sx={{ mx: 'auto' }} />
                    </CardContent>
                </Card>
            </Box>
        ))
    );

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
                    sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
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

                {loading ? (
                    <Grid container spacing={2} justifyContent="center">
                        {renderSkeletons()}
                    </Grid>
                ) : data && data.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {data.map((student, index) => (
                            <Box key={index} px={2}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(0,0,0,0.15)' }}
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
                                        src={student?.profilePicture}
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
                                           Program Year {student.programYear}
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
                ) : (
                    <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mt: 6 }}>
                        No data found.
                    </Typography>
                )}
            </Container>
        </Box>
    );
};

export default FutureInnovatorsSection;
