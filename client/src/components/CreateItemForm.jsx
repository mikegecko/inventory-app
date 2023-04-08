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
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

export default function CreateItemForm(props) {
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
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        const buffer = Buffer.from(reader.result);
        setNewImage(buffer);
    }
    handleItemUpdate(e)
  }

  const handleItemUpdate = (e) => {
    const value = e.target.value;
    console.log(e.target.id);
    switch (e.target.id) {
      case "new-item-name":
        setItem({ ...item, title: value });
        break;
      case "new-item-category":
        setItem({ ...item, category: value });
        break;
      case "new-item-desc":
        setItem({ ...item, description: value });
        break;
      case "new-item-price":
        setItem({ ...item, price: value });
        break;
      case "new-item-qty":
        setItem({ ...item, quantity: value });
        break;
      case 'new-item-img':
        setItem({...item, image: newImage})
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
      const subItem = { ...item, added: new Date() }; //Add date here since state updates are async
      props.handleNewItemSubmit(subItem);
      handleClear(event);
    }
  };
  const handleClear = (e) => {
    setItem(itemStruct);
    setNewImage(null);
    setErrors({});
    props.handleClose(e);
  };
  useEffect(() => {
    //console.log(item);
  }, [item]);
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Add new item</DialogTitle>
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
            id="new-item-name"
            onChange={handleItemUpdate}
            error={errors.name}
            required
            label="Item Name"
            sx={{ mr: 2 }}
          />
          <TextField
            id="new-item-category"
            onChange={handleItemUpdate}
            label="Category"
          />
        </Box>
        <TextField
          id="new-item-desc"
          onChange={handleItemUpdate}
          label="Description"
        />
        <Box>
          <TextField
            id="new-item-price"
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
          />
          <TextField
            id="new-item-qty"
            onChange={handleItemUpdate}
            error={errors.quantity}
            required
            label="Quantity"
            type="number"
          />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
          <Button variant="contained" component='label'>
            Upload Image
            <input id="new-item-img" onChange={handleImageChange} hidden accept="image/*" multiple={false} type="file" />
          </Button>
          <Typography variant="p"></Typography>
          {!newImage ? '' : <img className="upload-img" src={URL.createObjectURL( new Blob([newImage.buffer], {type: 'image/png'}))} alt="uploaded image" />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={checkValidFields}>Submit</Button>
        <Button onClick={handleClear}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
