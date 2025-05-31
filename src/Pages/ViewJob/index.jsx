import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Pagination,
  Skeleton
} from '@mui/material';
import Container from '../../Components/Container';
import JobCard from '../myProfile/Jobcard';
import Headertext from '../../Components/Headertext';
import JobService from '../../apis/Job';

const ViewJob = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchJob(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchJob = async (page, limit) => {
    try {
      setLoading(true);
      const response = await JobService?.getjob(page, limit);
      console.log(response);
      
      const fetchedJobs = response?.data || [];
      setJobs(fetchedJobs);
      setTotalItems(response?.totalItems || 0);
      if (fetchedJobs.length > 0 && !selectedJob) {
        setSelectedJob(fetchedJobs[0]);
      } else if (fetchedJobs.length === 0) {
        setSelectedJob(null);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setTotalItems(0);
      setSelectedJob(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(totalItems / rowsPerPage);

  return (
    <Box sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',borderRadius:4 }}>
      <Container>
        <Headertext title="Career Pathway" />

        <Grid container spacing={2}>
          {/* Left: Paginated Job List */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                maxHeight: '65vh',
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                '-ms-overflow-style': 'none',
                scrollbarWidth: 'none'
              }}
            >
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <Box key={index} sx={{ mb: 2, p: 1 }}>
                    <Typography><Skeleton height={100} /></Typography>
                  </Box>
                ))
              ) : jobs.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No Jobs Available
                  </Typography>
                </Box>
              ) : (
                jobs.map((job) => (
                  <Box
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      overflowX: 'auto',
                      border:
                        selectedJob?.id === job.id
                          ? '2px solid'
                          : '1px solid transparent',
                      borderColor:
                        selectedJob?.id === job.id
                          ? 'primary.main'
                          : 'transparent',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <JobCard
                      job={job}
                      truncate
                      maxlength={80}
                      istruncate
                      sx={{ p: 1 }}
                    />
                  </Box>
                ))
              )}
            </Box>

            {/* Pagination Controls */}
            {jobs.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 500,
                      '&.Mui-selected': {
                        backgroundColor: '#1976d2',
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#1565c0'
                        }
                      }
                    }
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Right: Selected Job Details (Sticky) */}
          <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 16 }}>
              {selectedJob ? (
                <JobCard
                  job={selectedJob}
                  truncate={false}
                  sx={{
                    mb: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    borderRadius: 3,
                    p: 2
                  }}
                />
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No Job Selected
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewJob;