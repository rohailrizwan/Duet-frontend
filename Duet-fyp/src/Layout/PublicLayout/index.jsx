import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout
