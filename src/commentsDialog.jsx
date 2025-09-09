import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress';
import WallpaperIcon from '@mui/icons-material/Wallpaper';;
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ImgReview from './imgReview';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteComment from './deleteComment';
import Chip from '@mui/material/Chip';
import useMediaQuery from "@mui/material/useMediaQuery";
import toast from "react-hot-toast";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

import LoginERR from "./LoginERR";
import BaseUrl from './BaseUrl';
import ImageIcon from '@mui/icons-material/Image';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';




export default function CommentsDialog({ openComments,PostID,handlecloseComments,commentId,commentCreator }) {

 const theme = useTheme();


  const [Loading , setLoading] = useState(false);
  const [comment_content , setComment_content] = useState("");
  const [comments, setComments ] = useState([])
  const [commentCount, setcommentCount ] = useState(0)
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile,setimageFile] = useState(null)
  const currentUserId = localStorage.getItem("currentUserId")
  const [isFetched,setisFetched] = useState(true)

  const [openIMG, setopenIMG] = useState(false); 
  const [img , setImg] = useState(null)
  const handelImgReview = (image) => {
       setImg(image)
       setopenIMG(true)
          }

const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



  const [openDeleteComment, setOpenDeleteComment] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [CommentImage , setCommentImage] = useState(null);

  const handleOpenDeleteComment = (commentId , commentImg) => {
    setSelectedCommentId(commentId);
    setCommentImage(commentImg)
    setOpenDeleteComment(true);
  };

  const handleCloseDeleteComment = () => {
    setOpenDeleteComment(false);
    setSelectedCommentId(null);
  };



  const fetchComments = () => {
  axios
    .get(`${BaseUrl}/get-post-comments/${PostID}`, { withCredentials: true })
    .then(response => {
      setisFetched(false)
      setComments(response.data.comments);
      setcommentCount(response.data.count);
    })
    .catch(error => {
      setisFetched(false)
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    });
};




useEffect(() => {
  if (openComments) {
    fetchComments();
  }
}, [PostID, openComments]);




const handelImagePreview = (e) => {
      const file = e.target.files[0];
  if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setimageFile(file)
}


const LikeComment = (commentId) => {

  const prevComments = comments;

  setComments(prevComments =>
    prevComments.map(comment =>
      comment._id === commentId
        ? {
            ...comment,
            isLiked: !comment.isLiked,
            likesCount: comment.isLiked
              ? comment.likesCount - 1
              : comment.likesCount + 1
          }
        : comment
    )
  );

  axios.post(`${BaseUrl}/like-comment/${commentId}`, {}, { withCredentials: true })
    .then(function (response) {
 
    })
    .catch(function (error) {

      setComments(prevComments);
      LoginERR({ error });
    });
};



const handelAddComment = () => {
   const formData = new FormData();
        formData.append('comment_content', comment_content);
        formData.append('postId', PostID); 
        formData.append('Comment_Img', imageFile); 
        setLoading(true)
  axios.post(`${BaseUrl}/create_comment`,formData, {
    withCredentials: true
  })
  .then(response => {
      setLoading(false)
    console.log(response.data);
    setComment_content("")
    setImagePreview("")
    fetchComments()
    toast.success("Comment created successfully!");
  })
  .catch(error => {
      setLoading(false)
      LoginERR({ error });
    console.log(error);
  });
}

const UserPFP = localStorage.getItem("UserPFP")
  console.log(commentId)

console.log("sdfsdf",comments , PostID)
  return (


    <Dialog open={openComments} onClose={handlecloseComments} maxWidth="sm" fullScreen={isSmallScreen} fullWidth>
<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent: "space-between", }}>
      <DialogTitle>Comments : {commentCount}</DialogTitle>
      <CloseIcon    onClick={ () => { handlecloseComments();setComments([]);setisFetched(true) }} sx={{marginRight:"20px",cursor:"pointer"}}/>
      </Box>
      <Divider />


