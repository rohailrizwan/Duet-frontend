import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PrimaryButton from "../../Components/BtnComponent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Colors from "../../assets/Style";
import cardlogo from '../../assets/images/duetlogo.webp'
import { styled } from "@mui/system";
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate()
    const navItems = [
        {
            text: "Home",
            path: "/",
        },
        {
            text: "About",
            path: "/about",
        },
        {
            text: "Contact",
            path: "/contact",
        },
        {
            text: "Faq",
            path: "/faq",
        },
        {
            text: "View job",
            path: "/viewjob",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const UnderlineText = styled("span")({
        position: "relative",
        display: "inline",
        padding: "0",
        cursor: "pointer", // Optional: Shows pointer on hover
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: "0",
            width: "0%", // Initially no width
            height: "2px",
            backgroundColor:scrolled?"white":Colors?.PrimaryBlue,
            transition: "width 0.3s ease-in-out",
        },
        "&:hover::after": {
            width: "100%", // Full width on hover
        },
    });
    return (
        <>
            <AppBar
                position="fixed" // Above banner
                sx={{
                    backgroundColor: scrolled ? "#1976d2" : "transparent",
                    transition: "background-color 0.3s",
                    boxShadow: "none",
                    padding: "10px 20px",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    {/* Mobile Menu Icon (Left Side) */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Logo */}
                    <Box
                        component="img"
                        src={cardlogo}
                        alt="Logo"
                        sx={{
                            height: "70px",
                            width: "70px",
                            borderRadius: "50%",
                            display: { xs: "none", md: "block" }
                        }}
                    />

                    {/* Menu Items for Desktop */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, color: "#1976d2", gap: 2 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                sx={{
                                    color: "black",
                                    textAlign: "start",
                                    padding: "10px 0px",
                                    paddingRight: "20px",
                                    transition: "color 0.3s ease-in-out",
                                    "&:hover": {
                                        color: Colors?.PrimaryBlue, // Highlight on hover
                                    },
                                }}
                                onClick={() => navigate(item?.path)}
                            >
                                <UnderlineText
                                    sx={{
                                        color:
                                            location.pathname === item?.path
                                                ? scrolled
                                                    ? "white"
                                                    : Colors?.PrimaryBlue
                                                : "white",
                                    }}

                                >
                                    {item?.text}
                                </UnderlineText>
                            </Button>
                        ))}
                    </Box>

                    {/* Login Button (Right Side) */}
                    <PrimaryButton
                        title="Get Started"
                        height="50px"
                        padding="5px 15px"
                        // width="100px"
                        handleFunction={() => navigate("/signup")}
                        endIcon={<ArrowForwardIcon />}
                    />
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer (Slide in from Left to Right) */}
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250, padding: "20px" }}>
                    {/* Logo inside Drawer */}
                    <Box
                        component="img"
                        src={cardlogo}
                        alt="Logo"
                        sx={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            display: "block",
                            margin: "0 auto 20px"
                        }}
                    />

                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item}
                                disablePadding
                                onClick={() => navigate(item?.path)}
                                sx={{
                                    color: "black",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        padding: "10px", // Adds consistent spacing for buttons
                                    }}
                                >
                                    <UnderlineText
                                        sx={{
                                            color:
                                                location.pathname === item?.path
                                                    ? Colors?.PrimaryBlue
                                                    : "black",
                                        }}
                                    >
                                        {item?.text}
                                    </UnderlineText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

        </>

    );
}
