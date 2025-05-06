import { Box, Typography, List, ListItem, ListItemText, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import Container from '../../Components/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Colors from '../../assets/Style';

// Dummy terms data – replace with API later
const termsData = [
  {
    title: "Use of the Platform",
    description: "You agree to use DUET Hub only for lawful purposes, without violating any applicable laws or regulations."
  },
  {
    title: "User Accounts",
    description: "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account."
  },
  {
    title: "Content Ownership",
    description: "All content on DUET Hub remains the property of its respective creators and may not be reused without permission."
  },
  {
    title: "Modifications to Terms",
    description: "We reserve the right to change these terms at any time. Continued use implies your acceptance of those changes."
  },
  {
    title: "Contact Us",
    description: "If you have any questions regarding these terms, please reach out to us at support@duethub.com."
  }
];

function Termlisting() {
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            mb: 6
          }}
          className="font_poppins headingcolorgradient"
        >
          Terms & Conditions
        </Typography>

        <Stack spacing={3} sx={{ maxWidth: "900px", margin: "0 auto" }}>
          {termsData.map((term, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                backgroundColor: '#ffffff',
                padding: 3,
                borderRadius: 2,
                boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)'
                }
              }}
            >
              <CheckCircleIcon sx={{ color: Colors?.PrimaryBlue, mt: '5px' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {term.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {term.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Termlisting;
