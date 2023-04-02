import { Box, Paper, Typography } from "@mui/material";


export default function Settings() {


    return(
        <Box sx={{display: 'flex', flexDirection: 'column', margin: '1rem', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem - 64px)'}}>
           <Paper elevation={2}>
            <Typography variant="h4">Settings</Typography>
           </Paper>
        </Box>
    )
}