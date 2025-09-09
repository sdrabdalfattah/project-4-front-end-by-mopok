
import { useState } from "react";
import { Box, Button, Fab,Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import toast from "react-hot-toast";
import LoginERR from "./LoginERR";
import BaseUrl from "./BaseUrl";

export default function ExternalFollowButton({ userId, followedByCurrentUser }) {
  const currentUserId = localStorage.getItem("currentUserId");
  const [isFollow, setIsFollow] = useState(false);


  const [Loading, setLoading] = useState(false);


  const handelFollowUser = (targetUserId) => {
    setLoading(true);
    axios
      .post(
        `${BaseUrl}/follow-user/${targetUserId}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        toast.success("now you follow this user");
        setIsFollow(true);
      })
      .catch((error) => {
        setLoading(false);
if (error.response.data.message === "NO_TKN") {

  LoginERR({ error });
}

      });
  };


  return (
    <Box>
      {userId !== currentUserId &&
        !followedByCurrentUser &&
        (isFollow ? null : (
          <Button loading={Loading} onClick={() => handelFollowUser(userId)}>Follow</Button>
        ))}
    </Box>
  );
}
