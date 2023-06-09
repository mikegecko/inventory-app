import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Settings(props) {
  /*
        Display the following:
        1. Account info
        2. Light/dark mode?
        3. Login
        4. Token info?
    */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tempToken, setTempToken] = useState('');

  const handleRemoveAuth = (e) => {
    //console.log('Removed auth token');
    localStorage.removeItem("token");
    setTempToken('');
    props.setStateOfSnacks(true, 'Logged Out', 'info');
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    //console.log(username, password);
    e.preventDefault();
    props.handleLogin(username, password);
    clearLoginInfo();
    return;
  };

  const clearLoginInfo = (e) => {
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    setTempToken(localStorage.getItem('token'));
  },[])
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
        <form onSubmit={handleSubmit}>
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
            <TextField autoComplete="username" type="text" value={username} onChange={handleUsernameChange} />
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
            <TextField autoComplete="current-password" type="password" value={password} onChange={handlePasswordChange} />
          </Box>
          
        </Box>
        <Box sx={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
        <Button
          variant="contained"
          sx={{ margin: "1rem 0rem 1rem 0rem" }}
          type="submit"
        >
          Login
        </Button>
        <Button
          variant="text"
          sx={{ margin: "1rem 0rem 1rem 0rem" }}
          onClick={handleRemoveAuth}
          disabled={!tempToken}
        >
          Logout
        </Button>
        </Box>
        </form>
      </Paper>
    </Box>
  );
}
