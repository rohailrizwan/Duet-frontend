import React from 'react';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import { NewButton } from '../../Components/BtnComponent';
import { useNavigate } from 'react-router-dom';

const FacultySection = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: data?.length > 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
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
      {/* <Container> */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
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
                <Card sx={{ borderRadius: 3, boxShadow: 3, maxWidth: 300, marginRight: "5px", width: '100%' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={faculty.image}
                    alt={faculty.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" className='font_poppins' sx={{ fontWeight: 600 }}>
                      {faculty.name}
                    </Typography>
                    <Typography color="text.secondary" className='font_poppins'>{faculty.department}</Typography>
                    <Typography variant="body2" color="primary">
                      {faculty.designation}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        )}

        <Box sx={{ margin: '40px 0px 0px 0px', display: "flex", justifyContent: "center" }}>
          <NewButton title="View More" handleFunction={handleFunction} />
        </Box>
      {/* </Container> */}
    </Box>
  );
};

export default FacultySection;
