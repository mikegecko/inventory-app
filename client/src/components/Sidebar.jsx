import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";

export default function Sidebar(props) {
    const [alignment, setAlignment] = useState('home');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }



  return (
    <Box sx={{ width: "30%", height: "100%" }}>
      <Paper
        sx={{
          height: "inherit",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        elevation={1}
        square
      >
        
        <Box sx={{  width: "100%" }}>
        <Box sx={{ height: '64px', }}>
            <Typography sx={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}} variant="h4">
                Logo
            </Typography>
        </Box>
          <ToggleButtonGroup
            sx={{ width: "100%", textAlign: 'left' }}
            orientation="vertical"
            exclusive
            value={alignment}
            onChange={handleChange}
            color="primary"
          >
            <ToggleButton value='home'>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem', mt: '4px'}}>
              <HomeIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Home</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='inventory'>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <InventoryIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Inventory</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='tools'>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <HandymanIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Tools</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='settings'>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <SettingsIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Settings</Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            sx={{ height: "2.5rem" }}
            color="primary"
            value={props.colorMode}
            exclusive
            onChange={props.handleModeChange}
          >
            <ToggleButton value="light">
              <LightModeIcon sx={{ mr: 1 }} />
              Light
            </ToggleButton>
            <ToggleButton value="dark">
              <NightsStayIcon sx={{ mr: 1 }} />
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>
    </Box>
  );
}
