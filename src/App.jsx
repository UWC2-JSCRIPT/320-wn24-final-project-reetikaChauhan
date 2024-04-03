import './App.css';
import Home from './Components/Home';
import AdminSignIn from './Components/AdminSignIn';
import KitchenRegister from './Components/KitchenRegisterPage';
import  { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'firebase/compat/auth';
import MenuDashboard from './Components/MenuDashboard';
import KitchenMenu from './Components/KitchenMenu';
import CustomerSignIn from './Components/CustomerSignIn';
import ShoppingCart from './Components/ShoppingCart';
import KitchenOrders from './Components/KitchenUserOrder';
import CustomerOrderStatus from "./Components/CustomerOrderStatus";
import { UserProvider } from './usercontext';
import ChatroomClient from './Components/Chatroom'

function App() {
  const [kitchenuser, setKitchenUser] = useState({})
  const [customer,setCustomer] = useState({})
  const [cart,setCart] = useState([])
  const [orderPlaced, setorderPlaced] = useState(false)

  return (
    <>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminSignIn" element={<AdminSignIn setKitchenUser={setKitchenUser} kitchenuser={kitchenuser}/>} />
        <Route path="/KitchenRegister" element={<KitchenRegister  kitchenuser={kitchenuser}/>} />
        <Route path="/MenuDashboard" element={<MenuDashboard  kitchenuser={kitchenuser}/>}/>
        <Route path="/KitchenMenu/:id" element={<KitchenMenu cart={cart} setCart = {setCart}   />} />
        <Route path="/CustomerSignIn" element ={<CustomerSignIn setCustomer={setCustomer} />} />
        <Route path="/ShoppingCart" element={<ShoppingCart  cart={cart} setCart = {setCart}  setorderPlaced={setorderPlaced} />}  /> 
        <Route path="/KitchenOrders" element={<KitchenOrders kitchenuser={kitchenuser}/>}  />  
        <Route path="/CustomerOrderStatus" element={<CustomerOrderStatus customer = {customer}/>}  /> 
        <Route path="/Chatroom" element={<ChatroomClient/>}  /> 
      </Routes>
    </UserProvider>
    </>
   
  )
}

export default App
