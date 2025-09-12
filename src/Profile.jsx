import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import axios from 'axios'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import LogoutDialog from './logOutDialog';
import ImgReview from './imgReview';
import Masonry from '@mui/lab/Masonry'
import EditProDialog from './EditProfile';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeComponent from './LikePost'
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import PostRev from './PostRev'
import CommentsDialog from './commentsDialog';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import toast from "react-hot-toast";
import PostCard from './PostCard';
import LoginERR from './LoginERR';
import BaseUrl from './BaseUrl';
import WelcomeModal from './welcome_modal';

dayjs.extend(relativeTime);

export default function Profile() {

    useEffect(() => {
    const XAfter = localStorage.getItem("X");
    if (XAfter) {
      toast.success("changes committed !");
      localStorage.removeItem("X");
    }
  }, []);

      const [userInfo, setuserInfo] = useState([])
      const [userposts, setuserposts] = useState([])
      const [userpostsCount, setuserpostsCount] = useState(0)

      const [Loading, setLoading] = useState(true)


 const [followed, setfollowed] = useState(false);
        const [count, setCount] = useState(0);

  const [openIMG, setopenIMG] = useState(false); 
  const [img , setImg] = useState(null)
  const handelImgReview = (image) => {
       setImg(image)
       setopenIMG(true)
          }


useEffect(() => {
  if (userInfo) {
    setfollowed(userInfo.isFollowing);
    setCount(userInfo.followersCount);
  }
}, [userInfo]);

     const storedUserId = localStorage.getItem("currentUserId");

           const { userId } = useParams();

      const IsUser =  storedUserId === userId



  useEffect(() => {


    axios.get(`${BaseUrl}/user/${userId}`,{ withCredentials: true })
    .then(function (response) {
    console.log("RRR",response.data);
     console.log(userId , storedUserId);
    setuserInfo(response.data.userinfo)
    setuserposts(response.data.userposts)
    setLoading(false)
      setuserpostsCount(response.data.userpostCount)
  })
  .catch(function (error) {
    console.log(error);
    setLoading(false)
 toast.error(error.response.data.message);
  })

  }, []);


const  HandelFollow = () => {
  console.log(followed,count)

            if (followed) {
        setfollowed(false);
        setCount(count - 1);
      } else {
        setfollowed(true);
        setCount(count + 1);
      }

    axios.post(`${BaseUrl}/follow-user/${userId}`,{},{ withCredentials: true })
    .then(function (response) {

      console.log(response.data.isfollowing)
      if(response.data.isfollowing){toast.success(`now you follow ${userInfo.name}`);}
      
     
    }).catch(function (error) {
      console.log(error);
            LoginERR({ error });
               setfollowed(false);
        setCount(count);
    })
}



         const [openPostRev, setopenPostRev] = useState(false);
    const handelopenPostRev = (ID) => {
    setopenPostRev(true);
      setPostID(ID);
  };
  const handelclosePostRev = () => {
    setopenPostRev(false);
  };


const [openLogOut, setopenLogOut] = useState(false); 
const HandelopenLogOut = () => {
    setopenLogOut(true)
  }
  const HandelCloseLogOut= () => {
    setopenLogOut(false)
  }


  const [openEditPro, setopenEditPro] = useState(false); 
const HandelopenEditPro = () => {
    setopenEditPro(true)
  }
  const HandelCloseEditPro= () => {
    setopenEditPro(false)
  }

        const [openComments, setopenComments] = useState(false);
    const handlecloseComments = () => {
    setopenComments(false);
  };

     const [PostID, setPostID] = useState(0);



const [openEdit, setOpenEdit] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);
const handleOpenEdit = (post) => {
  setSelectedPost(post);
  setOpenEdit(true);
};
const handleCloseEdit = () => {
  setOpenEdit(false);
};






     const [ commentCreator , setcommentCreator ] = useState(0)
  const getPostComments = (ID) => {
  setPostID(ID);
  setcommentCreator(userInfo._id)
  setopenComments(true);
  console.log("77",PostID)
}

