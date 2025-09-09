import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Box,
  Link
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import BaseUrl from './BaseUrl';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function WelcomeModal() {
  const theme = useTheme();

  const [isShown, setIsShown] = useState(() => {
    return sessionStorage.getItem('welcomeShown') === 'true';
  });

  const [serverawake, setserverawake] = useState(false);
  const [open, setopen] = useState(true);

  useEffect(() => {
    axios
      .delete(`${BaseUrl}/delete-post/`, { withCredentials: true })
      .then(() => {
        setserverawake(true);
      })
      .catch(() => {
        setserverawake(true); 
      });
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('welcomeShown', 'true');
    setIsShown(true);
    setopen(false);
  };
  if (isShown) return null;





  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ backdropFilter: 'blur(20px)' }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          alignItems: 'center',
          display: 'flex',
          gap: '10px',
        }}
      >
        <InfoOutlineIcon /> Notice
      </DialogTitle>

<DialogContent
  sx={{
    maxHeight: '450px',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  }}
  dividers
>
  <Typography variant="body1" gutterBottom>
    Welcome to <strong>Mini Social Platform</strong>, a modern social media
    experience designed with the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js).
  </Typography>

  <Typography variant="h6" gutterBottom>Core Features</Typography>
  <ul>
    <li> User authentication (Login / Register)</li>
    <li> Create and share posts (text, images, media)</li>
    <li> Comments and likes on posts</li>
    <li> Notifications for interactions</li>
    <li> Profile pages with user details</li>
  </ul>

  <Typography variant="h6" gutterBottom>Technology Stack</Typography>
  <ul>
    <li><strong>Frontend:</strong> React + Material UI</li>
    <li><strong>Backend:</strong> Node.js + Express</li>
    <li><strong>Database:</strong> MongoDB Atlas</li>
    <li><strong>Hosting:</strong> Vercel (frontend), Render (backend)</li>
  </ul>

  <Typography variant="h6" gutterBottom>Important Note</Typography>
  <Typography
    sx={{
      display: "flex",
      borderRadius: "8px",
      marginBlock: "15px",
      padding: "5px 10px",
      border: `1px solid ${theme.palette.warning.main}`,
      bgcolor:
        theme.palette.mode === "dark"
          ? "rgba(255, 165, 0, 0.15)"
          : "rgba(255, 218, 149, 0.28)",
      color: theme.palette.text.primary,
      fontSize: "15px",
    }}
    gutterBottom
  >
    <InfoOutlineIcon
      sx={{
        color:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 136, 0, 1)",
        alignSelf: "center",
        marginBottom: "4px",
        marginRight: "10px",
        fontSize: "20px",
      }}
    />    
    Please do not enter real passwords or sensitive data. This platform is for testing and demonstration purposes only.
  </Typography>

  <Typography variant="h6" gutterBottom>About the Author</Typography>
  <Typography gutterBottom>
    Developed by <strong>Mopok DH</strong> – MERN Stack Developer.
  </Typography>

    <Typography variant="body1" gutterBottom>
    * More projects on&nbsp;
    <Link
      href="https://www.linkedin.com/in/mopok-dh-75415a34a/"
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
    >
      LinkedIn
    </Link>
    </Typography>
</DialogContent>



      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Box
          sx={{
            height: { xs: 'auto', sm: '40px' },
            bgcolor: theme.palette.background.default,
            p: 2,
            gap: '10px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            width: '100%',
            color: theme.palette.text.primary,
          }}
        >
          {serverawake ? (
            <>
              <CheckCircleIcon sx={{ color: 'rgba(6, 182, 0, 1)' }} />
              <span>Server is ready</span>
            </>
          ) : (
            <>
              <CircularProgress size="23px" sx={{ flexShrink: 0 }} />
              <Typography sx={{ ml: 1 }}>Starting server... this may take a few seconds</Typography>
            </>
          )}
        </Box>

        <Button
          disabled={!serverawake}
          onClick={handleClose}
          variant="contained"
        >
          ok
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
