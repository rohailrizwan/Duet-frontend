import React, { Suspense, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import PublicRoute from './Public';
import PublicLayout from '../Layout/PublicLayout';

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
  

  // const isProtected = (children, path) => {
  //   if (!application_name || !LoginData) {
  //     return <Navigate to="/login" replace />;
  //   }
  //   if (
  //     (LoginData?.type === "Employer" && EmployerTab.some((tab) => tab.path === path)) ||
  //     (LoginData?.type === "Job Seeker" && JobseekerTab.some((tab) => tab.path === path))
  //   ) {
  //     return children;
  //   }
  //   return <Navigate to="/" replace />;
  // };

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

          {/* <Route path="/dashboard" element={<PortalDashboard />}>
            {Protectedroutes?.map((route) => (
              <Route key={route.path} path={route.path} element={isProtected(route.component, route?.path)} />
            ))}
          </Route> */}

          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Nodatafound />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}
export default ProtectedRoutes
