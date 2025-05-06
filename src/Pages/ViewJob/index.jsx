import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Pagination
} from '@mui/material';
import Container from '../../Components/Container';
import JobCard from '../myProfile/Jobcard';
import jobList from '../myProfile/Jobdata';
import Headertext from '../../Components/Headertext';


const ViewJob = () => {
  // Selected job state
  const [selectedJob, setSelectedJob] = useState(jobList[0]);
  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(jobList.length / itemsPerPage);

  // Compute current page slice
  const currentJobs = jobList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ py: 0, minHeight: '100vh' }}>
    <Container>
      {/* Heading and Divider */}
      <Headertext title={"Career Pathway"}/>

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
            {currentJobs.map((job) => (
              <Box
                key={job.jobName}
                onClick={() => setSelectedJob(job)}
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  overflowX:"auto",
                  border:
                    selectedJob.jobName === job.jobName
                      ? '2px solid'
                      : '1px solid transparent',
                  borderColor:
                    selectedJob.jobName === job.jobName
                      ? 'primary.main'
                      : 'transparent',
                  borderRadius: 2
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
            ))}
          </Box>

          {/* Pagination Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>

        {/* Right: Selected Job Details (Sticky) */}
        <Grid item xs={12} md={7} sx={{display:{xs:'none',md:'block'}}}>
          <Box sx={{ position: 'sticky', top: 16 }}>
            <JobCard job={selectedJob} truncate={false} sx={{ mb: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default ViewJob;
