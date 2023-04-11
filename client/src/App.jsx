import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Alert, Box, IconButton, Snackbar, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./components/Themes";
import Header from "./components/Header";
import InventoryDashboard from "./components/InventoryDashboard";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Tools from "./components/Tools";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [inventoryItems, setInventoryItems] = useState([]); //Inventory -> set by axios api endpoint call to server.js
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [colorMode, setColorMode] = useState("dark"); // Light/Dark mode
  const [page, setPage] = useState("home"); //Page control for pageSelect
  const [mobileView, setMobileView] = useState(false);
  const breakpoint = 768;
  /* Modal Controls */
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  /* Snack Bar */
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackInfo, setSnackInfo] = useState({});

  
  const handleSnackClose = () => {
    setSnackOpen(false);
    setSnackInfo({...snackInfo, content: ''});
  }
  const setStateOfSnacks = (open, content, severity) => {
    setSnackInfo({content: content, severity: severity});
    setSnackOpen(open);
  }
  const handleLogin = async(username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {username, password});
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setStateOfSnacks(true, error.response.data.message, 'error');
      console.error(error)
    }
  }

  const themeControl = () => {
    if(colorMode === 'dark'){
      return(darkTheme);
    }
    if(colorMode === 'light'){
      return(lightTheme);
    }
  }

  const handleUpdateItemSubmit = async (updatedItem) => {
    try {
      const response = await axios.put(`/api/inventory/${updatedItem._id}`, {
        ...updatedItem,
      });
      //console.log("Updated item", response.data);
      retrieveItems();
    } catch (error) {
      setStateOfSnacks(true, error.response.data.message, 'error');
      console.error(error);
    }
  };

  const handleDeleteItemSubmit = async (delItem) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}`};
    try {
      const response = await axios.delete(`/api/inventory/${delItem._id}`, {
        ...delItem, headers
      });
      //console.log("Deleted item", response.data);
      retrieveItems();
    } catch (error) {
      setStateOfSnacks(true, error.response.data.message, 'error');
      console.error(error);
    }
  };
  const handleNewItemSubmit = async (newItem) => {
    try {
      const response = await axios.post("/api/inventory", {
        ...newItem,
      });
      //console.log("Created new item", response.data);
      retrieveItems();
    } catch (error) {
      setStateOfSnacks(true, error.response.data.message, 'error');
      console.error(error);
    }
  };

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
    if (colorMode === "dark") {
      setColorMode("light");
      return;
    }
    if (colorMode === "light") {
      setColorMode("dark");
      return;
    }
  };

  const pageSelect = () => {
    switch (page) {
      case "home":
        return <Home inventoryItems={inventoryItems} mobileView={mobileView}/>;
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
            mobileView={mobileView}
          />
        );
      case "tools":
        return <Tools mobileView={mobileView} />;
      case "settings":
        return <Settings handleLogin={handleLogin} mobileView={mobileView} />;
      default:
        return <Home inventoryItems={inventoryItems} mobileView={mobileView}/>;
        break;
    }
  };

  const retrieveItems = async () => {
    axios
      .get("/api/inventory")
      .then((res) => {
        setInventoryItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if(windowWidth > breakpoint){
      setMobileView(false);
    } else{
      setMobileView(true);
    }
    //Api endpoint retrieve items
    retrieveItems();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    //console.log(inventoryItems);
  }, [inventoryItems]);
  useEffect(() => {
    //console.log(colorMode);
  }, [colorMode]);
  //Responsive views
  useEffect(() => {
    if(windowWidth > breakpoint){
      setMobileView(false);
    } else{
      setMobileView(true);
    }
  },[windowWidth])
  /*
  -----------
  MOBILE VIEW
  -----------
  */
  if (mobileView) {
    return (
      <div className="App">
        <ThemeProvider theme={themeControl()}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: "100%",
              width: "100%",
              flexDirection: "row",
              overflow: 'hidden',
              backgroundColor: 'background.default',
            }}
          >
            <Sidebar
              colorMode={colorMode}
              handleModeChange={handleModeChange}
              page={page}
              handlePageChange={handlePageChange}
              mobileView={mobileView}
            />
            <Box sx={{ width: "100%", height: "100%" }}>
              <Header page={page} mobileView={mobileView} />
              {pageSelect()}
              <Snackbar sx={{ml: '7%'}} open={snackOpen} autoHideDuration={5000} onClose={handleSnackClose} action={<IconButton onClick={handleSnackClose}><CloseIcon /></IconButton>}>
                <Alert onClose={handleSnackClose} severity={snackInfo.severity}>
                  {snackInfo.content}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  } else {

  /*
  -----------
  DESKTOP VIEW
  -----------
  */
    return (
      <div className="App">
        <ThemeProvider theme={themeControl()}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: "100%",
              width: "100%",
              flexDirection: "row",
              backgroundColor: 'background.default',
            }}
          >
            <Sidebar
              colorMode={colorMode}
              handleModeChange={handleModeChange}
              page={page}
              handlePageChange={handlePageChange}
              mobileView={mobileView}
            />
            <Box sx={{ width: "100%", height: "100%" }}>
              <Header page={page} mobileView={mobileView} />
              {pageSelect()}
              <Snackbar sx={{mb: '4rem'}} open={snackOpen} autoHideDuration={5000} onClose={handleSnackClose} action={<IconButton onClick={handleSnackClose}><CloseIcon /></IconButton>}>
                <Alert onClose={handleSnackClose} severity={snackInfo.severity}>
                  {snackInfo.content}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}
export default App;
