import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import './App.css';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ExternalFollowButton from './externalFollowBtn';
import Avatar from '@mui/material/Avatar';
import ImgReview from './imgReview';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CommentsDialog from './commentsDialog';
import LikeComponent from './LikePost'
import toast from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';
import BaseUrl from './BaseUrl';

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);


export default function PostRev({ openPostRev, handelclosePostRev, PostID }) {
  const [post, setPost] = useState(null);




  useEffect(() => {
    if (openPostRev && PostID) {
      axios
        .get(`${BaseUrl}/get-Post/${PostID}`, {withCredentials: true })
        .then((response) => {
          console.log(response.data.post[0]);
          setPost(response.data.post[0]);
        })
        .catch((error) => {
          console.log(error);
              toast.success(error.data.message);
        });
    }
  }, [openPostRev, PostID]);



    const [openIMG, setopenIMG] = useState(false); 
  const [img , setImg] = useState(null)
  const handelImgReview = (image) => {
       setImg(image)
       setopenIMG(true)
          }


                 const [openComments, setopenComments] = useState(false);
    const handlecloseComments = () => {
    setopenComments(false);
  };


          const [ commentCreator , setcommentCreator ] = useState(0)
const getPostComments = () => {
  setopenComments(true);
  setcommentCreator(post.user._id)
  console.log("77",PostID)
}

  return (
    <Dialog
      open={openPostRev}
      onClose={()=> {handelclosePostRev();setPost(null)}}
      maxWidth="md"
      fullWidth
    >
      <Box
        sx={{
          display: "flex",
          flexDirection:"row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle>post</DialogTitle>
        <CloseIcon
          onClick={()=> {handelclosePostRev();setPost(null)}}
          sx={{ marginRight: "20px", cursor: "pointer" }}
        />
      </Box>

      <Divider />
      {openPostRev && post ? (
        <DialogContent sx={{ overflow: "hidden",padding:"0" }}>
          <Box
            sx={{
      
              height:"550px",
              display: "flex",
              width : "100%",
              flexDirection: { xs: "column", sm: "row", md: "row"},
            }}
          >
            <Box
              sx={{
     
                display: "flex",
                flexDirection: "column",
                minWidth:{ xs: "100%", sm: "300px", md: "300px"},
                width: post.post_photo ? "" : "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  borderRadius: 0,
                  padding: "5px 0px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                 <Link to={`/Profile/${post.user._id}`}   style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ height: "55px", marginInline: "10px", width: "55px" }}
                  src={post.user.avatar}
                  alt=""
                />
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                      <Link to={`/Profile/${post.user._id}`}   style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                    <Typography sx={{ marginLeft: "5px" }} variant="h5">
                      {post.user.name}
                    </Typography>
                    </Link>
                    <ExternalFollowButton userId={post.user._id} followedByCurrentUser={post.followedByCurrentUser} />
                  </Box>
                  <Typography
                    sx={{ marginRight: "auto", marginLeft: "5px" }}
                  >
                   {dayjs(post.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ padding: "10px 15px" }}>
                {post.post_content}
              </Typography>

              <Divider sx={{ marginTop: "auto" }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  width:"100%",
                  padding: "5px 0px",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <IconButton
                onClick={() => { getPostComments()}}
                  sx={{
                    fontSize: 16,
                    borderRadius: "50px",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {post.commentsCount}
                  <ModeCommentIcon  sx={{ marginLeft: "10px" }} />
                </IconButton>
                <LikeComponent  PostId={post._id} likesCount={post.likesCount} isliked={post.likedByCurrentUser} />
              </Box>
              <Divider />
            </Box>

<Box
  sx={{
    display: post.post_photo ? "flex" : "none",
    width: { xs: "100%", sm: "500px", md: "600px" },
    justifyContent: "center",
    backgroundColor: "rgba(3, 3, 3, 0.75)",
    alignItems: "center",
    position: "relative",
    maxHeight: { xs: 300, sm: 500, md: 600 },
    overflow: "hidden",
    borderRadius: "0",
  }}
>

  <Box
    sx={{
      position: "absolute",
      inset: 0, 
      borderRadius: "0",
      backgroundImage: `url(${post.post_photo})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      filter: "blur(20px) brightness(0.4)", 
      zIndex: 0,
    }}
  />

  <Box
    component="img"
    src={post.post_photo}
    alt=""
    onClick={() => handelImgReview(post.post_photo)}
    sx={{
      borderRadius: "0",
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      cursor: "pointer",
      zIndex: 1,
    }}
  />
</Box>


          </Box>
        </DialogContent>
      ) : <LinearProgress />}
      <ImgReview setopenIMG={setopenIMG} img={img} openIMG={openIMG}/>
      <CommentsDialog openComments={openComments} commentCreator={commentCreator} PostID={PostID} handlecloseComments={handlecloseComments} />
    </Dialog>
  );
}
