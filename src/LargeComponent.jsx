

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Menu, MenuItem, } from '@mui/material';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import { red } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SunnyIcon from '@mui/icons-material/Sunny';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import Posts from './PostsComponent';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PostingDialog from './posting_dialog';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommentsDialog from './commentsDialog';
import GoogleIcon from '@mui/icons-material/Google';
import LogoDark from "./public/Logo_Dark_mode.png";
import LogoLight from "./public/Logo_Light_mode.png";
import axios from 'axios';
import LogoutDialog from './logOutDialog';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Avatar from '@mui/material/Avatar';
import NotificationsComponent from './notificationsComponent';
import BaseUrl from './BaseUrl';
import { useTheme } from '@mui/material/styles';
import WelcomeModal from './welcome_modal';

export default  function LargeComponent({ toggleMode, mode }) {
 const theme = useTheme();




    const [UserData, setUserData] = useState([])
    const [isLogged, setIsLogged] = useState(false);
    const [isLoggedKnown, setisLoggedKnown] = useState(false);



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



    const [anchorElNot, setAnchorElNot] = useState(null);
   const openNot = Boolean(anchorElNot);
  const handleClickopenNot = (event) => {
    setAnchorElNot(event.currentTarget);
    setnotcount(0)
  };
  const handleCloseNot = () => {
    setAnchorElNot(null);
  };


const danger = red[800]


    const [openposting, setOpenposting] = useState(false);
  const handleClickOpenposting = () => {
    setOpenposting(true);
  };
    const handleCloseposting = () => {
    setOpenposting(false);
  };

  
const [notcount, setnotcount] = useState(0); 


const [openLogOut, setopenLogOut] = useState(false); 
const HandelopenLogOut = () => {
    setopenLogOut(true)
  }
  const HandelCloseLogOut= () => {
    setopenLogOut(false)
  }

useEffect(() => {

 axios.get(`${BaseUrl}/me`,{
        withCredentials: true 
      })
      .then(response => {
        setisLoggedKnown(true);
        setIsLogged(true);
        const currentUserId = response.data.user._id
        const UserPFP = response.data.user.avatar
        console.log("PFPF",response.data)
     localStorage.setItem("currentUserId", currentUserId);
     localStorage.setItem("UserPFP",UserPFP)
        setUserData(response.data.user);
        setnotcount(response.data.notsCount)
      })
      .catch(err => {
        setisLoggedKnown(true);
        setIsLogged(false);
        console.log(err);

      });

    }, []);




    console.log(UserData);

return (
 

<>
<Box sx={{zIndex:"99",borderBottom: "1px rgba(126, 126, 126, 0.34) solid",background: theme.palette.background.paper,color: theme.palette.text.primary,width:"100%",position:"fixed",top:"0px",padding:{ xs: "10px 20px", sm: "10px 30px", md: "10px 45px" },display:"flex",alignItems:"center",justifyContent:"space-between"}}>

<Box style={{height:"33px",alignItems:"center",justifyContent:"center",display:"flex"}}>

<img style={{height:"100%"}} src={ mode === 'dark' ? LogoDark : LogoLight} alt="" />
<Typography sx={{fontSize:"30px",fontWeight:"700",marginLeft:"10px",display:{ xs: "none", sm: "flex", md: "flex" }}}>MOPOK</Typography>
</Box>

        <Box sx={{display:"flex",marginLeft:"auto",alignItems:"center",justifyContent:"center",padding:"10px"}}>
<IconButton 
  onClick={toggleMode} 
  color="primary" 
  sx={{ height: "45px", width: "45px", borderRadius: "50%" }}
>
  {mode === "dark" ? <SunnyIcon /> : <DarkModeIcon />}
</IconButton>

          </Box>

{!isLoggedKnown ? (

  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
    <CircularProgress size={40} />
  </Box>
) : (
  isLogged ? (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Badge badgeContent={notcount} color="error" overlap="circular">
        <IconButton
          onClick={handleClickopenNot}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>

      <Button
        color="primary"
        sx={{ height: "45px", marginInline: "10px" }}
        onClick={handleClickOpenposting}
        variant="contained"
      >
        <AddIcon sx={{ mr: 1 }} />
        add
      </Button>

      <Avatar
        src={UserData.avatar}
        onClick={handleClick}
        alt=""
        sx={{ height: "45px", width: "45px", cursor: "pointer" }}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={{ padding: "10px" }}>
          <Typography sx={{ fontSize: "15px" }}>{UserData.email}</Typography>
          <Typography sx={{ fontSize: "16px" }}>{UserData.name}</Typography>
        </Box>
        <Divider sx={{ marginBottom: "7px" }} />

        <MenuItem component={Link} to={`/Profile/${UserData._id}`} onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          your account
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: danger }} onClick={HandelopenLogOut}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: danger }} fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Fab
      onClick={() => {
        window.location.href = `${BaseUrl}/auth/google`;
      }}
      color="primary"
      variant="extended"
    >
      <GoogleIcon sx={{ mr: 1 }} />
      Login with google
    </Fab>
  )
)}

</Box>


<Box sx={{display:"flex",flexDirection:"column",height:"100vh",width:{ xs: "95%", sm: "60%", md: "46%" },alignItems:"center",marginTop:"180px"}}>
<Posts />

</Box>

<PostingDialog openposting={openposting} handleCloseposting={handleCloseposting} />
<LogoutDialog openLogOut={openLogOut} HandelCloseLogOut={HandelCloseLogOut} />
<NotificationsComponent handleCloseNot={handleCloseNot} openNot={openNot} anchorElNot={anchorElNot}  />
 <WelcomeModal/>
</>


)

}
