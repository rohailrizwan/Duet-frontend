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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Colors from "../../assets/Style";
import cardlogo from '../../assets/images/duet2logo.png'
import { styled } from "@mui/system";
import AvatarComponent from "../../Components/Avatar";
export default function Navbar({user}) {
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
            text: "Events",
            path: "/events",
        },
        {
            text: "Terms",
            path: "/terms",
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
            backgroundColor: scrolled ? "white" : Colors?.PrimaryBlue,
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
                    backgroundColor: scrolled ? "#0D47A1" : "transparent",
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
                                                    : "white"
                                                : "lightgray",
                                    }}

                                >
                                    {item?.text}
                                </UnderlineText>
                            </Button>
                        ))}
                    </Box>

                   {
                    user?(
                        <AvatarComponent scrolled={scrolled}/>
                    ):(
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "8px",
                            color: scrolled ? "#1976d2" : "#ffffff",
                            textTransform: "capitalize",
                            fontFamily: "Open Sans",
                            fontSize:  "16px",
                            fontWeight: 500,
                            p: "8px 25px",
                            border: `2px solid ${scrolled ? "#1976d2" : "#0d47a1"}`,
                            background: scrolled ? "#ffffff" : "linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)",
                            transition: "all 0.4s ease-in-out",
                            position: "relative",
                            overflow: "hidden",  
                        }}
                        
                        onClick={()=>navigate("/login")}
                    >
                        {"Get Started"} <ArrowForwardIcon/>
                    </Button>
                    )
                   }
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
