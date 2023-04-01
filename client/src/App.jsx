import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./components/Themes";
import Header from "./components/Header";
import InventoryDashboard from "./components/InventoryDashboard";

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [colorMode, setColorMode] = useState('dark');


  const handleModeChange = (event, newMode) => {
    setColorMode(newMode);
  }


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
          <Sidebar colorMode={colorMode} handleModeChange={handleModeChange} />
          <Box sx={{ width: "100%", height: '100%' }}>
            <Header />
            <InventoryDashboard inventoryItems={inventoryItems} />
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
