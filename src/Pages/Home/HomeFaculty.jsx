import React from 'react';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Divider,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import { NewButton } from '../../Components/BtnComponent';
import { useNavigate } from 'react-router-dom';
import sampleuser from '../../assets/images/sampleuser.png'
const FacultySection = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: data?.length > 3,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200, // For larger screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 960, // For medium screens (e.g., tablets)
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600, // For smaller screens (e.g., small tablets)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 480, // For very small screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};
  const handleFunction = () => {
    navigate('/viewfaculty');
  };

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Box key={index} sx={{ display: 'flex !important', justifyContent: 'center', padding: "10px 0px" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, maxWidth: 300, marginRight: "5px", width: '100%' }}>
          <Skeleton variant="rectangular" height={220} />
          <CardContent>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </CardContent>
        </Card>
      </Box>
    ));
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.1 }}
      sx={{
        background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
        padding: "100px 0px"
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
            fontSize:{xs:"26px",sm:"48px"},
            textAlign: 'center',
            color: '#0A192F',
            letterSpacing: 1,
            textTransform: 'uppercase',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 4,
              backgroundColor: '#1976d2',
              borderRadius: 2
            }
          }}
          className='font_poppins headingcolorgradient'
        >
          Meet Our Faculty
        </Typography>

        {loading ? (
          <Box>
            <Slider {...sliderSettings}>{renderSkeletons()}</Slider>
          </Box>
        ) : data?.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 5 }}>
            No Faculty Data Found.
          </Typography>
        ) : (
          <Slider {...sliderSettings}>
            {data.map((faculty, index) => (
              <Box key={index} sx={{ display: 'flex !important', justifyContent: 'center', padding: "10px 0px" }}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', // Ensure card takes full width of slide
                    maxWidth: 300, // Limit maximum width
                    height: '420px',
                    backgroundColor: '#fff',
                    transition: 'all 0.3s ease-in-out',
                    margin: '0 auto', // Center the card
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
              </Box>
            ))}
          </Slider>
        )}

        <Box sx={{ margin: '40px 0px 0px 0px', display: "flex", justifyContent: "center" }}>
          <NewButton title="View More" handleFunction={handleFunction} />
        </Box>
      </Container>
    </Box>
  );
};

export default FacultySection;
