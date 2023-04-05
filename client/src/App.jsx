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
  const [inventoryItems, setInventoryItems] = useState([]); //Inventory -> set by axios api endpoint call to server.js
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [colorMode, setColorMode] = useState("dark"); // Light/Dark mode
  const [page, setPage] = useState("home"); //Page control for pageSelect
  /* Modal Controls */
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleUpdateItemSubmit = async(updatedItem) => {
    try {
      const response = await axios.put(`/api/inventory/${updatedItem._id}`,{
        ...updatedItem
      });
      console.log('Updated item', response.data);
      retrieveItems();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteItemSubmit = async(delItem) => {
    try{
      const response = await axios.delete(`/api/inventory/${delItem._id}`, {
        ...delItem
      });
      console.log('Deleted item', response.data);
      retrieveItems();
    }catch(error){
      console.error(error);
    }
  }
  const handleNewItemSubmit = async(newItem) => {
    try{
      const response = await axios.post('/api/inventory', {
        ...newItem
      });
      console.log('Created new item', response.data);
      retrieveItems();
    }catch(error){
      console.error(error)
    }
  }

  const handleClickOpenModal = (event) => {
    switch (event.target.id) {
      case "add":
        setOpenNew(true);
        break;
      case "edit":
        setOpenEdit(true);
        break;
      case "del":
        setOpenDelete(true);
        break;
      default:
        break;
    }
  };
  const handleClose = (event) => {
    setOpenNew(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const handlePageChange = (event, newpage) => {
    setPage(newpage);
  };
  const handleModeChange = (event, newMode) => {
    if(colorMode === 'dark'){
      setColorMode('light');
      return;
    }
    if(colorMode === 'light'){
      setColorMode('dark')
      return;
    }
  };

  const pageSelect = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "inventory":
        return (
          <InventoryDashboard
            inventoryItems={inventoryItems}
            openNew={openNew}
            openEdit={openEdit}
            openDelete={openDelete}
            handleClose={handleClose}
            handleClickOpenModal={handleClickOpenModal}
            handleNewItemSubmit={handleNewItemSubmit}
            handleDeleteItemSubmit={handleDeleteItemSubmit}
            handleUpdateItemSubmit={handleUpdateItemSubmit}
          />
        );
      case "tools":
        return <Tools />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
        break;
    }
  };

  const retrieveItems = async() => {
    axios
    .get("/api/inventory")
    .then((res) => {
      setInventoryItems(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    //Api endpoint retrieve items
    retrieveItems();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems]);
  useEffect(() => {
    console.log(colorMode);
  }, [colorMode])
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
            <Header page={page} />
            {pageSelect()}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
