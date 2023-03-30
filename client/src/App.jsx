import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inventoryItems, setInventoryItems] = useState([]);
  
  useEffect(() => {
    axios.get('/api/inventory').then((res) => {
      setInventoryItems(res.data);
    }).catch((err) => {
      console.log(err);
    })

  },[])


  return (
    <div className="App">
      <h1>Inventory</h1>
      <div>
        <ul>
          {inventoryItems.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
