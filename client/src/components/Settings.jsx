import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Settings(props) {
  /*
        Display the following:
        1. Account info
        2. Light/dark mode?
        3. Login
        4. Token info?
    */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmit = (e) => {
    console.log(username,password);
    props.handleLogin(username,password);
    clearLoginInfo();
    return;
  }

  const clearLoginInfo = (e) => {
    setUsername('');
    setPassword('');
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        width: "calc(100% - 2rem)",
        height: "calc(100% - 2rem - 64px)",
      }}
    >
      <Paper elevation={2}>
        <Typography variant="h4">Settings</Typography>
        <Divider />
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              Username:
            </Typography>
            <TextField onChange={handleUsernameChange} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              Password:
            </Typography>
            <TextField onChange={handlePasswordChange} />
          </Box>
        </Box>
        <Button variant="contained" sx={{ margin: "1rem 0rem 1rem 0rem" }} onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}
