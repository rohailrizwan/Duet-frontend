import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import Container from '../../Components/Container';
import { motion } from 'framer-motion';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NewButton } from '../../Components/BtnComponent';
function ConnectWithUs() {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            sx={{
                background: '#f9f9f9',
                padding: "100px 0px",
            }}
        >
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: '600' }}
                            className='font_poppins headingcolorgradient'>
                            Connect With Us
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className='font_poppins' style={{ lineHeight: "30px" }}>
                        Become a part of the ever-growing DUET Hub family. Stay informed, build lasting connections, and grow with the support of students, alumni, and faculty.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                      <NewButton title='Join the Community' endicon={<ArrowForwardIcon/>}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ConnectWithUs;
