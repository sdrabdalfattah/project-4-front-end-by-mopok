import { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommentsDialog from './commentsDialog';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import PostRev from './PostRev'
import toast from "react-hot-toast";
import BaseUrl from "./BaseUrl";

import FavoriteIcon from '@mui/icons-material/Favorite';
dayjs.extend(relativeTime);






export default function NotificationsComponent({ handleCloseNot, openNot, anchorElNot }) {
  const [notifications, setNotifications] = useState([]);
  const [Loading, setLoading] = useState(true);


  const renderIcon = (type) => {
    switch (type) {
      case "likePost":
        return (
          <Box
            sx={{
              height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
              flexShrink: "0",
              color:"white",
              background: "rgba(255, 71, 71, 1)",
            }}
          >
            <FavoriteIcon sx={{ fontSize: "13px" }} />
          </Box>
        );
      case "comment":
        return (
          <Box
            sx={{
           height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
              flexShrink: "0",
              color:"white",
              background: "rgba(0, 132, 255, 1)",
            }}
          >
            <QuickreplyIcon sx={{ fontSize: "13px" }} />
          </Box>
        );
      case "likeComment":
        return (
          <Box
            sx={{
              height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
              flexShrink: "0",
              color:"white",
              background: "rgba(255, 71, 71, 1)",
            }}
          >
            <QuickreplyIcon sx={{ fontSize: "13px" }} />
          </Box>
        );
      case "follow":
        return (
          <Box
            sx={{
           height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
              flexShrink: "0",
              color:"white",
              background: "rgba(0, 132, 255, 1)",
            }}
          >
            <PersonAddIcon sx={{ fontSize: "13px" }} />
          </Box>
        );
      default:
        return null;
    }
  };




  useEffect(() => {
    if (openNot) {
      axios
        .get(`${BaseUrl}/get-notification`, { withCredentials: true })
        .then((response) => {
          console.log("notification", response.data);
          setNotifications(response.data);
          setLoading(false)
        })
        .catch((error) => {
              toast.error(error.data.message);
          console.log(error);
          setLoading(false)
        });
    }
  }, [openNot]);


    const [PostID ,setpostID] = useState(0)
    const [PostCommentsID ,setPostCommentsID] = useState(0)
    const [openPostRev ,setopenPostRev] = useState(false)
    const [openComments, setopenComments] = useState(false);
    const [ commentId , setCommentId ] = useState(0)
  const [ commentCreator , setcommentCreator ] = useState(0)

    const handelGetNot = (recipientId,type,postId, commentid) => {

      if(type == "follow") {window.location.href = `/Profile/${recipientId}`}

      if(type == "likePost") {setopenPostRev(true)
          setpostID(postId)
      }

          if(type == "comment" || type == "likeComment") {setopenPostRev(true)
            setPostCommentsID(postId)
         setTimeout(() => {setopenComments(true)} , 1000) 
          setpostID(postId)
          setCommentId(commentid)
          if(type == "comment"){
          setcommentCreator(recipientId)
          }
      }

  }
    const handelclosePostRev = () => {
    setopenPostRev(false);
  };

     const handlecloseComments = () => {
    setopenComments(false);
  };



  return (
    <>
    <Menu
      anchorEl={anchorElNot}
      open={openNot}
      onClose={handleCloseNot}
      PaperProps={{
        style: {
          maxHeight: 600,
          width: 400,
        },
      }}
    >
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:"12px"}}>
            <Typography variant="h6" sx={{ px: 2, py: 1 }}>
        Notifications :
      </Typography>
        <CloseIcon onClick={handleCloseNot} sx={{cursor:"pointer"}}/>
      </Box>
  
      <Divider />
      <List sx={{ width: "100%" }}>
        {notifications.length > 0 ? (
        [...notifications].reverse().map((notif) => (
            <MenuItem key={notif._id}  onClick={handleCloseNot} sx={{background:notif.isRead ? "rgba(15, 15, 15, 0)" : "rgba(248, 248, 248, 0.18)",padding:"0"}}>
              <Box onClick={() => {handelGetNot(notif.recipientId , notif.type , notif.postId , notif.commentId);handleCloseNot()}} sx={{padding:"5px 10px",width:"100%"}}> 
              <ListItemText
                primary={notif.content}
                secondary={dayjs(notif.createdAt).fromNow()}
              />
                </Box>
              
            <Link to={`/Profile/${notif.senderId}`} style={{ textDecoration: "none" }}>
             <Box sx={{padding:"5px 10px"}}> 
                <Badge
    overlap="circular"
    badgeContent={renderIcon(notif.type)}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
                 <Avatar src={notif.Not_Photo} sx={{ width: 40, height: 40 }} />
                 </Badge>
                 </Box>
                 </Link>
               
            </MenuItem>
          ))
        ) : (
  Loading ? (
     <ListItem>
        <CircularProgress color="inherit" />
        </ListItem>
  ) : (
    <ListItem>
      <ListItemText primary="No Notifications" />
    </ListItem>
  )
)
}
      </List>
    </Menu>
    <PostRev openPostRev={openPostRev} PostID={PostID} handelclosePostRev={handelclosePostRev}/>
    <CommentsDialog openComments={openComments} commentCreator={commentCreator} commentId={commentId} PostID={PostCommentsID} handlecloseComments={handlecloseComments} />
    </>
  );
}