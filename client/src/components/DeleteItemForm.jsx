import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

export default function DeleteItemForm(props) {
  const submitDelete = (e) => {};

  const dialogActive = () => {
    return (
      <DialogContent
        sx={{
          margin: ".5rem",
          padding: ".5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
        <Box>
          <TextField
            id="del-item-name"
            disabled
            label="Item Name"
            value={
              props.selectedItem.title ? props.selectedItem.title : "No Name"
            }
            sx={{ mr: 2 }}
          />
          <TextField id="del-item-category" disabled label="Category" value={
              props.selectedItem.category ? props.selectedItem.category : "No Category"
            } />
        </Box>
        <TextField id="del-item-desc" disabled label="Description" value={
              props.selectedItem.description ? props.selectedItem.description : "No Description"
            }/>
        <Box>
          <TextField
            id="del-item-price"
            disabled
            label="Price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={
                props.selectedItem.price ? props.selectedItem.price : "No Price"
              }
            sx={{ mr: 2 }}
          />
          <TextField
            id="del-item-qty"
            disabled
            label="Quantity"
            type="number"
            value={
                props.selectedItem.quantity ? props.selectedItem.quantity: "No Quantity"
              }
          />
        </Box>
      </DialogContent>
    );
  };

  const dialogInactive = () => {
    return (
      <DialogContent
        sx={{
          margin: ".5rem",
          padding: ".5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <DialogContentText>
          No Item Selected!
        </DialogContentText>
        
      </DialogContent>
    );
  };

  useEffect(() => {
    if (props.selectedItem !== undefined) {
    }
  }, []);

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Delete Item</DialogTitle>
      {props.selectedItem ? dialogActive() : dialogInactive()}
      <DialogActions>
        <Button onClick={submitDelete}>Submit</Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
