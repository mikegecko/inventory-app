import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import axios from "axios";

export default function CreateItemForm(props) {


    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Add new item
            </DialogTitle>
            <DialogContent sx={{margin: '.5rem', padding: '.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DialogContentText>
                    
                </DialogContentText>
                <Box>
                <TextField required label="Item Name" sx={{mr: 2}}/>
                <TextField label="Category"/>
                </Box>
                <TextField label="Description"/>
                <Box>
                <TextField required label="Price" sx={{mr: 2}}/>
                <TextField required label="Quantity" type="number"/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}