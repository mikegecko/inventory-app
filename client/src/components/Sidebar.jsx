import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
export default function Sidebar(props){
    
    

    return(
        <Box sx={{width: '30%', height: '100%',}}>
            <Paper  sx={{height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} elevation={1} square>
                <Box>
                    Sidebar
                </Box>
                <Box sx={{mb: 2}}>
                    <ToggleButtonGroup sx={{height: '2.5rem'}} color="primary" value={props.colorMode} exclusive onChange={props.handleModeChange}>
                        <ToggleButton value='light'><LightModeIcon sx={{mr: 1}} />Light</ToggleButton>
                        <ToggleButton value='dark'><NightsStayIcon sx={{ mr: 1}} />Dark</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Paper>
        </Box>
    )
}