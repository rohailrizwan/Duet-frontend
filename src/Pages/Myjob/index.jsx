"use client"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Skeleton,
  IconButton,
  TablePagination,
} from "@mui/material"
import { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import WorkIcon from "@mui/icons-material/Work"
import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import DescriptionIcon from "@mui/icons-material/Description"
import Headertext from "../../Components/Headertext"
import Container from "../../Components/Container"
import { NewButton2 } from "../../Components/BtnComponent"
import { useNavigate } from "react-router-dom"
import JobService from "../../apis/Job"
import DeleteModal from "../../Components/DeleteModal"
import { ErrorToaster, SuccessToaster } from "../../Components/Toaster"

function MyJob() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalItems, setTotalItems] = useState(0)
  const [deleteloading, setdeleteloading] = useState(false)
  const [deletemodal, setdeletemodal] = useState(false)
  const [jobid, setjobid] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJob(page + 1, rowsPerPage)
  }, [page, rowsPerPage])

  const fetchJob = async (page, limit) => {
    try {
      setLoading(true)
      const response = await JobService?.getjob(page, limit)
      setJobs(response?.data || [])
      setTotalItems(response?.totalItems || 0)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setJobs([])
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (job) => {
    navigate(`/profile/addjob`, { state: job })
  }

  const handleDelete = async () => {
    setdeleteloading(true)
    try {
      const response = await JobService.deletejob(jobid)
      if (response) {
        SuccessToaster(response?.message, "Job deleted successfully")
        setLoading(false)
        setdeleteloading(false)
        handleCreateCallback()
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      ErrorToaster(error || "Error")
      setdeleteloading(false)
    }
    setdeletemodal(false)
  }

  const handleCreateCallback = () => {
    setJobs([])
    // setPage(1);
    fetchJob(1, rowsPerPage)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box
      sx={{
        py: 4,
        minHeight: "100vh",
        bgcolor: "#f8fafc",
      }}
    >
      {/* <Container> */}
        <Headertext title="My Job Listings" />

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f1f5f9",
                  "& .MuiTableCell-head": {
                    borderBottom: "2px solid #e2e8f0",
                    py: 2.5,
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkIcon sx={{ fontSize: 18, color: "#64748b" }} />
                    S.No
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkIcon sx={{ fontSize: 18, color: "#64748b" }} />
                    Job Name
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BusinessIcon sx={{ fontSize: 18, color: "#64748b" }} />
                    Company
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: "#64748b" }} />
                    Location
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 18, color: "#64748b" }} />
                    Resume
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { bgcolor: "#f8fafc" },
                      "& .MuiTableCell-body": {
                        borderBottom: "1px solid #f1f5f9",
                        py: 2,
                      },
                    }}
                  >
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={32} sx={{ borderRadius: 1 }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <WorkIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        No Jobs Found
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Start by creating your first job posting
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    sx={{
                      "&:hover": {
                        bgcolor: "#f8fafc",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      },
                      "& .MuiTableCell-body": {
                        borderBottom: "1px solid #f1f5f9",
                        py: 2.5,
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#475569",
                          fontSize: "0.875rem",
                        }}
                      >
                        {page * rowsPerPage + index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#1e293b",
                          fontSize: "0.875rem",
                        }}
                      >
                        {job.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        {job.companyname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                        <Typography
                          sx={{
                            color: "#64748b",
                            fontSize: "0.875rem",
                          }}
                        >
                          {job.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <NewButton2
                        title="View Resume"
                        fontsize="12px"
                        handleFunction={() => navigate(`/profile/ViewResume/${job?.name}`)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-1 px-3 rounded-full transform transition-transform hover:scale-105"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleEdit(job)}
                          size="small"
                          sx={{
                            bgcolor: "#dbeafe",
                            color: "#2563eb",
                            width: 36,
                            height: 36,
                            "&:hover": {
                              bgcolor: "#bfdbfe",
                              transform: "scale(1.05)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setdeletemodal(true)
                            setjobid(job?._id)
                          }}
                          size="small"
                          sx={{
                            bgcolor: "#fee2e2",
                            color: "#dc2626",
                            width: 36,
                            height: 36,
                            "&:hover": {
                              bgcolor: "#fecaca",
                              transform: "scale(1.05)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              bgcolor: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontWeight: 500,
                color: "#475569",
                fontSize: "0.875rem",
              },
              "& .MuiTablePagination-select": {
                bgcolor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#f8fafc",
                },
              },
              "& .MuiTablePagination-actions button": {
                bgcolor: "#ffffff",
                border: "1px solid #e2e8f0",
                color: "#475569",
                borderRadius: 2,
                width: 36,
                height: 36,
                "&:hover": {
                  bgcolor: "#f1f5f9",
                  borderColor: "#cbd5e1",
                },
                "&.Mui-disabled": {
                  bgcolor: "#f8fafc",
                  color: "#cbd5e1",
                  borderColor: "#f1f5f9",
                },
              },
            }}
          />
        </TableContainer>
      {/* </Container> */}
      {deletemodal && (
        <DeleteModal
          open={deletemodal}
          setOpen={setdeletemodal}
          handleOk={handleDelete}
          title="Job"
          loading={deleteloading}
        />
      )}
    </Box>
  )
}

export default MyJob
