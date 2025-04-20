import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Box } from '@mui/material';

function PublicLayout() {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const scrolltop = useRef();
  const location=useLocation()
  useEffect(() => {
    scrolltop.current.scrollIntoView({ behavior: "smooth" });
  }, [location.pathname]);
  return (
    <div>
      <Navbar />
      <Box component="main" ref={scrolltop}>
      <Outlet />
      </Box>
      <Footer/>
    </div>
  )
}

export default PublicLayout
