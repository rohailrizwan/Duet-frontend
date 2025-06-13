import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Skeleton, IconButton, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import Headertext from '../../Components/Headertext';
import Container from '../../Components/Container';
import { NewButton2 } from '../../Components/BtnComponent';
import { useNavigate } from 'react-router-dom';
import JobService from '../../apis/Job';
import DeleteModal from '../../Components/DeleteModal';
import { ErrorToaster, SuccessToaster } from '../../Components/Toaster';

function MyJob() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [deleteloading, setdeleteloading] = useState(false);
    const [deletemodal, setdeletemodal] = useState(false);
    const [jobid, setjobid] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchJob(page + 1, rowsPerPage);
    }, [page, rowsPerPage]);

    const fetchJob = async (page, limit) => {
        try {
            setLoading(true);
            const response = await JobService?.getjob(page, limit);
            setJobs(response?.data || []);
            setTotalItems(response?.totalItems || 0);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (job) => {
        navigate(`/profile/addjob`,{state:job});
    };

    const handleDelete = async () => {
        setdeleteloading(true)
        try {
            const response = await JobService.deletejob(jobid);
            if (response) {
                SuccessToaster(response?.message, "Job deleted successfully")
                setLoading(false)
                setdeleteloading(false)
                handleCreateCallback()
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            ErrorToaster(error || "Error")
            setdeleteloading(false)
        }
        setdeletemodal(false)
    };
   

    const handleCreateCallback = () => {
        setJobs([]);
        // setPage(1);
        fetchJob(1,rowsPerPage);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', borderRadius: 4 }}>
            <Container>
                <Headertext title="My Job Listings" />

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff',
                        maxWidth: 1200,
                        mx: 'auto',
                        mt: 3
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />S.No</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Job Name</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Company</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Location</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Resume</TableCell>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}><Typography>Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                Array.from({ length: rowsPerPage }).map((_, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                                        <TableCell><Skeleton height={30} /></TableCell>
                                        <TableCell><Skeleton height={30} /></TableCell>
                                        <TableCell><Skeleton height={30} /></TableCell>
                                        <TableCell><Skeleton height={30} /></TableCell>
                                        <TableCell><Skeleton height={30} /></TableCell>
                                        <TableCell><Skeleton height={30} /></TableCell>
                                    </TableRow>
                                ))
                            ) : jobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="h6" color="textSecondary" className="py-4">
                                            No Jobs Found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job, index) => (
                                    <TableRow
                                        key={job.id}
                                        className="hover:bg-gray-50 transition-colors"
                                        sx={{ '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } }}
                                    >
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{job.name}</TableCell>
                                        <TableCell>{job.companyname}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>
                                            <NewButton2
                                                title="View Resume"
                                                fontsize="12px"
                                                handleFunction={() => navigate(`/profile/ViewResume/${job?.name}`)}
                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-1 px-3 rounded-full transform transition-transform hover:scale-105"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    onClick={() => handleEdit(job)}
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        color: '#ffffff',
                                                        borderRadius: '50%',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        setdeletemodal(true)
                                                        setjobid(job?._id)
                                                    }}
                                                    sx={{
                                                        backgroundColor: '#d32f2f',
                                                        color: '#ffffff',
                                                        borderRadius: '50%',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        '&:hover': {
                                                            backgroundColor: '#b71c1c',
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon />
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
                            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                fontWeight: 500,
                                color: '#333',
                            },
                            '& .MuiTablePagination-actions button': {
                                backgroundColor: '#1976d2',
                                color: '#ffffff',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                            },
                        }}
                    />
                </TableContainer>
            </Container>
            {deletemodal && <DeleteModal open={deletemodal} setOpen={setdeletemodal} handleOk={handleDelete} title="Job" loading={deleteloading}/>}
        </Box>
    );
}

export default MyJob;