import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import aboutimage from '../../assets/images/Aboutimage.jpg'
function Homesection1() {
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
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: '600' }}
                            className='font_poppins headingcolorgradient'
                        >
                            Connecting Our Community
                        </Typography>
                        <Typography variant="body1" color="text.secondary" style={{ lineHeight: "30px" }}>
                            DUET Hub is a unique platform designed to connect the students, alumni, and faculty of Dawood University. Our mission is to foster a sense of community, offering resources for career development, mentorship, and professional growth. Through AI-driven resume screening, job matching, and real-time communication, DUET Hub creates an environment that encourages networking and collaboration. It’s a space where students can find job opportunities, alumni can share knowledge and experiences, and faculty can stay connected with the evolving achievements of their peers and students. Whether you are looking for guidance, sharing your accomplishments, or building your professional network, DUET Hub serves as a comprehensive platform for all.
                        </Typography>
                    </Grid>

                    {/* Right side - Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 100 }}
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
                                p: 0
                            }}
                        >
                            <Box
                                component="img"
                                src={aboutimage}
                                alt="DUET Hub Illustration"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }}
                            />
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Homesection1;
