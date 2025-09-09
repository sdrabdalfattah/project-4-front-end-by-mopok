
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import toast from "react-hot-toast";
import { useEffect,useState } from 'react';
import BaseUrl from './BaseUrl';

export default function DeleteComment({handleCloseDeleteComment,fetchComments ,selectedCommentId,CommentImage, openDeleteComment}) {


  const [isLoadingDelete, setIsLoadingDelete] = useState(false);


  const handleDelete = () => {
    setIsLoadingDelete(true)
    axios
      .delete(`${BaseUrl}/delete-comment`, {
        data: { commentId: selectedCommentId, commentImage: CommentImage },
        withCredentials: true,
      })
      .then((res) => {
        fetchComments()
        setIsLoadingDelete(false)
        console.log(res.data);
        handleCloseDeleteComment(); 
        toast.success("Comment deleted successfully!");
      })
      .catch((err) => {
        setIsLoadingDelete(false)
            toast.success(err.data.message);
        console.error("Error deleting comment:", err);
      });
  };

 return (
   <Dialog
  open={openDeleteComment}
  onClose={handleCloseDeleteComment}
  aria-labelledby="logout-dialog-title"
  aria-describedby="logout-dialog-description"
>
  <DialogTitle id="logout-dialog-title">
    {"Are you sure you want to log out?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="logout-dialog-description">
      You will delete this comment
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteComment} color="primary">
      Cancel
    </Button>
    <Button loading={isLoadingDelete} variant='contained' onClick={handleDelete} color="error" autoFocus>
      delete
    </Button>
  </DialogActions>
</Dialog>

  );
}