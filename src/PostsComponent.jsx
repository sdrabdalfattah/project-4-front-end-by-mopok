
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import relativeTime from "dayjs/plugin/relativeTime";
import IconButton from '@mui/material/IconButton';
import LikeComponent from './LikePost'
import CommentsDialog from './commentsDialog';
import PostRev from './PostRev'
import toast from 'react-hot-toast';
import BaseUrl from './BaseUrl';
import { useTheme } from '@mui/material/styles';

import ExternalFollowButton from './externalFollowBtn';

import dayjs from "dayjs";
dayjs.extend(relativeTime);

export default function Posts() {
const [Posts, setPosts] = useState([])

  const theme = useTheme();

        const [openComments, setopenComments] = useState(false);
    const handlecloseComments = () => {
    setopenComments(false);
  };


          const [openPostRev, setopenPostRev] = useState(false);
    const handelopenPostRev = (ID) => {
    setopenPostRev(true);
      setPostID(ID);
  };
  const handelclosePostRev = () => {
    setopenPostRev(false);
  };

     const [PostID, setPostID] = useState(0);


const [ commentCreator , setcommentCreator ] = useState(0)
const getPostComments = (ID, commentCreatorId) => {
  setPostID(ID);
  setopenComments(true);
  setcommentCreator(commentCreatorId)
  console.log("77",PostID)
}






useEffect(() => {
axios.get(`${BaseUrl}/get_posts`, {withCredentials: true } ).then(response => {

console.log(response.data);
setPosts(response.data);

}).catch(error => {
toast.error(error.response.data.message);
console.log(error);
})
}, []);

return (
<>
{
Posts.map((Post) => (

<Box key={Post._id} sx={{width:"100%",flexShrink:"0",marginTop:"20px",overflow:"hidden", border: "1px rgba(126, 126, 126, 0.34) solid",color: theme.palette.text.primary,background: theme.palette.background.paper,borderRadius:"18px",}}>

<Box sx={{display:"flex",alignItems:"center",justifyContent:"left",padding:"10px 10px"}}>
     <Link to={`/Profile/${Post.userId}`}   style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
    <Avatar sx={{marginRight:"10px",height:"55px",width:"55px"}} src={Post.user.avatar} />
    <Typography sx={{marginRight:"10px"}}>{Post.user.name}</Typography>
    </Link>
    <ExternalFollowButton userId={Post.userId} followedByCurrentUser={Post.followedByCurrentUser}/>
    <Typography sx={{marginLeft:"auto"}}>{dayjs(Post.createdAt).fromNow()}</Typography>
</Box>
<Divider/>

<Typography onClick={()=>{handelopenPostRev(Post._id,Post.user.name)}} sx={{textAlign:"left",cursor:"pointer",padding:"10px"}}>{Post.post_content}</Typography>

<Box onClick={()=>{handelopenPostRev(Post._id,Post.user.name)}}
  sx={{
    position: "relative",
    maxHeight: "300px",
    backgroundColor: "rgba(3, 3, 3, 0.75)",
    overflow: "hidden",
    display: Post.post_photo ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box onClick={()=>{handelopenPostRev(Post._id,Post.user.name)}}
    sx={{
      cursor:"pointer",
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${Post.post_photo})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      filter: "blur(20px) brightness(0.4)",
      zIndex: 0,
    }}
  />

  <Box
    component="img"
    src={Post.post_photo}
    alt=""
    onClick={() => handelopenPostRev(Post._id, Post.user.name)}
    sx={{
      cursor:"pointer",
      height: "350px",
      objectFit: "contain",
      zIndex: 1,
    }}
  />
</Box>


<Divider sx={{marginBlock:"10px"}}/>

<Box sx={{display:"flex",padding:"0px 10px 10px 10px",alignItems:"center",justifyContent:"left"}}>

<IconButton onClick={()=>{getPostComments(Post._id ,Post.user._id )}} sx={{fontSize: 16,borderRadius:"50px",alignItems:"center",display:"flex"}}> {Post.commentsCount} <ModeCommentIcon sx={{marginLeft:"10px"}}/></IconButton>


<Divider orientation="vertical" variant="middle" sx={{marginInline:"10px"}} flexItem />

<LikeComponent PostId={Post._id} likesCount={Post.likesCount} isliked={Post.likedByCurrentUser} />


</Box>

</Box>

))
}
<CommentsDialog openComments={openComments} commentCreator={commentCreator} PostID={PostID} handlecloseComments={handlecloseComments} />
<PostRev openPostRev={openPostRev} PostID={PostID} handelclosePostRev={handelclosePostRev}/>
</>
)

}