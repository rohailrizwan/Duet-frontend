import React from 'react';
import { Language, LocationOn, Phone } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import Container from '../../Components/Container';
import { Link, useNavigate } from 'react-router-dom';
import Colors from '../../assets/Style';
import { styled } from "@mui/system";
function Footer() {
    const navigate=useNavigate()
    const LinkItems = [
        { href: '/about', label: 'About Us' },
        { href: '/viewfaculty', label: 'Faculty' },
        { href: '/events', label: 'Events' },
        { href: '/terms', label: 'Terms & Condition' }
    ];
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
                <Box sx={{ py: { xs: 6, sm: 8, md: 10  } ,px:0 ,justifyContent:'center' }} >
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
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ display: 'flex', justifyContent: { xs: "start", md: "center" }, textAlign: 'center' }}
                        >
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', textAlign: 'left' }}>
                                    Quick Links
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
                                    {LinkItems.map((item, index) => (
                                        <Button
                                            key={index}
                                            sx={{
                                                color: "white",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                width: "100%", // Keeps the width based on the text
                                                padding: "8px 0px 0px 0px", // Ensures no padding issues
                                                paddingRight: "10px",
                                                marginBottom: "5px",
                                                "&:hover": {
                                                    backgroundColor: "transparent !important", // Prevents background change
                                                    color: "white !important", // Prevents text color change
                                                    boxShadow: "none !important", // Prevents shadow effects
                                                    transform: "none !important", // Prevents scaling
                                                },
                                            }}
                                            onClick={() => navigate(item?.href)}
                                        >
                                            <span>
                                                <UnderlineText>{item?.label}</UnderlineText>
                                            </span>
                                        </Button>
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
        </div >
    );
}

export default Footer;
