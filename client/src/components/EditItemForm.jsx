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
import { useEffect, useState } from "react";

export default function EditItemForm(props) {
  const itemStruct = {
    title: null,
    description: "",
    category: "",
    quantity: null,
    price: null,
    added: "",
    updated: "",
    image: "",
  };

  const [item, setItem] = useState(itemStruct);
  const [errors, setErrors] = useState({});

  const handleItemUpdate = (e) => {
    const value = e.target.value;
    switch (e.target.id) {
      case "edit-item-name":
        setItem({ ...item, title: value });
        break;
      case "edit-item-category":
        setItem({ ...item, category: value });
        break;
      case "edit-item-desc":
        setItem({ ...item, description: value });
        break;
      case "edit-item-price":
        setItem({ ...item, price: value });
        break;
      case "edit-item-qty":
        setItem({ ...item, quantity: value });
        break;

      default:
        break;
    }
  };

  const checkValidFields = (event) => {
    let errors = {};
    if (item.title === null || item.title === "") {
      errors.name = true;
    }
    if (item.quantity === "" || item.quantity === null) {
      errors.quantity = true;
    }
    if (item.price === "" || item.price === null) {
      errors.price = true;
    }
    setErrors({ ...errors });
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const subItem = { ...item, updated: new Date() }; //Add updated here since state updates are async
      props.handleUpdateItemSubmit(item);
      handleClear(event);
    }
  };
  const handleClear = (e) => {
    //Change this
    //setItem(itemStruct); 
    setErrors({});
    props.handleClose(e);
  };

  useEffect(() => {
    setItem({...props.selectedItem});
  }, [props.selectedItem])
  useEffect(() => {
    //console.log(item);
  },[item])
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
        <DialogContentText></DialogContentText>
        <Box>
          <TextField
            id="edit-item-name"
            onChange={handleItemUpdate}
            error={errors.name}
            required
            label="Item Name"
            sx={{ mr: 2 }}
            
            defaultValue={
                item.title ? item.title : ""
              }
          />
          <TextField
            id="edit-item-category"
            onChange={handleItemUpdate}
            label="Category"
            defaultValue={
                item.category ? item.category : ""
              }
          />
        </Box>
        <TextField
          id="edit-item-desc"
          onChange={handleItemUpdate}
          label="Description"
          defaultValue={
            item.description ? item.description : ""
          }
        />
        <Box>
          <TextField
            id="edit-item-price"
            onChange={handleItemUpdate}
            error={errors.price}
            label="Price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
            defaultValue={
                item.price ? item.price : ""
              }
          />
          <TextField
            id="edit-item-qty"
            onChange={handleItemUpdate}
            error={errors.quantity}
            required
            label="Quantity"
            type="number"
            defaultValue={
                item.quantity ? item.quantity: ""
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
        <DialogContentText>No Item Selected!</DialogContentText>
      </DialogContent>
    );
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Update existing item</DialogTitle>
        {props.selectedItem ? dialogActive() : dialogInactive()}
      <DialogActions>
        <Button onClick={checkValidFields}>Update</Button>
        <Button onClick={handleClear}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
