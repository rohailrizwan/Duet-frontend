import React from 'react';
import { Language, LocationOn, Phone } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import Container from '../../Components/Container';
import { Link } from 'react-router-dom';
import Colors from '../../assets/Style';
import { styled } from "@mui/system";
function Footer() {
    const UnderlineText = styled("span")({
        position: "relative",
        display: "inline",
        color: "rgba(0, 0, 0, 0.6)",
        padding: "0",
        cursor: "pointer", // Optional: Shows pointer on hover
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: "0",
            width: "0%", // Initially no width
            height: "2px",
            backgroundColor: Colors?.PrimaryBlue,
            transition: "width 0.3s ease-in-out",
        },
        "&:hover::after": {
            width: "100%", // Full width on hover
        },
    });
    return (
        <div className="bg-[white] relative ">
            <Container>
                <Box sx={{ py: { xs: 6, sm: 8, md: 10 } }}>
                    <Grid container spacing={4}>
                        {/* Company Info */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                variant="h4"
                                component="h2"
                                gutterBottom
                                sx={{ fontWeight: 600 }}
                                className="font_poppins headingcolorgradient"
                            >
                                DUET Hub
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                className="font_poppins"
                                style={{ lineHeight: '30px' }}
                            >
                                DUET Hub aims to connect students, alumni, and faculty,
                                enabling networking, mentorship, and career opportunities.
                                We are building a collaborative ecosystem for everyone in
                                the DUET community.
                            </Typography>
                        </Grid>

                        {/* Quick Links */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: {xs:"start",md:"center"}, justifyContent: 'center' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', marginBottom: "15px", textAlign: 'center' }}>
                                    Quick Links
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                                    {[
                                        { href: '/about', label: 'About Us' },
                                        { href: '/alumni', label: 'Alumni' },
                                        { href: '/events', label: 'Events' },
                                        { href: '/contact', label: 'Contact' }
                                    ].map((link, index) => (
                                        <Link key={index} href={link.href} sx={{ textAlign: 'center' }}>
                                            <UnderlineText>
                                                {link.label}
                                            </UnderlineText>
                                        </Link>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>


                        {/* Contact Info */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                                Contact Us
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Phone sx={{ marginRight: 1, padding: "5px", color: "white", backgroundColor: Colors?.PrimaryBlue, borderRadius: "50%" }} />
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>+123 456 7890</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Language sx={{ marginRight: 1, padding: "5px", color: "white", backgroundColor: Colors?.PrimaryBlue, borderRadius: "50%" }} />
                                    <Link href="https://www.duethub.com" target="_blank" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>www.duethub.com</span>
                                    </Link>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ marginRight: 1, padding: "5px", color: "white", backgroundColor: Colors?.PrimaryBlue, borderRadius: "50%" }} />
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>123 DUET Street, Karachi, Pakistan</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Bottom Bar */}
            <Box
                sx={{
                    py: 2,
                    backgroundColor: 'white',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderTop: '1px solid #2c2c2c',
                }}
            >
                <p className="font_poppins headingcolorgradient text-lg">
                    &copy; {new Date().getFullYear()} DUET Hub. All rights reserved.
                </p>
            </Box>
        </div>
    );
}

export default Footer;