<DialogContent sx={{ maxHeight: "500px", padding: "0 10px", overflowY: "auto" }}>
  {openComments && (
    <>
      {comments.length === 0 ? (
        isFetched ? (
          <LinearProgress />
        ) : (
          <Box sx={{ padding: "10px", textAlign: "center", opacity: 0.6 }}>
            No comments yet
          </Box>
        )
      ) : (
        comments.map((Comment) => (
          <Box key={Comment._id}>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
              <Link
                to={`/Profile/${Comment.user._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 30, sm: 40, md: 40 },
                    height: { xs: 30, sm: 40, md: 40 },
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                  src={Comment.user.avatar}
                  alt=""
                />
                <Typography sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                  {Comment.user.name}
                </Typography>
              </Link>

              <Chip
                icon={<AutoAwesomeIcon />}
                color="primary"
                sx={{
                  marginLeft: "10px",
                  display: commentCreator === Comment.user._id ? "flex" : "none",
                }}
                size="small"
                label="creator"
                variant="outlined"
              />

              <Chip
                icon={<NotificationsIcon />}
                color="success"
                sx={{
                  marginLeft: "10px",
                  display: commentId === Comment._id ? "flex" : "none",
                }}
                size="small"
                label="notification"
                variant="outlined"
              />

              <Typography
                sx={{
                  opacity: "60%",
                  marginLeft: "10px",
                  marginTop: "4px",
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  fontWeight: "200",
                }}
              >
                {dayjs(Comment.createdAt).fromNow()}
              </Typography>

              <IconButton
                onClick={() =>
                  handleOpenDeleteComment(Comment._id, Comment.comment_photo)
                }
                sx={{
                  marginLeft: "10px",
                  display: currentUserId === Comment.user._id ? "flex" : "none",
                }}
                color="default"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>

              <IconButton
                sx={{
                  marginLeft: "auto",
                  fontSize: 16,
                  borderRadius: "50px",
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={() => LikeComment(Comment._id)}
              >
                {Comment.likesCount}
                {Comment.isLiked ? (
                  <FavoriteIcon sx={{ ml: 0.5, color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ ml: 0.5 }} />
                )}
              </IconButton>
            </Box>

            <Typography sx={{ marginLeft: "45px" }}>
              {Comment.content}
            </Typography>

            {Comment.comment_photo && (
              <Box
                component="img"
                onClick={() => handelImgReview(Comment.comment_photo)}
                src={Comment.comment_photo}
                sx={{
                  maxHeight: { xs: "95px", sm: "115px", md: "115px" },
                  cursor: "pointer",
                  marginLeft: "45px",
                  borderRadius: "7px",
                }}
                alt=""
              />
            )}
          </Box>
        ))
      )}
    </>
  )}
</DialogContent>




      <Divider sx={{marginTop:"auto"}} />
<Box sx={{margin:"15px 0px 0px 30px",display:imagePreview ? "flex":"none"}}>
  <Badge
    onClick={() => {setImagePreview("")}}
    badgeContent={
        <CloseIcon
          style={{
            cursor: "pointer",
            background: "#292929ff",
            borderRadius: "50%",
            color: "white",
            padding: "6px"
          }}
        />
    }
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
        <img style={{maxHeight:"100px",borderRadius:"10px"}} src={imagePreview} alt="" />
</Badge>
</Box>

    <Box sx={{ display: "flex", p: 2, gap: 1, alignItems: "center", flexDirection:{ xs: "column", sm: "row", md: "row" }}}>
      <Box sx={{display:"flex" ,width: "100%"}}>
  <Avatar src={UserPFP} sx={{ width: 40, height: 40,marginRight:"5px", display:{ xs: "none", sm: "flex", md: "flex" }}} />
  <TextField
    sx={{ width: "100%", background: "transparent" }}
    InputProps={{
      sx: {
        zIndex: "1",
        borderRadius: "50px",
      },
    }}
    fullWidth
    placeholder="Write a comment..."
    value={comment_content}
    onChange={(e) => setComment_content(e.target.value)}
    variant="outlined"
    size="small"
  />
  </Box>
  <Box sx={{display:"flex",marginRight:"auto"}}>
    <Avatar src={UserPFP} sx={{ width: 40, height: 40,marginRight:"5px" ,display:{ xs: "flex", sm: "none", md: "none" }}} />
  <input
    type="file"
    accept="image/*"
    id="upload-image"
    style={{ display: "none" }}
    onChange={handelImagePreview}
  />
  <label htmlFor="upload-image">
    <Button  sx={{marginRight:"7px",height:"40px",width:"40px"}} variant='outlined' component="span">
      <ImageIcon/>
    </Button>
  </label>
  <Button loading={Loading} disabled={comment_content.trim() === "" && !imagePreview}  onClick={handelAddComment} variant="contained">
    <SendIcon />
  </Button>
  </Box>
</Box>
<ImgReview setopenIMG={setopenIMG} img={img} openIMG={openIMG}/>
<DeleteComment fetchComments={fetchComments} handleCloseDeleteComment={handleCloseDeleteComment} CommentImage={CommentImage} selectedCommentId={selectedCommentId} openDeleteComment={openDeleteComment} />
    </Dialog>

    
  );
}

