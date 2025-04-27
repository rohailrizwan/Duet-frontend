import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, IconButton, Avatar } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const JobCard = ({ job, truncate = false, maxlength = 120, istruncate = false, sx = {} }) => {
  const { jobName, companyName, timing, description, location, user } = job;
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
        boxShadow: 3,
        p: 2,
        overflowX: "auto",
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: '#fff',
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
          <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" color="text.secondary">
            {user.name}
          </Typography>
        </Box>
      )}

      {/* Job Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WorkIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }} noWrap>
          {jobName}
        </Typography>
      </Box>

      {/* Company */}
      <Typography variant="subtitle2" color="text.secondary" noWrap>
        {companyName}
      </Typography>

      {/* Chips for timing and location */}
      <Stack direction="row" spacing={1}>
        <Chip
          icon={<ScheduleIcon fontSize="small" />}
          label={timing}
          size="small"
          variant="outlined"
        />
        <Chip
          icon={<PlaceIcon fontSize="small" />}
          label={location}
          size="small"
          variant="outlined"
        />
      </Stack>

      {/* Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {displayedDescription}
      </Typography>

      {/* Read More if truncated */}
      {istruncate && shouldTruncate && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <IconButton size="small" aria-label="read more">
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default JobCard;
