import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ItemDetail(props) {
  const [item, setItem] = useState(null);
  const [itemImageSrc, setItemImageSrc] = useState(null);
  useEffect(() => {
    if (props.selectedItem !== null || props.selectedItem !== undefined) {
      setItem({ ...props.selectedItem });
    }
    if (
      props.selectedItem !== undefined &&
      props.selectedItem.image.data !== undefined
    ) {
      // Displays Image using stored mongoDB data
      const dataUri = `data:${
        props.selectedItem.image.contentType
      };base64,${Buffer.from(props.selectedItem.image.data).toString(
        "base64"
      )}`;
      setItemImageSrc(dataUri);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        gap: "1rem",
        width: "calc(100% - 40px)",
        height: "calc(100% - 2rem - 64px)",
      }}
    >
      <Paper elevation={2}>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
        <Box sx={{ display: "flex", ml: '1rem' }}>
          <IconButton onClick={props.handleGoBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" >
          {item ? item.title : "No Item Selected"}
        </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          <img className="img-detail" src={itemImageSrc} />
          <Box>{item ? item.description : "No description."}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          <Box>Price: ${item ? item.price : ""}</Box>
          <Box>Quantity: {item ? item.quantity : ""}</Box>
        </Box>
      </Paper>
    </Box>
  );
}
