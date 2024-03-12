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

function App() {
  const [kitchenuser, setKitchenUser] = useState({})
  const [customer,setCustomer] = useState({})
  const [cart,setCart] = useState([])
  const[kitchenselectedname, setkitchenselectedname] = useState("") // for kitchen menu page on customer side
  const[kitchenselectedimage, setkitchenselectedimage] = useState("")
  const[kitchenselecteduid, setkitchenselecteduid] = useState("")
  const [orderPlaced, setorderPlaced] = useState(false)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setkitchenselectedname={setkitchenselectedname} setkitchenselectedimage={setkitchenselectedimage} setkitchenselecteduid={setkitchenselecteduid}/>} />
        <Route path="/AdminSignIn" element={<AdminSignIn setKitchenUser={setKitchenUser} kitchenuser={kitchenuser}/>} />
        <Route path="/KitchenRegister" element={<KitchenRegister  kitchenuser={kitchenuser}/>} />
        <Route path="/MenuDashboard" element={<MenuDashboard  kitchenuser={kitchenuser}/>}/>
        <Route path="/KitchenMenu/:id" element={<KitchenMenu cart={cart} setCart = {setCart} customer = {customer} kitchenselectedname={kitchenselectedname} kitchenselectedimage={kitchenselectedimage} />} />
        <Route path="/CustomerSignIn" element ={<CustomerSignIn setCustomer={setCustomer} />} />
        <Route path="/ShoppingCart" element={<ShoppingCart customer = {customer}  cart={cart} setCart = {setCart}  setorderPlaced={setorderPlaced} kitchenselecteduid={kitchenselecteduid} kitchenselectedname={kitchenselectedname}/>}  /> 
        <Route path="/KitchenOrders" element={<KitchenOrders kitchenuser={kitchenuser}/>}  />  
        <Route path="/CustomerOrderStatus" element={<CustomerOrderStatus customer = {customer}/>}  /> 
      </Routes>
    </>
  )
}

export default App
