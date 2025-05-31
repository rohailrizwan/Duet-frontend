import { Box, Typography, Card, CardContent, Grid, Avatar, Chip, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { School as SchoolIcon, Business as BusinessIcon, Email as EmailIcon, Phone as PhoneIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material'; // MUI Icons
import React from 'react';
import Container from '../../Components/Container';
import AlumniProfile from '../Alumni/AlumniProfile';
import StudentProfile from '../Student/StudentProfile';
import FacultyProfile from '../Faculty/FacultyProfile';
import { useSelector } from 'react-redux';

function ProfilePage() {
  
     const user=useSelector((state)=>state?.auth?.user)

    return (
        <Box  sx={{ py: 2, minHeight: '100vh' }}>
          {user?.role == "alumni"  ? (
            <AlumniProfile userid={user?._id}/>
          ):
            user?.role == "user"?(
            <StudentProfile userid={user?._id}/>
           ): 
           user?.role == "faculty"? (
              <FacultyProfile userid={user?._id}/>
           ): (
            null
           )
          }
        </Box>
    );
}

export default ProfilePage;
