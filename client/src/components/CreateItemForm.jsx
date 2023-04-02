import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

export default function CreateItemForm(props) {


    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Create a new item
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Test content
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}