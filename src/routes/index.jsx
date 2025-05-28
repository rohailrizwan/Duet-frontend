import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PublicRoute from './Public';
import PublicLayout from '../Layout/PublicLayout';
import Login from '../Pages/Login';
import ProtectedLinks from './Protected';
import ProtectedLayout from '../Layout/ProtectedLayout';
import { AlumniTab, FacultyTab, StudentTab } from './Tabs';
import FullScreenLoader from '../Components/FullScreenLoader';
import ToasterContainer from '../Components/Toaster';
import { useSelector } from 'react-redux';

function ProtectedRoutes() {
  const user = useSelector((state)=>state?.auth?.user)
  console.log(user,"user");
  
  const [loading, setLoading] = useState(true); // Initial Loader
  const location = useLocation();

  useEffect(()=>{
      setTimeout(() => {
          setLoading(false)
      }, 2000);
  },[location?.pathname])
  

  const type = "Student"
  
  const isProtected = (children, path) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    const isStudent = user?.role == "user" && StudentTab.some(tab => tab.path === path);
    const isAlumni = user?.role == "alumni" && AlumniTab.some(tab => tab.path === path);
    const isFaculty = user?.role == "faculty" && FacultyTab.some(tab => tab.path === path);
  
    if (isStudent || isFaculty || isAlumni) {
      return children;
    }
  
    return <Navigate to="/" replace />;
  };
  
  
  

  return (
    <>
      {loading && location.pathname == "/" && <FullScreenLoader />} {/* Loader Component */}
      <Suspense>
        <ToasterContainer/>
        <Routes>
          <Route path="/" element={<PublicLayout/>}>
            {PublicRoute?.map((item) => (
              <Route key={item.path} path={item.path} element={item.component} />
            ))}
          </Route>

          <Route path="/profile" element={< ProtectedLayout type={type} user={user}/>}>
            {ProtectedLinks?.map((route) => (
              <Route key={route.path} path={route.path} element={isProtected(route.component, route?.path)} />
            ))}
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default ProtectedRoutes
