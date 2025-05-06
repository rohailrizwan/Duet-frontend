import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';

const departments = ['All', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];

const facultyData = [
  {
    name: "Dr. Ayesha Khan",
    department: "Computer Science",
    title: "Associate Professor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Prof. Imran Ahmed",
    department: "Electrical Engineering",
    title: "Head of Department",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Fatima Noor",
    department: "Computer Science",
    title: "Assistant Professor",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Prof. Bilal Siddiqui",
    department: "Mechanical Engineering",
    title: "Lecturer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const FacultyList = () => {
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredFaculty = selectedDept === 'All'
    ? facultyData
    : facultyData.filter(f => f.department === selectedDept);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      sx={{ padding: "100px 0", backgroundColor: '#f5f5f5' }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}
          className="headingcolorgradient font_poppins"
        >
          Our Esteemed Faculty
        </Typography>

        <FormControl fullWidth sx={{ maxWidth: 300, mb: 5 }}>
          <InputLabel>Filter by Department</InputLabel>
          <Select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            label="Filter by Department"
          >
            {departments.map((dept, idx) => (
              <MenuItem key={idx} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={4}>
          {filteredFaculty.map((faculty, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ borderRadius: 3, boxShadow: 3 }}
              >
                <CardMedia
                  component="img"
                  height="260"
                  image={faculty.image}
                  alt={faculty.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {faculty.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faculty.title}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    {faculty.department}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FacultyList;
