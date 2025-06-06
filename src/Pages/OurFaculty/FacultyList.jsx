import React, { useState, useEffect } from 'react';
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
  Pagination,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import Facultyservice from '../../apis/Faculty';
import sampleuser from '../../assets/images/sampleuser.png'
const FacultyList = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [departments, setDepartments] = useState(['All']);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    // Filter data based on selected department
    if (selectedDept === 'All') {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } else {
      const filtered = data.filter(faculty =>
        faculty.academicDetails?.department.some(dept => dept.name === selectedDept)
      );
      setFilteredData(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPage(1); // Reset to page 1 when department changes
    }
  }, [selectedDept, data]);

  const fetchData = async () => {
    try {
      const response = await Facultyservice.getallfaculty(1, 100); // Fetch all data to filter locally
      console.log('Fetched faculty data:', response?.data);
      setData(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await Facultyservice.getDepartment();
      console.log('Fetched departments:', response?.data);
      setDepartments(['All', ...(response?.data?.map(dept => dept.name) || [])]);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate paginated data
  const paginatedData = filteredData?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      sx={{
        padding: { xs: '60px 0', md: '100px 0' },
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 5,
            color: '#1a237e',
            fontFamily: '"Roboto", sans-serif',
          }}
          className="headingcolorgradient font_poppins"
        >
          Our Esteemed Faculty
        </Typography>

        <FormControl
          fullWidth
          sx={{
            maxWidth: { xs: 250, sm: 300 },
            mb: 5,
            mx: 'auto',
            '& .MuiInputLabel-root': { color: '#1a237e' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#3f51b5' },
              '&:hover fieldset': { borderColor: '#1a237e' },
            },
          }}
        >
          <InputLabel sx={{ fontWeight: 500 }}>Filter by Department</InputLabel>
          <Select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
            }}
            label="Filter by Department"
          >
            {departments?.map((dept, idx) => (
              <MenuItem key={idx} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {paginatedData.length > 0 ? (
            paginatedData.map((faculty, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '420px', // Fixed height for consistency
                    backgroundColor: '#fff',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={faculty?.profilePicture || sampleuser}
                    alt={faculty.name || 'Faculty'}
                    sx={{
                      height: '230px', // Adjusted height for better proportion
                      objectFit: 'contain',
                      borderBottom: '2px solid #3f51b5',
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        noWrap
                        sx={{ color: '#1a237e', mb: 1 }}
                      >
                        {faculty.name || 'Unknown Faculty'}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontStyle: 'italic' }}
                      >
                        {faculty?.academicDetails?.designation || 'No Designation'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {faculty?.academicDetails?.qualification || 'No Qualification'}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {faculty?.academicDetails?.department?.length > 0 ? (
                        faculty.academicDetails.department.map((dept, idx) => (
                          <Chip
                            key={idx}
                            label={dept?.name || 'Unknown'}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{
                              borderColor: '#3f51b5',
                              color: '#3f51b5',
                              fontWeight: 500,
                            }}
                          />
                        ))
                      ) : (
                        <Chip
                          label="No Department"
                          size="small"
                          color="default"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', color: '#757575', mt: 4 }}
              >
                No faculty found for the selected department.
              </Typography>
            </Grid>
          )}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: '#3f51b5', color: '#fff' },
                },
                '& .Mui-selected': {
                  backgroundColor: '#1a237e !important',
                  color: '#fff',
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FacultyList;