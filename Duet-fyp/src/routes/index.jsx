import React, { Suspense, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PublicRoute from './Public';
import PublicLayout from '../Layout/PublicLayout';
import Login from '../Pages/Login';
import ProtectedLinks from './Protected';
import ProtectedLayout from '../Layout/ProtectedLayout';
import { AlumniTab, FacultyTab, StudentTab } from './Tabs';

function ProtectedRoutes() {
  const user = true
  const [loading, setLoading] = useState(false); // Initial Loader
  const location = useLocation();

  // useEffect(() => {
  //   const isDashboard = location?.pathname.includes('/dashboard');
  
  //   if (!isDashboard) {
  //     setLoading(true);
  
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  
  //     return () => clearTimeout(timer);
  //   }
  // }, [location.pathname]);
  

  const type="Student"
  
  const isProtected = (children, path) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    const isStudent = type == "Student" && StudentTab.some(tab => tab.path === path);
    const isAlumni = type == "Alumni" && AlumniTab.some(tab => tab.path === path);
    const isFaculty = type == "Faculty" && FacultyTab.some(tab => tab.path === path);
  
    if (isStudent || isFaculty || isAlumni) {
      return children;
    }
  
    return <Navigate to="/" replace />;
  };
  
  
  

  return (
    <>
      {loading && <FullScreenLoader />} {/* Loader Component */}
      <Suspense>
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
