import About from "../Pages/About";
import UpcomingEvents from "../Pages/Events";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

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
    
]

export default PublicRoute