return (
<>
<Box sx={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",alignItems:"center"}}>



<Box
  sx={{
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    borderBottom: "1px rgba(126, 126, 126, 0.34) solid",
    display: "flex",
    padding: { xs: "5px 20px", sm: "5px 20px", md: "20px 70px" },
    backgroundColor: "background.paper"
  }}
>
  {Loading ? (
    <>
    <Box sx={{ textAlign: "center", width:"100%",height:"100%" }}>
    <Typography variant="h6">
      loading profile...
    </Typography>
     <LinearProgress sx={{marginTop:"10px"}}/>
    </Box>
    </>
  ) : (
    <>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          marginRight: "auto",
        }}
      >
        <Avatar
          onClick={() => handelImgReview(userInfo.avatar)}
          src={userInfo.avatar}
          alt=""
          sx={{
            height: 120,
            width: 120,
            cursor: "pointer",
            borderRadius: "50%",
            mr: 2,
          }}
        />
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h4">{userInfo.name}</Typography>
          <Typography variant="h6" sx={{ opacity: "60%" }}>
            {userInfo.email}
          </Typography>
          <Typography variant="body2" sx={{ opacity: "40%" }}>
            member since {dayjs(userInfo.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "space-around",
            display: "flex",
            marginBlock: { xs: "10px", sm: "10px", md: "0" },
            width: { xs: "100%", sm: "300px", md: "300px" },
            ml: { xs: 0, sm: 3, md: 7 },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              {userInfo.followingCount}
            </Typography>
            <Typography variant="body2">following</Typography>
          </Box>
                    <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              {count}
            </Typography>
            <Typography variant="body2">followers</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              {userpostsCount}
            </Typography>
            <Typography variant="body2">posts</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          justifyContent: { xs: "center", sm: "center", md: "left" },
          pl: { xs: 0, sm: 0, md: "100px" },
          display: "flex",
          mt: "12px",
          width: "100%",
        }}
      >
        {IsUser ? (
          <Box>
            <Button
              sx={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px", mr: 1 }}
              startIcon={<LogoutIcon />}
              color="error"
              onClick={HandelopenLogOut}
              variant="contained"
            >
              log out
            </Button>
            <Button
              sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
              startIcon={<EditIcon />}
              onClick={HandelopenEditPro}
              variant="contained"
            >
              edit your profile
            </Button>
          </Box>
        ) : (
          <Button
            color={followed ? "inherit" : "primary"}
            sx={{ ml: { xs: "0", sm: "40px", md: "40px" } }}
            onClick={HandelFollow}
            size="large"
            startIcon={followed ? <PersonRemoveIcon /> : <AddIcon />}
            variant="contained"
          >
            {followed ? "unfollow" : "follow"}
          </Button>
        )}
      </Box>
    </>
  )}
        
</Box>



<Box sx={{marginTop:"20px",width:{{ xs: "92%", sm: "90%", md: "80%" }}}}>
<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
  {userposts.map((userpost) => (
    <Box
      key={userpost._id}
      sx={{
        flexShrink: 0,
        overflow: "hidden",
        border: "1px rgba(126, 126, 126, 0.34) solid",
        borderRadius: "18px",
        backgroundColor: "background.paper"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <Typography>{dayjs(userpost.createdAt).fromNow()}</Typography>

        <IconButton
          onClick={() => handleOpenEdit(userpost)}
          sx={{ display: IsUser ? "flex" : "none", marginLeft: "auto" }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Divider />


<Box sx={{ textAlign: "left", padding: "10px" }}>
  <Typography
     onClick={() => handelopenPostRev(userpost._id)}
    sx={{
      display: "-webkit-box",
      cursor:"pointer",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {userpost.post_content}
  </Typography>

</Box>


<Box
  sx={{
    position: "relative",
    maxHeight: "300px",
    overflow: "hidden",
          backgroundColor: "rgba(3, 3, 3, 0.75)",
    display: userpost.post_photo ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${userpost.post_photo})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      filter: "blur(20px) brightness(0.4)",
      zIndex: 0,
    }}
  />

  <Box
    component="img"
    src={userpost.post_photo}
    alt=""
    onClick={() => handelopenPostRev(userpost._id)}
    sx={{
      height: "350px",
      width: "100%",
      objectFit: "contain",
      cursor: "pointer",
      zIndex: 1,
    }}
  />
</Box>
    

      <Divider sx={{ marginBlock: "10px" }} />

      <Box
        sx={{
          display: "flex",
          padding: "0px 10px 10px 10px",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => getPostComments(userpost._id)}
          sx={{
            fontSize: 16,
            borderRadius: "50px",
            alignItems: "center",
            display: "flex",
          }}
        >
          {userpost.commentsCount}
          <ModeCommentIcon sx={{ marginLeft: "10px" }} />
        </IconButton>

        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ marginInline: "10px" }}
          flexItem
        />

        <LikeComponent
          PostId={userpost._id}
          likesCount={userpost.likesCount}
          isliked={userpost.likedByCurrentUser}
        />
      </Box>
    </Box>
  ))}
</Masonry>



</Box>



</Box>
<ImgReview setopenIMG={setopenIMG} IsPhotoProfile={true} img={img} openIMG={openIMG}/>
<LogoutDialog openLogOut={openLogOut} HandelCloseLogOut={HandelCloseLogOut} />
<EditProDialog  userInfo={userInfo}  openEditPro={openEditPro} HandelCloseEditPro={HandelCloseEditPro} />
<CommentsDialog commentCreator={commentCreator} openComments={openComments} PostID={PostID} handlecloseComments={handlecloseComments} />
<PostRev openPostRev={openPostRev} PostID={PostID} handelclosePostRev={handelclosePostRev}/>
<PostCard handleCloseEdit={handleCloseEdit} selectedPost={selectedPost} open={openEdit}/>
 <WelcomeModal />

</>
)


}
