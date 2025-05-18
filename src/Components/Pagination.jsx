// components/CustomPagination.jsx
import React from 'react';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    fontWeight: 500,
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  '& .Mui-selected': {
    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
    color: '#fff',
    fontWeight: 700,
    boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
    border: 'none',
  },
}));

const CustomPagination = ({ page, count, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 3 }}>
      <StyledPagination
        page={page}
        count={count}
        onChange={onChange}
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem {...item} />
        )}
      />
    </Box>
  );
};

export default CustomPagination;
