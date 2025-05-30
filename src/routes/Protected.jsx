import Addjob from "../Pages/AddJob"
import ChangePassword from "../Pages/Changepassword"
import CreatePost from "../Pages/CreatePost"
import MyJob from "../Pages/Myjob"
import MyProfile from "../Pages/myProfile"
// import SocialPost from "../Pages/MyProfile2"
import Profile from "../Pages/Profile"
import CreateResume from "../Pages/Student/CreateResume"
import CandidateResume from "../Pages/Student/ResumeForm/CandidateResume"
import UserProfile from "../Pages/UserProfile"
import ViewJob from "../Pages/ViewJob"
import Viewmypost from "../Pages/Viewpost"
import ViewResume from "../Pages/ViewResume"



const ProtectedLinks=[
    {
        path: "/profile", //Dashboard
        component: <MyProfile/>,
    },
    {
        path: "/profile/ChangePassword", //change password
        component: <ChangePassword />,
    },
    {
        path: "/profile/updateprofile", //Profile update
        component: <Profile />,
    },
    {
        path: "/profile/viewjob", //upcoming jobs
        component: <ViewJob />,
    },
    {
    path: "/profile/addjob", //  faculty and alumni
        component: <Addjob />,
    },
    {
    path: "/profile/myjob", //faculty and alumni job
        component: <MyJob />,
    },
    {
    path: "/profile/ViewResume", // faculty and alumni
        component: <ViewResume />,
    },
    {
    path: "/profile/userProfile", // profile
        component: <UserProfile />,
    },
    {
    path: "/profile/createresume", //userjobseeker
        component: <CreateResume />,
    },
    {
    path: "/profile/candidateResume", //userjobseeker
        component: <CandidateResume />,
    },
    {
    path: "/profile/viewmypost", //userjobseeker
        component: <Viewmypost />,
    },
    
]

export default ProtectedLinks