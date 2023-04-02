import { Box, Paper, Typography } from "@mui/material";


export default function Tools() {

    /*
        Display the following:
        1.

    */

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', margin: '1rem', width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem - 64px)'}}>
           <Paper elevation={2}>
            <Typography variant="h4">Tools</Typography>
           </Paper>
        </Box>
    )
}