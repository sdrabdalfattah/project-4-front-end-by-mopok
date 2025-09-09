import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import BaseUrl from "./BaseUrl";

export default function PostCard({
  open,
  selectedPost,
  handleCloseEdit,
}) {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [newText, setNewText] = useState("");

  const [isLoadingDelete, setisLoadingDelete] = useState(false);
  const [isLoadingEdit, setisLoadingEdit] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setNewText(selectedPost.post_content || "");
    }
  }, [selectedPost]);


  const handleDelete = () => {
    setisLoadingDelete(true)
    axios.delete(`${BaseUrl}/delete-post/${selectedPost._id}`,{ withCredentials: true })
    .then(function (response) {
      console.log(response.data)

       toast.success("post deleted");
       handleCloseEdit()
       setOpenConfirmDelete(false)
    }).catch(function (error) {
      setisLoadingDelete(false)
         toast.error(error.response.data.message);
    })
  };


    const handleEdit = () => {
    setisLoadingEdit(true)

      const reqBody = {
          postId: selectedPost._id,
          newContent: newText
      }

    axios.put(`${BaseUrl}/edit-post`,reqBody,{ withCredentials: true })
    .then(function (response) {
      console.log(response.data)
      setisLoadingEdit(false)
      handleCloseEdit()
      toast.success("post edited");
    }).catch(function (error) {
      setisLoadingEdit(false)
          toast.error(error.response.data.message);
    })
  };

  return (
    <>

      <Dialog open={open} fullWidth='md' onClose={handleCloseEdit}>
        <DialogTitle>Edit or Delete Post</DialogTitle>
        <Divider/>
        <DialogContent>
          <TextField
            fullWidth
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            label="Post Content"
            multiline
          />
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button color="error" variant='outlined' sx={{marginRight:"auto"}} onClick={() => setOpenConfirmDelete(true)}>
            Delete
          </Button>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button loading={isLoadingEdit} variant="contained" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
      fullWidth
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button color="error" loading={isLoadingDelete} variant="contained" onClick={handleDelete}>
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
