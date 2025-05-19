import {
  Box,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Colors from '../../assets/Style';
import WebServices from '../../apis/Website';
import CustomPagination from '../../Components/Pagination';

function Termlisting() {
  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [totalPages, settotalPages] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchdata(page, limit);
  }, []);

  const fetchdata = async (page, limit) => {
    setloading(true);
    try {
      const response = await WebServices?.getTerms(page, limit);
      console.log(response?.termsAndConditions?.data);
      setData(response?.termsAndConditions?.data || []);
      settotalPages(response?.termsAndConditions?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
    setloading(false);
  };

  const handleChange = (event, value) => {
    setpage(value);
    fetchdata(value, limit);
  };

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, idx) => (
      <Box
        key={idx}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          backgroundColor: '#ffffff',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
        }}
      >
        <Skeleton variant="circular" width={24} height={24} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Box>
    ));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.1 }}
      sx={{
        backgroundColor: '#f9f9f9',
        padding: '100px 0px',
      }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            mb: 6,
          }}
          className="font_poppins headingcolorgradient"
        >
          Terms & Conditions
        </Typography>

        <Stack spacing={3} sx={{ maxWidth: '900px', margin: '0 auto' }}>
          {loading ? (
            renderSkeletons()
          ) : data?.length > 0 ? (
            data?.map((term, index) => (
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
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <CheckCircleIcon sx={{ color: Colors?.PrimaryBlue, mt: '5px' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {term.heading}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {term.content}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1" textAlign="center" color="text.secondary">
              No Terms & Condition found.
            </Typography>
          )}
        </Stack>
      {data?.length > 0 && (
        <CustomPagination page={page} count={totalPages} onChange={handleChange} />
      )}
      </Container>
    </Box>
  );
}

export default Termlisting;
