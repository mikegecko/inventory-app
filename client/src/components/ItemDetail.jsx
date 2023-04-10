import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

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
        width: "calc(100% - 40px)",
        maxWidth: "100%",
        maxHeight: "100vh",
        height: "calc(100% - 157px)",
        margin: "20px 20px 20px 20px",
      }}
    >
      <Paper elevation={2}>
        <Typography variant="h4">
          {item ? item.title : "No Item Selected"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <img src={itemImageSrc} />
        </Box>
      </Paper>
    </Box>
  );
}
