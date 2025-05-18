import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../Components/Container';
import {
  Box,
  Grid,
  Typography,
  Skeleton,
} from '@mui/material';

function Ourevents({ events = [], isLoading = false }) {
  const skeletonCount = 6;

  const isDataEmpty = !isLoading && events.length === 0;

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
          variant="h3"
          component="h2"
          sx={{ fontWeight: 600, mb: 8, textAlign: 'center' }}
          className="font_poppins headingcolorgradient"
        >
          Upcoming Events at DUET
        </Typography>

        {isDataEmpty ? (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}
          >
            No events found.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {(isLoading ? Array.from({ length: skeletonCount }) : events).map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    backgroundColor: '#fff',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton variant="rectangular" width="100%" height={220} />
                      <Box sx={{ p: 3 }}>
                        <Skeleton width="60%" height={30} sx={{ mb: 1 }} />
                        <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
                        <Skeleton width="100%" height={20} />
                      </Box>
                    </>
                  ) : (
                    <>
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{ width: '100%', height: 220, objectFit: 'cover' }}
                      />
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {event.date}
                        </Typography>
                        <Typography variant="body2">
                          {event.description}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Ourevents;
