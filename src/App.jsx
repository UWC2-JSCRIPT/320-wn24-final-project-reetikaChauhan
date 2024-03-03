import './App.css';
import Home from './Components/Home';
import AdminSignIn from './Components/AdminSignIn';
import KitchenRegister from './Components/KitchenRegisterPage';
import React, { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { collection, addDoc } from "firebase/firestore"; 
import { doc, getDocs, query,where } from "firebase/firestore";
import db from './db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import MenuDashboard from './Components/MenuDashboard';
//import KitchenMenu from './Components/KitchenMenu';
//import CustomerSignIn from './Components/CustomerSignIn';
//import ShoppingCart from './Components/ShoppingCart';

function App() {
  const [kitchenuser, setKitchenUser] = useState({})
  const [ customer ,setCustomer] = useState({})
  const [cart,setCart] = useState([])
  const[kitchenselected, setkitchenselected] = useState({}) // for kitchen menu page on customer side
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home setkitchenselected={setkitchenselected}/>} />
        <Route path="/AdminSignIn" element={<AdminSignIn setKitchenUser={setKitchenUser} kitchenuser={kitchenuser}/>} />
        <Route path="/KitchenRegister" element={<KitchenRegister  kitchenuser={kitchenuser}/>} />
        <Route path="/MenuDashboard" element={<MenuDashboard  kitchenuser={kitchenuser}/>}/>
       </Routes>
    </>
  )
}

export default App
