import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";

export default function Home() {
  /*
        Display the following:
        1. Total items
        2. Total price of all items
        3. Out of stock items
        4. Low stock items
    */

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
            <Typography variant="h5">100</Typography>
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
            <Typography variant="h5">$1,000</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
        
      </Box>
      <Card sx={{ minWidth: "275px", width: 'auto',  }}>
          <CardContent>
            <Typography
              sx={{ fontSize: "14px" }}
              gutterBottom
              color="text.secondary"
            >
              Low Stock Items
            </Typography>
            <Typography variant="p">- SilverWatch</Typography>
          </CardContent>
          <CardActionArea></CardActionArea>
        </Card>
    </Box>
  );
}
