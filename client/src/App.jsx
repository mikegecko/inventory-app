import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    axios
      .get("/api/inventory")
      .then((res) => {
        setInventoryItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems]);


  return (
    <div className="App">
      <h1>Inventory</h1>
      <div>
        <ul>
          {!inventoryItems ? <li>No Items Found</li> : inventoryItems.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
