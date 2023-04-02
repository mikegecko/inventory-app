import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';



export default function InventoryDashboard(props){

    const modifiedInventoryItems = (arr) => {
        const newItems = [...arr] || [...props.inventoryItems];
        for (let index = 0; index < newItems.length; index++) {
            const element = newItems[index];
            element.id = index;
        }
        console.log(newItems);
        return(newItems);
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Name', width: 160},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'category', headerName: 'Category', width: 160},
        {field: 'price', headerName: 'Price', width: 70, type: 'number'},
        {field: 'quantity', headerName: 'Qty', width:70, type: 'number'},
        {field: '_id', headerName: '_id', width: 210}
        
    ]

    return(
        <Box sx={{width: 'calc(100% - 40px)', maxWidth: '100%', maxHeight:'100vh', height: 'calc(100% - 104px)', margin: '20px'}}>
            <DataGrid  columns={columns} rows={modifiedInventoryItems(props.inventoryItems)} />
        </Box>
    )
}
