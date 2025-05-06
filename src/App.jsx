import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ProtectedRoutes from './routes'
function App() {
  console.log("Talha Branch")
  return (
    <>
      <Router>
            <ProtectedRoutes/>
      </Router>
    </>
  )
}

export default App
