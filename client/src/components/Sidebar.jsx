import {
  Box,
  Divider,
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
import logoUrl from '../assets/inv_clear.png';
export default function Sidebar(props) {
    

    



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
            <Typography sx={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '22px'}} variant="p">
              Inventory Manager
            </Typography>
        </Box>
        <Divider/>
          <ToggleButtonGroup
            sx={{ width: "90%", textAlign: 'left', border: 0 }}
            orientation="vertical"
            exclusive
            value={props.page}
            onChange={props.handlePageChange}
            color="primary"
          >
            <ToggleButton value='home' sx={{border: 0}}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem', mt: '4px'}}>
              <HomeIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Home</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='inventory' sx={{border: 0}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <InventoryIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Inventory</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='tools' sx={{border: 0}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <HandymanIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Tools</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value='settings' sx={{border: 0}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: '1rem'}}>
              <SettingsIcon color="primary" />
              <Typography sx={{ mt: 0.5 }}>Settings</Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={2} sx={{padding: '.5rem', width: 'auto'}}>
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
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}
