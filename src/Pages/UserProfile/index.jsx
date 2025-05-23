import { Box, Typography, Card, CardContent, Grid, Avatar, Chip, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { School as SchoolIcon, Business as BusinessIcon, Email as EmailIcon, Phone as PhoneIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material'; // MUI Icons
import React from 'react';
import Container from '../../Components/Container';
import AlumniProfile from '../Alumni/AlumniProfile';
import StudentProfile from '../Student/StudentProfile';
import FacultyProfile from '../Faculty/FacultyProfile';

function ProfilePage() {
    // Example user profile data
    const type="Faculty"
  

    return (
        <Box  sx={{ py: 2, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          {type == "Alumni" ? (
            <AlumniProfile/>
          ):
           type == "Student" ?(
            <StudentProfile/>
           ): 
           type == "Faculty"? (
              <FacultyProfile/>
           ): (
            null
           )
          }
        </Box>
    );
}

export default ProfilePage;
