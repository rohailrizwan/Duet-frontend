import MyProfile from "../Pages/myProfile"
import Profile from "../Pages/Profile"



const ProtectedLinks=[
    {
        path: "/profile", //userjobseeker
        component: <MyProfile />,
    },
    {
        path: "/profile/updateprofile", //userjobseeker
        component: <Profile />,
    },
    
]

export default ProtectedLinks