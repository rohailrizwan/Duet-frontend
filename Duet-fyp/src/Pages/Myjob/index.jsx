import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Skeleton, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Headertext from '../../Components/Headertext';
import Container from '../../Components/Container';
import { NewButton2 } from '../../Components/BtnComponent';
import { useNavigate } from 'react-router-dom';

function MyJob() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    useEffect(() => {
        // Simulate API call or loading
        setTimeout(() => {
            const fetchedJobs = [
                // Uncomment this array to test with data
                { jobName: 'Frontend Developer', companyName: 'Tech Corp', location: 'Karachi' },
                { jobName: 'Backend Engineer', companyName: 'InnovateX', location: 'Lahore' },
                { jobName: 'UI/UX Designer', companyName: 'Designify', location: 'Islamabad' },
            ];

            setJobs(fetchedJobs);
            setLoading(false);
        }, 1000); // 1 second loading
    }, []);

    const handleEdit = (job) => {
        console.log('Edit clicked:', job);
        // Navigate or open modal for editing
    };

    const handleDelete = (job) => {
        console.log('Delete clicked:', job);
        // Confirmation dialog and delete logic
    };

    return (
        <Box sx={{ py: 0, minHeight: '100vh' }}>
            <Container>
                <Headertext title={"Job Listings"} />

                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>S.No</strong></TableCell>
                                <TableCell><strong>Job Name</strong></TableCell>
                                <TableCell><strong>Company Name</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Resume</strong></TableCell>
                                <TableCell><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <TableRow key={index}>
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
                                    <TableCell colSpan={5} align="center">
                                        No Data Found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{job.jobName}</TableCell>
                                        <TableCell>{job.companyName}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>
                                            <NewButton2 title='View Resume' fontsize={"12px"} handleFunction={()=>navigate('/profile/ViewResume')}/>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    onClick={() => handleEdit(job)}
                                                    sx={{
                                                        backgroundColor: '#ffffff',
                                                        color: '#1976d2',
                                                        borderRadius: '50%',
                                                        boxShadow: 1,
                                                        '&:hover': {
                                                            backgroundColor: '#f0f0f0',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleDelete(job)}
                                                    sx={{
                                                        backgroundColor: '#ffffff',
                                                        color: 'red',
                                                        borderRadius: '50%',
                                                        boxShadow: 1,
                                                        '&:hover': {
                                                            backgroundColor: '#f0f0f0',
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
                </TableContainer>
            </Container>
        </Box>
    );
}

export default MyJob;
