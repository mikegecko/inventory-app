import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./components/Themes";

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    //Api endpoint test
    axios
      .get("/api/inventory")
      .then((res) => {
        setInventoryItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems]);
  /*
  -----------
  MOBILE VIEW
  -----------
  */
  if (windowWidth < 768) {
    return <></>;
  }

  /*
  -----------
  DESKTOP VIEW
  -----------
  */
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "100%",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Sidebar />
          <Box sx={{ width: "100%" }}>
            <h1>Inventory</h1>

            <div>
              <ul>
                {!inventoryItems ? (
                  <li>No Items Found</li>
                ) : (
                  inventoryItems.map((item) => (
                    <li key={item._id}>{item.title}</li>
                  ))
                )}
              </ul>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
