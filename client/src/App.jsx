import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./components/Themes";
import Header from "./components/Header";
import InventoryDashboard from "./components/InventoryDashboard";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Tools from "./components/Tools";

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [colorMode, setColorMode] = useState("dark");
  const [page, setPage] = useState("home");

  const handlePageChange = (event, newpage) => {
    setPage(newpage);
  };
  const handleModeChange = (event, newMode) => {
    setColorMode(newMode);
  };

  const pageSelect = () => {
    switch (page) {
      case 'home':
        return <Home />
      case 'inventory':
        return <InventoryDashboard inventoryItems={inventoryItems} />
      case 'tools':
        return  <Tools />
      case 'settings':
        return <Settings />
      default:
        return <Home />
        break;
    }
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
          <Sidebar
            colorMode={colorMode}
            handleModeChange={handleModeChange}
            page={page}
            handlePageChange={handlePageChange}
          />
          <Box sx={{ width: "100%", height: "100%" }}>
            <Header />
            {pageSelect()}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
