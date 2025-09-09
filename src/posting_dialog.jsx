import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SafetyDivider } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import toast from "react-hot-toast";
import BaseUrl from './BaseUrl';




export default function PostingDialog({ openposting, handleCloseposting}) {

  const [imagePreview, setImagePreview] = useState(null);

  const [isLodaing, setisLodaing] = useState(false);


  const [Post, setPost] = useState({
    post_content: '',
    image: null,
  });





const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPost((prev) => ({ ...prev, image: file })); 
  setImagePreview(URL.createObjectURL(file));
};



const handelPost = () => {
const formData = new FormData();
formData.append('post_content', Post.post_content);
formData.append('post_photo', Post.image); 
setisLodaing(true)

  axios.post(`${BaseUrl}/create-post`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then(response => {
    setisLodaing(false)
        toast.success("post created")
    console.log(response.data.savedPost);
    handleCloseposting()
  })
  .catch(error => {
    setisLodaing(false)
        toast.success(error.data.message);
    console.log(error);
  });
};



  return (
    




    <Dialog open={openposting} fullWidth onClose={handleCloseposting}>
           <DialogTitle id="alert-dialog-title">
          {"post your thoughts"}
        </DialogTitle>
        <Divider />
      <DialogContent>
        <Box sx={{ width: "100%" }}>

          <TextField
            label="What's on your mind?"
            multiline
            minRows={3}
            value={Post.post_content}
            onChange={(e) => setPost({ ...Post, post_content: e.target.value })}
            variant="outlined"
            sx={{ width: '100%', marginBottom: "20px"}}
          />


          <Button
            component="label"
            startIcon={<InsertPhotoIcon />}
            sx={{ borderRadius: "50px",display:imagePreview ? "none":"flex", marginBottom: "10px",width: "fit-content" }}
          >
            Add a photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>


          {imagePreview && (
             <Badge
                 onClick={() => {setImagePreview(null);setPost(prev => ({ ...prev, image: null }));}}
                  badgeContent={
                      <CloseIcon
                        style={{
                          color: "white",
                          cursor: "pointer",
                          background: "#292929ff",
                          borderRadius: "50%",
                          padding: "6px"
                        }}
                      />
                  }
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
            <Box
              sx={{
                flexDirection: "column",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
              }}
            >
            

            
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                    borderRadius: "7px",
                  maxWidth: "200px",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: "5px"
                }}
              />
             
                    
            </Box>
             </Badge>
          )}
        </Box>
      </DialogContent>
          <Divider />
      <DialogActions>
        <Button onClick={handleCloseposting}>Cancel</Button>
        <Button loading={isLodaing} onClick={handelPost} autoFocus>
          Post
        </Button>
      </DialogActions>
    </Dialog>





  );
}
