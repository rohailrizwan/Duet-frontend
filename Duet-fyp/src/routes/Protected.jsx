import Addjob from "../Pages/AddJob"
import CreatePost from "../Pages/CreatePost"
import MyJob from "../Pages/Myjob"
import MyProfile from "../Pages/myProfile"
import Profile from "../Pages/Profile"
import UserProfile from "../Pages/UserProfile"
import ViewJob from "../Pages/ViewJob"
import ViewResume from "../Pages/ViewResume"



const ProtectedLinks=[
    {
        path: "/profile", //userjobseeker
        component: <MyProfile />,
    },
    {
        path: "/profile/updateprofile", //userjobseeker
        component: <Profile />,
    },
    {
        path: "/profile/viewjob", //userjobseeker
        component: <ViewJob />,
    },
    {
    path: "/profile/addjob", //userjobseeker
        component: <Addjob />,
    },
    {
    path: "/profile/resume", //userjobseeker
        component: <Addjob />,
    },
    {
    path: "/profile/myjob", //userjobseeker
        component: <MyJob />,
    },
    {
    path: "/profile/ViewResume", //userjobseeker
        component: <ViewResume />,
    },
    {
    path: "/profile/userProfile", //userjobseeker
        component: <UserProfile />,
    },
    
]

export default ProtectedLinks