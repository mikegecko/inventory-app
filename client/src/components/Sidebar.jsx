import { Box, Paper } from "@mui/material";


export default function Sidebar(){
    

    return(
        <Box sx={{width: '30%', height: '100%'}}>
            <Paper  sx={{height: 'inherit'}} elevation={1} square>
                Sidebar
            </Paper>
        </Box>
    )
}