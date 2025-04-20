import About from "../Pages/About";
import UpcomingEvents from "../Pages/Events";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Faculty from "../Pages/OurFaculty/Faculty";
import Terms from "../Pages/Terms";

const PublicRoute = [
    {
        path: "/",
        component: <Home/>,
    },
    {
        path: "/about",
        component: <About/>,
    },
    {
        path: "/events",
        component: <UpcomingEvents/>,
    },
    {
        path: "/terms",
        component: <Terms/>,
    },
    
    {
        path: "/viewfaculty",
        component: <Faculty/>,
    },
    
]

export default PublicRoute