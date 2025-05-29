

import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';

 const FacultyTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisible:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisible:true },
  { label: "Add Jobs", path: "/profile/addjob", icon: <PostAddIcon />,isvisible:true },
  { label: "View Resume", path: "/profile/ViewResume", icon: <FilePresentIcon />,isvisible:false },
  { label: "My Job", path: "/profile/myjob", icon: <WorkIcon />,isvisible:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisible:true },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon />,isvisible:false },
  { label: "Profile", path: "/profile/ChangePassword", icon: <PersonIcon />,isvisible:false },
  { label: "My Post", path: "/profile/viewmypost", icon: <FeedIcon />,isvisible:true },
];

 const StudentTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisible:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisible:true },
  { label: "Create Resume", path: "/profile/createresume", icon: <VisibilityIcon />,isvisible:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisible:true },
  { label: "My Post", path: "/profile/viewmypost", icon: <FeedIcon />,isvisible:true },
  { label: "View Resume", path: "/profile/candidateResume", icon: <VisibilityIcon />,isvisible:false },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
  { label: "Profile", path: "/profile/ChangePassword", icon: <PersonIcon /> ,isvisible:false},
];

 const AlumniTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisible:true },
  { label: "Upcoming Jobs", path: "/profile/viewjob", icon: <VisibilityIcon />,isvisible:true },
  { label: "Add Jobs", path: "/profile/addjob", icon: <PostAddIcon />,isvisible:true },
  { label: "View Resume", path: "/profile/ViewResume", icon: <FilePresentIcon />,isvisible:false },
  { label: "My Job", path: "/profile/myjob", icon: <WorkIcon />,isvisible:true },
  { label: "My Profile", path: "/profile/userProfile", icon: <PersonIcon />,isvisible:true },
  { label: "Profile",  path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
  { label: "Profile",  path: "/profile/ChangePassword", icon: <PersonIcon /> ,isvisible:false},
  { label: "My Post", path: "/profile/viewmypost", icon: <FeedIcon />,isvisible:true },
];

export {FacultyTab,StudentTab,AlumniTab}
