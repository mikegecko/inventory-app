import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  InputBase,
  Paper,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logoUrl from "../assets/inv_clear.png";
export default function Header(props) {
  
  const pageToString = () => {
    switch (props.page) {
      case 'home':
        return("Home");
      case 'inventory':
      return("Inventory");
      case 'detail':
        return('Inventory');
      case 'settings':
        return('Settings');
      case 'tools':
        return('Tools');
      default:
        return('Home');
    }
  }

  if (props.mobileView) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >{pageToString()}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img className="logo" src={logoUrl} alt="Inventory Manager Logo" />
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
