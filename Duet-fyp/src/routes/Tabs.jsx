

import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from '@mui/icons-material/Home';
 const FacultyTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon />,isvisible:false },
];

 const StudentTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Profile", path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
];

 const AlumniTab = [
  { label: "Home", path: "/profile", icon: <HomeIcon />,isvisble:true },
  { label: "Profile",  path: "/profile/updateprofile", icon: <PersonIcon /> ,isvisible:false},
];

export {FacultyTab,StudentTab,AlumniTab}
