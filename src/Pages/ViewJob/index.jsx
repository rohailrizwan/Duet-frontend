"use client"
import { useState, useEffect } from "react"
import { Box, Grid, Typography, Pagination, Skeleton, Paper, Fade } from "@mui/material"
import Container from "../../Components/Container"
import JobCard from "../myProfile/Jobcard"
import Headertext from "../../Components/Headertext"
import JobService from "../../apis/Job"

const ViewJob = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchJob(page, rowsPerPage)
  }, [page, rowsPerPage])

  const fetchJob = async (page, limit) => {
    try {
      setLoading(true)
      const response = await JobService?.getalljob(page, limit)
      console.log(response)

      const fetchedJobs = response?.data || []
      setJobs(fetchedJobs)
      setTotalItems(response?.totalItems || 0)
      if (fetchedJobs.length > 0 && !selectedJob) {
        setSelectedJob(fetchedJobs[0])
      } else if (fetchedJobs.length === 0) {
        setSelectedJob(null)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setJobs([])
      setTotalItems(0)
      setSelectedJob(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (_, value) => {
    setPage(value)
  }

  const pageCount = Math.ceil(totalItems / rowsPerPage)

  return (
    <Box
      sx={{
       px:2,
        py: 5,
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        borderRadius: 4,
      }}
    >
      {/* <Container> */}
        <Box sx={{ mb: 4 }}>
          <Headertext title="Career Pathway" />
        </Box>

        <Grid container spacing={4}>
          {/* Left: Job List */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* List Header */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    mb: 0.5,
                  }}
                >
                  Available Positions
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                  {totalItems} jobs available
                </Typography>
              </Box>

              <Box
                sx={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                  p: 2,
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f5f9",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#cbd5e1",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#94a3b8",
                    },
                  },
                }}
              >
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Skeleton height={24} width="70%" sx={{ mb: 1 }} />
                        <Skeleton height={18} width="50%" sx={{ mb: 2 }} />
                        <Skeleton height={60} width="100%" />
                      </Paper>
                    </Box>
                  ))
                ) : jobs.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      No Jobs Available
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      Please check back later for new opportunities
                    </Typography>
                  </Box>
                ) : (
                  jobs.map((job, index) => (
                    <Fade in={true} timeout={200 + index * 50} key={job.id}>
                      <Box
                        onClick={() => setSelectedJob(job)}
                        sx={{
                          mb: 2,
                          cursor: "pointer",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: selectedJob?.id === job.id ? "4px" : "0px",
                            backgroundColor: "#3b82f6",
                            borderRadius: "0 2px 2px 0",
                            transition: "width 0.2s ease",
                          },
                        }}
                      >
                        <JobCard
                          job={job}
                          truncate
                          maxlength={80}
                          istruncate
                          sx={{
                            border: selectedJob?.id === job.id ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                            borderRadius: 2,
                            transition: "all 0.2s ease",
                            backgroundColor: selectedJob?.id === job.id ? "#eff6ff" : "#ffffff",
                            "&:hover": {
                              backgroundColor: "#f8fafc",
                              transform: "translateY(-1px)",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            },
                          }}
                        />
                      </Box>
                    </Fade>
                  ))
                )}
              </Box>

              {/* Pagination */}
              {jobs.length > 0 && (
                <Box
                  sx={{
                    p: 3,
                    borderTop: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontWeight: 600,
                        color: "#64748b",
                        "&.Mui-selected": {
                          backgroundColor: "#3b82f6",
                          color: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#2563eb",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#f1f5f9",
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right: Job Details */}
          <Grid item xs={12} md={7} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "sticky", top: 16 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              >
                {selectedJob ? (
                  <>
                    {/* Details Header */}
                    <Box
                      sx={{
                        p: 3,
                        borderBottom: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          mb: 0.5,
                        }}
                      >
                        Job Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Complete information about this position
                      </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                      <JobCard
                        job={selectedJob}
                        truncate={false}
                        sx={{
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "transparent",
                          p: 0,
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center", py: 10 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Select a Job
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      Choose a position from the list to view details
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      {/* </Container> */}
    </Box>
  )
}

export default ViewJob
