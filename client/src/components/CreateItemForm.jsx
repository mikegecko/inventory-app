import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateItemForm(props) {

    const itemStruct = {
        title: null,
        description: '',
        category: '',
        quantity: null ,
        price: null,
        added: '',
        updated:'' ,
        image:'' , 
      };

      const [item, setItem] = useState(itemStruct);
      const [errors, setErrors] = useState({});

    const handleItemUpdate = (e) => {
        const value = e.target.value;
        switch (e.target.id) {
            case "new-item-name":
                setItem({...item, title: value})
                break;
            case "new-item-category":
                setItem({...item, category: value})
                break;
            case "new-item-desc":
                setItem({...item, description: value})
                break;
            case "new-item-price":
                setItem({...item, price: value})
                break;
            case "new-item-qty":
                setItem({...item, quantity: value})
                break;
        
            default:
                break;
        }
    }

    const checkValidFields = (event) => {
        let errors = {};
        if(item.title === null || item.title === ''){
            errors.name = true;
        }
        if(item.quantity < 0 || item.quantity === null){
            errors.quantity = true;
        }
        if(item.price < 0 || item.price === null){
            errors.price = true;
        }
        setErrors({...errors});
        // else{
        //     console.log('no errors');
        //     setItem({...item, added: new Date()});

        // }
    }

    useEffect(() => {
        console.log(item);
    }, [item])
    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Add new item
            </DialogTitle>
            <DialogContent sx={{margin: '.5rem', padding: '.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DialogContentText>
                    
                </DialogContentText>
                <Box>
                <TextField id="new-item-name" onChange={handleItemUpdate} error={errors.name} required label="Item Name" sx={{mr: 2}}/>
                <TextField id="new-item-category" onChange={handleItemUpdate} label="Category"/>
                </Box>
                <TextField id="new-item-desc" onChange={handleItemUpdate} label="Description"/>
                <Box>
                <TextField id="new-item-price" onChange={handleItemUpdate} error={errors.price} label="Price" type="number" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} sx={{mr: 2}}/>
                <TextField id="new-item-qty" onChange={handleItemUpdate} error={errors.quantity} required label="Quantity" type="number"/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={checkValidFields}>Submit</Button>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}