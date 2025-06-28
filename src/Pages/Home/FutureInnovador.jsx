import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Skeleton,
  Tooltip,
  Stack,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Download, Email, GitHub, School, LinkedIn } from '@mui/icons-material';
import { Divider } from 'antd';

const FutureInnovatorsSection = ({ data = [], loading = false }) => {
  const sliderSettings = {
    dots: false,
    infinite: data?.length > 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: data?.length > 3,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      }
    ]
  };
  const compact = true

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <Box key={index} px={2}>
        <Card sx={{ p: 3, borderRadius: 6, textAlign: 'center' }}>
          <Skeleton variant="circular" width={90} height={90} sx={{ mx: 'auto', mb: 2 }} />
          <CardContent>
            <Skeleton width="60%" height={25} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton width="40%" height={20} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="rectangular" width={120} height={36} sx={{ mx: 'auto' }} />
          </CardContent>
        </Card>
      </Box>
    ))
  );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      sx={{
        background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
        padding: "100px 0px",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, fontSize: { xs: "26px", sm: "48px" } }}
          className="font_poppins headingcolorgradient"
        >
          🌟 Future Innovators of DUET
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            marginBottom: { xs: 3, sm: 6 }, // Correct syntax for responsive margin
            fontSize: { xs: '14px', sm: '20px' }, // Correct syntax for responsive font size
          }}
        >
          Meet our brightest talents, ready to take on the future. Download their resumes and explore their achievements.
        </Typography>

        {loading ? (
          <Grid container spacing={2} justifyContent="center">
            {renderSkeletons()}
          </Grid>
        ) : data && data.length > 0 ? (
          <Slider {...sliderSettings}>
            {data.map((student, index) => (
              <Box key={index} px={2}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    maxWidth: compact ? 400 : 380,
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* Header Section */}
                  <Box
                    sx={{
                      background: "linear-gradient(90deg, #7b9acc, #2f3c5a)",
                      color: "white",
                      p: compact ? 2 : 3,
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src={student.profilePicture}
                      alt={`${student.name} ${student.lastName}`}
                      sx={{
                        width: compact ? 70 : 90,
                        height: compact ? 70 : 90,
                        mx: "auto",
                        mb: 2,
                        border: "3px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      }}
                    />
                    <Typography variant={compact ? "h6" : "h5"} fontWeight="bold" gutterBottom>
                      {student.name} {student.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      {student.department.name}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Chip
                        label={`${student.academicDetails.semester} Semester`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontSize: "0.75rem",
                        }}
                      />
                      <Chip
                        label={`CGPA: ${student.cgpa}`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                  </Box>

                  <CardContent sx={{ p: compact ? 2 : 3 }}>
                    {/* Contact Information */}
                    {/* {showContact && ( */}
                    <Box sx={{ margin:{xs:"10px",sm:'24px'}, }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: "#667eea" }}>
                        <Email sx={{ mr: 1, fontSize: 16, verticalAlign: "middle" }} />
                        Contact
                      </Typography>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                          📧 {student.email}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                          📞 {student.contactNumber}
                        </Typography>
                      </Stack>
                    </Box>
                    {/* )} */}

                    {/* <Divider sx={{
                      marginBottom: { xs: 0.5, sm: 1 },
                      marginTop: { xs: 0.5, sm: 1 },
                    }} /> */}

                    {/* Skills */}
{/* 
                    <Box sx={{ marginBottom: { xs: 1, sm: 2 }, marginTop: { xs: 1, sm: 2 }, }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: "#667eea" }}>
                        <School sx={{ mr: 1, fontSize: 16, verticalAlign: "middle" }} />
                        Skills
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {student?.skills?.length > 0 && (
  <>
    {student.skills.slice(0, 3).map((skill, index) => (
      <Chip
        key={index}
        label={skill}
        size="small"
        variant="outlined"
        sx={{
          fontSize: "0.75rem",
          height: 24,
          borderColor: "#667eea",
          color: "#667eea",
          mr: 0.5,
          mb: 0.5,
          "&:hover": {
            backgroundColor: "#667eea",
            color: "white",
          },
        }}
      />
    ))}

    {student.skills.length > 3 && (
      <Chip
        label={`+${student.skills.length - 3} more`}
        size="small"
        variant="outlined"
        sx={{
          fontSize: "0.75rem",
          height: 24,
          borderColor: "#667eea",
          color: "#667eea",
          mr: 0.5,
          mb: 0.5,
          "&:hover": {
            backgroundColor: "#667eea",
            color: "white",
          },
        }}
      />
    )}
  </>
)}

                      </Box>
                    </Box> */}


                    <Divider sx={{ my: 2 }} />

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        size={compact ? "small" : "medium"}
                        startIcon={<Download />}
                        href={student.resumeUrl}
                        download
                        sx={{
                          borderRadius: 2,
                          background: "linear-gradient(90deg, #7b9acc, #2f3c5a)",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: compact ? "0.75rem" : "0.875rem",
                          "&:hover": {
                            background: "linear-gradient(90deg, #7b9acc, #2f3c5a)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Resume
                      </Button>




                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mt: 6 }}>
            No data found.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FutureInnovatorsSection;
