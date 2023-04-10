import styled from "@emotion/styled";
import { Box, Button, ButtonGroup, Dialog, IconButton, Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateItemForm from "./CreateItemForm";
import DeleteItemForm from "./DeleteItemForm";
import { useEffect, useState } from "react";
import EditItemForm from "./EditItemForm";
import ItemDetail from "./ItemDetail";

export default function InventoryDashboard(props){

    /*
        TODO:
        - ADD DETAIL PAGE DISPLAY FOR DOUBLE CLICK ROW
    */


    const [selection, setSelection] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [subPage, setSubPage] = useState('grid');

    const subPageSelect = () => {
        switch (subPage) {
            case 'grid':
                return <DataGrid onRowDoubleClick={handleItemDoubleClick} rowSelectionModel={selection} onRowSelectionModelChange={(newSelection) => setSelection(newSelection)} columns={columns} rows={modifiedInventoryItems(props.inventoryItems)} />
            case 'detail':
                return <ItemDetail />
            default:
                break;
        }
    }

    const handleItemDoubleClick = (e) => {
        console.log(e.id);
        setSubPage('detail');
    }

    const modifiedInventoryItems = (arr) => {
        const newItems = [...arr] || [...props.inventoryItems];
        for (let index = 0; index < newItems.length; index++) {
            const element = newItems[index];
            element.id = index;
        }
        //console.log(newItems);
        return(newItems);
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Name', width: 160},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'category', headerName: 'Category', width: 160},
        {field: 'price', headerName: 'Price', width: 75, type: 'number'},
        {field: 'quantity', headerName: 'Qty', width:70, type: 'number'},
        {field: '_id', headerName: '_id', width: 210}
        
    ]

    useEffect(() => {
        //console.log(selection);
        if(selection !== null){
            setSelectedItem(props.inventoryItems[selection]);
        }
    }, [selection])
    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])
    
    return(
        <>
        <CreateItemForm handleClose={props.handleClose} handleClickOpenModal={props.handleClickOpenModal} open={props.openNew} handleNewItemSubmit={props.handleNewItemSubmit} />
        <DeleteItemForm handleClose={props.handleClose} handleClickOpenModal={props.handleClickOpenModal} open={props.openDelete} selectedItem={selectedItem} handleDeleteItemSubmit={props.handleDeleteItemSubmit} />
        <EditItemForm handleClose={props.handleClose} handleClickOpenModal={props.handleClickOpenModal} open={props.openEdit} selectedItem={selectedItem} handleUpdateItemSubmit={props.handleUpdateItemSubmit}/>
        <Box sx={{width: 'calc(100% - 40px)', maxWidth: '100%', maxHeight:'100vh', height: 'calc(100% - 157px)', margin: ' 0 20px 20px 20px'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', mb: '10px', mt: '10px'}}>
                <Paper elevation={2} sx={{padding: '.5rem', width: 'auto'}}>
                    <ButtonGroup color="primary" sx={{ width: 'auto'}}>
                        <Button id="add" onClick={props.handleClickOpenModal}><AddIcon sx={{pointerEvents: 'none'}} /></Button>
                        <Button id="edit"onClick={props.handleClickOpenModal}><EditIcon sx={{pointerEvents: 'none'}} /></Button>
                        <Button id="del" onClick={props.handleClickOpenModal}><DeleteIcon sx={{pointerEvents: 'none'}} /></Button>
                    </ButtonGroup>
                </Paper>
            </Box>
            {subPageSelect()}
        </Box>
        </>
    )
}
