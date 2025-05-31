import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, Button, Avatar, Tooltip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';

const JobCard = ({ job, truncate = false, maxlength = 120, istruncate = false, sx = {}, onReadMore }) => {
  const { name, companyname, timing, description, location, phonenumber, user } = job;
  const MAX_LENGTH = maxlength;
  const shouldTruncate = truncate && description.length > MAX_LENGTH;
  const displayedDescription = shouldTruncate
    ? `${description.slice(0, MAX_LENGTH)}...`
    : description;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        p: 2,
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
        },
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        ...sx,
      }}
    >
      {/* Poster Info */}
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar src={user?.profilePicture} alt={user.name} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" color="text.secondary">
            {user.name}
          </Typography>
        </Box>
      )}

      {/* Job Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WorkIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }} noWrap>
          {name}
        </Typography>
      </Box>

      {/* Company */}
      <Typography variant="subtitle2" color="text.secondary" noWrap>
        {companyname}
      </Typography>

      {/* Chips for timing and location */}
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Tooltip title={timing} placement="top">
          <Chip
            icon={<ScheduleIcon fontSize="small" />}
            label={timing}
            size="small"
            variant="outlined"
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              maxWidth: '200px',
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              '& .MuiChip-icon': { color: '#1976d2' },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#1565c0',
              },
            }}
          />
        </Tooltip>
        <Tooltip title={location} placement="top">
          <Chip
            icon={<PlaceIcon fontSize="small" />}
            label={location}
            size="small"
            variant="outlined"
            sx={{
              borderColor: '#1976d2',
              marginLeft:'0px !important',
              color: '#1976d2',
              maxWidth: '200px',
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              '& .MuiChip-icon': { color: '#1976d2' },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#1565c0',
              },
            }}
          />
        </Tooltip>
      </Stack>

      {/* Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-word' }}>
        {displayedDescription}
      </Typography>

      {/* Read More if truncated */}
      {istruncate && shouldTruncate && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            size="small"
            onClick={onReadMore}
            sx={{
              textTransform: 'none',
              color: '#1976d2',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                textDecoration: 'underline',
              },
            }}
          >
            Read More
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default JobCard;