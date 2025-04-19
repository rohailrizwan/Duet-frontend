import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import aboutimage from '../../assets/images/alumni3.jpg';

function Homesection2() {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.1 }}
            sx={{
                backgroundColor: '#f9f9f9',
                padding: "100px 0px"
            }}
        >
            <Container>
                <Grid container spacing={4} alignItems="center">
                    {/* Left side - Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            sx={{
                                borderRadius: "16px",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                overflow: "hidden",
                                border: "2px solid #e0e0e0",
                                maxHeight: 400,
                                width: '100%',
                                backgroundColor: "#fff",
                                p: 1
                            }}
                        >
                            <Box
                                component="img"
                                src={aboutimage}
                                alt="DUET Hub Alumni"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Right side - Text */}
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: '600' }}
                            className='font_poppins headingcolorgradient'
                        >
                            Empowering DUET Alumni
                        </Typography>
                        <Typography variant="body1" color="text.secondary" style={{ lineHeight: "30px" }}>
                            DUET Hub is more than just a platform—it's a growing community of proud alumni from Dawood University. Whether you're an experienced professional or a recent graduate, this is your space to reconnect, mentor, and thrive. Share your journey, offer guidance to current students, or discover new opportunities through alumni networks. With tools for communication, career development, and showcasing achievements, DUET Hub keeps alumni actively involved in shaping the future of DUET.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Homesection2;
