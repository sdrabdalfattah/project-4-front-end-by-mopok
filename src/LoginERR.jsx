
import toast from "react-hot-toast";
import { Fab, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import BaseUrl from "./BaseUrl";

export default function LoginERR({ error }) {
  if (error?.response?.data?.message === "NO_TKN") {
    toast(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Fab
          sx={{ flexShrink: 0, padding: "5px 10px" }}
          onClick={() => {
            window.location.href = `${BaseUrl}/auth/google`;
          }}
          color='default'
          variant="extended"
          size="small"
        >
          <GoogleIcon sx={{ mr: 1 }} />
          Login
        </Fab>
        <Typography sx={{ flexShrink: 0 }}>
          You need to login first
        </Typography>
      </div>
    );
  }

  return null;
}
