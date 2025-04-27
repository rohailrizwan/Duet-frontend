

import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HomeIcon from '@mui/icons-material/Home';
 const FacultyTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisble:true },
  { label: "Add Jobs", path: "/profile/addjob", icon: <PostAddIcon />,isvisble:true },
  { label: "View Resume", path: "/profile/ViewResume", icon: <FilePresentIcon />,isvisble:false },
  { label: "My Job", path: "/profile/myjob", icon: <WorkIcon />,isvisble:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisble:true },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon />,isvisible:false },
];

 const StudentTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisble:true },
  { label: "Create Resume", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisble:true },
  { label: "View Resume", path: "/profile/candidateResume", icon: <VisibilityIcon />,isvisble:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisble:true },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
];

 const AlumniTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisble:true },
  { label: "Add Jobs", path: "/profile/addjob", icon: <PostAddIcon />,isvisble:true },
  { label: "View Resume", path: "/profile/ViewResume", icon: <FilePresentIcon />,isvisble:false },
  { label: "My Job", path: "/profile/myjob", icon: <WorkIcon />,isvisble:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisble:true },
  { label: "Profile",  path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
];

export {FacultyTab,StudentTab,AlumniTab}
