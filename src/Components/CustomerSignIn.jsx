import '../App.css'
import React, { useState } from 'react';
import 'firebase/compat/auth';
import {auth,provider} from "../config"
import {signInWithPopup} from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';
import PropTypes from "prop-types";

const CustomerSignIn = ({customer ,setCustomer,cart,setCart}) =>{
  const navigate = useNavigate()
   
  const handleClick = () =>{
  signInWithPopup(auth,provider).then((data) =>{
    setCustomer(data.user)
    navigate("/ShoppingCart")
  })
  }
  
    return(
        <>
          <div className="container" >
            <h3>Please Sign In to check out</h3>
            <button onClick={handleClick}>google</button>
          </div>   
         
        </>
          )
}
CustomerSignIn.propTypes = {
  setCustomer:PropTypes.func,
  customer: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  cart:PropTypes.array,
  setCart:PropTypes.func
};
export default CustomerSignIn;