
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import BaseUrl from './BaseUrl';

export default function LogoutDialog({HandelCloseLogOut , openLogOut}) {
  const [isLoading, setIsLoading] = useState(false);

    const handelLogOut = () => {

      setIsLoading(true)

    axios.post(`${BaseUrl}/logout`, {}, {
      withCredentials: true,
    })
    .then(res => {
      HandelCloseLogOut()
      setIsLoading(false)
      console.log(res.data);
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("UserPFP");
      window.location.reload()
    })
    .catch(err => {
      setIsLoading(false)
      console.log(err);
    toast.success(err.data.message);
    })}


 return (
   <Dialog
  open={openLogOut}
  onClose={HandelCloseLogOut}
  aria-labelledby="logout-dialog-title"
  aria-describedby="logout-dialog-description"
>
  <DialogTitle id="logout-dialog-title">
    {"Are you sure you want to log out?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="logout-dialog-description">
      You will be logged out from your current session. Do you want to continue?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={HandelCloseLogOut} color="primary">
      Cancel
    </Button>
    <Button loading={isLoading} variant='contained' onClick={handelLogOut} color="error" autoFocus>
      log out
    </Button>
  </DialogActions>
</Dialog>

  );
}