import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";

export default function Home(props) {
  /*
        Display the following:
        1. Total items
        2. Total price of all items
        3. Out of stock items
        4. Low stock items
    */

    const totalInventoryValue = () => {
        const items = props.inventoryItems;
        let total = 0;
        items.forEach(item => {
            total = total + (parseInt(item.quantity) * parseFloat(item.price));
        });
        total = total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        return(total)
    }
    const totalInventoryItems = () => {
        const items = props.inventoryItems;
        let total = 0;
        items.forEach(item => {
            total = total + parseInt(item.quantity);
        });
        return(total);
    }
    const lowInventoryStock = () => {
        const items = props.inventoryItems;
        let lowItems = [];
        items.forEach(item => {
            if(item.quantity <= 10){
                lowItems.push(item);
            }
        });
        return lowItems;
    }
    const emptyInventoryStock = () => {
        const items = props.inventoryItems;
        let outItems = [];
        items.forEach(item => {
            if(item.quantity <= 0){
                outItems.push(item);
            }
        });
        return(outItems);
    }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        gap: "1rem",
        width: "calc(100% - 2rem)",
        height: "calc(100% - 2rem - 64px)",
      }}
    >
      <Paper elevation={2}>
        <Typography variant="h4">Home</Typography>
      </Paper>
      <Box sx={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
        <Card sx={{ minWidth: "275px", width: 'auto', flex: '1 1 auto' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: "14px" }}
              gutterBottom
              color="text.secondary"
            >
              Total Items
            </Typography>
            <Typography variant="h5">{totalInventoryItems()}</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
        <Card sx={{ minWidth: "275px", width: 'auto', flex: '1 1 auto' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: "14px" }}
              gutterBottom
              color="text.secondary"
            >
              Total Value
            </Typography>
            <Typography variant="h5">${totalInventoryValue()}</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
        
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>

      <Card sx={{ minWidth: "275px", width: 'auto', flex: '1 1 auto'  }}>
          <CardContent>
            <Typography
              sx={{ fontSize: "14px" }}
              gutterBottom
              color="text.secondary"
            >
              Low Stock Items
            </Typography>
            <Typography variant="p">- Silver Watch</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
        <Card sx={{ minWidth: "275px", width: 'auto', flex: '1 1 auto'  }}>
          <CardContent>
            <Typography
              sx={{ fontSize: "14px" }}
              gutterBottom
              color="text.secondary"
            >
              Out of Stock Items
            </Typography>
            <Typography variant="p">- Hoodie</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
        </Box>
    </Box>
  );
}
