import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { keyframes } from "@mui/system";
import axios from 'axios';
import { useState } from 'react';
import LoginERR from "./LoginERR";
import BaseUrl from './BaseUrl';

const heartAnimation = keyframes`
    0% {
    transform: scale(0.6);
    opacity: 0.7;
    filter: drop-shadow(0 0 0px red);
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
    filter: drop-shadow(0 0 20px red);
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0px red);
  }
`;


export default function LikeComponent({ PostId, likesCount, isliked }) {
  const [liked, setLiked] = useState(isliked);
  const [count, setCount] = useState(likesCount);
  const [animation, setAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LikePost = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BaseUrl}/like/${PostId}`,
        {},
        { withCredentials: true }
      );

      console.log(response.data);

      // هنا نعكس الحالة
      if (!liked) {
        setLiked(true);
        setCount((prev) => prev + 1);
        setAnimation(true);
      } else {
        setLiked(false);
        setCount((prev) => Math.max(prev - 1, 0));
        setAnimation(false);
      }

      setIsLoading(false);
    } catch (error) {
      LoginERR({ error });
      setIsLoading(false);
    }
  };

  return (
    <IconButton
      disabled={isLoading}
      sx={{
        fontSize: 16,
        borderRadius: "50px",
        alignItems: "center",
        display: "flex",
      }}
      onClick={LikePost}
    >
      {count}
      {liked ? (
        <FavoriteIcon
          sx={{
            ml: 0.5,
            fontSize: 24,
            color: "red",
            borderRadius: "50px",
            animation: animation ? `${heartAnimation} 0.6s ease` : "none",
          }}
          onAnimationEnd={() => setAnimation(false)} 
        />
      ) : (
        <FavoriteBorderIcon sx={{ ml: 0.5, fontSize: 24 }} />
      )}
    </IconButton>
  );
}
