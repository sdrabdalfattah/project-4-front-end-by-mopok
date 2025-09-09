
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect ,useState } from 'react';
import toast from 'react-hot-toast';
import BaseUrl from './BaseUrl';


export default function EditProDialog({HandelCloseEditPro , openEditPro,userInfo}) {


  const [imagePreview, setImagePreview] = useState(userInfo.avatar);
    const [NEwName, setINEwName] = useState(userInfo.name);
    const [imageFile,setimageFile] = useState(null)
    const [isLoadingEdit, setisLoadingEdit] = useState(false);



useEffect(() => {
    setImagePreview(userInfo.avatar);
    setINEwName(userInfo.name);
}, [userInfo, openEditPro]);

const ChangePFP = (e) => {
      const file = e.target.files[0];
  if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setimageFile(file)
}



    const handelEdit = () => {

      setisLoadingEdit(true)
    
        const formData = new FormData();
        formData.append('NEwName', NEwName);
        formData.append('NewImage', imageFile); 
        formData.append('OldImage', userInfo.avatar); 

        console.log(formData)

axios.put(`${BaseUrl}/edit-Profile`,formData,{ withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }})  .then(response => {
      setisLoadingEdit(false)
    console.log(response.data);
localStorage.setItem("X", "done");
window.location.reload()
  })
  .catch(error => {
    setisLoadingEdit(false)
    toast.error(error.response.data.message);
    console.log(error);
  });

    }


 return (
   <Dialog
   fullWidth
  open={openEditPro}
  onClose={HandelCloseEditPro}
  aria-labelledby="logout-dialog-title"
  aria-describedby="logout-dialog-description"
>
  <DialogTitle id="logout-dialog-title">
    {"Edit Your Profile"}
  </DialogTitle>
  <DialogContent dividers sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>


<Box sx={{marginBottom:"10px"}}>
  <Badge
    overlap="circular"
    badgeContent={
      <label htmlFor="upload-image">
        <EditIcon
          style={{
            cursor: "pointer",
            background: "#292929ff",
            color: "white",
            borderRadius: "50%",
            transform: "scale(1.3)",
            padding: "6px"
          }}
        />
      </label>
    }
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
    <input
      id="upload-image"
      type="file"
      hidden
      accept="image/*"
      onChange={ChangePFP}
    />
    <Avatar
      sx={{ width: 140, height: 140}}
      src={imagePreview}
    />
  </Badge>
</Box>



<Box sx={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%",gap:"15px"}}>

 <TextField
 fullWidth
          required
          id="outlined-required"
          label="name"
           onChange={(e) => setINEwName( e.target.value )}
          defaultValue={NEwName}
        />

              <TextField
              fullWidth
          disabled
          id="outlined-disabled"
          label="gmail"
          helperText="cant change gmail"
            defaultValue={userInfo.email}
        />

        </Box>

  </DialogContent>
  <DialogActions>
    <Button onClick={HandelCloseEditPro} color="primary">
      Cancel
    </Button>
    <Button variant='contained' loading={isLoadingEdit} onClick={handelEdit} color="primary" autoFocus>
      commit changes
    </Button>
  </DialogActions>
</Dialog>

  );
}