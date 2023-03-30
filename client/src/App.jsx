import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);
  
  useEffect(() => {
    axios.get('/api/inventory').then((res) => {
      setInventoryItems(res.data);
    }).catch((err) => {
      console.log(err);
    })
  },[])
  useEffect(() => {
    console.log(inventoryItems);
  }, [inventoryItems])

  const displayInventory = () => {
    if(inventoryItems.length == 0){
      return(<li>No Items in Inventory</li>)
    }
    else{
      return(inventoryItems.map((item) => (
        <li key={item._id}>{item.title}</li>
      )))
    }
  }

  return (
    <div className="App">
      <h1>Inventory</h1>
      <div>
        <ul>
          {() => displayInventory()}
        </ul>
      </div>
    </div>
  )
}

export default App
