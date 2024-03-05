import "../App.css"
import React, { useState,useEffect } from 'react';
import { collection } from "firebase/firestore"; 
import {  getDocs, query,where } from "firebase/firestore";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate,Link } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import PropTypes from "prop-types";

const CustomerOrderStatus = ({customer,orderPlaced}) =>{
    const [customerorderstatus,setcustomerorderstatus] = useState({})
    const navigate = useNavigate()
   
    
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        // ...
    };
    firebase.initializeApp(config);

    useEffect(() => {
    const getData = async () => {
            try {
                if(!customer.uid){
                    navigate("/CustomerSignIn")
                }
                const userRef = collection(db, 'order');
                const userQuery = query(userRef, where('customerinfo', '==', customer.email));
                await getDocs(userQuery).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                        querySnapshot.forEach((doc) => {
                            setcustomerorderstatus(doc.data())  
                        });
                    }
                    else{
                        navigate("/")
                    }
                })    
                
        } catch (error) {
            console.error('Error fetching admins: ', error);
            
            
        }  
    }
    getData()
}, [])

    return (
        <>
         <div className="status-container">
            <Header/>
            <div className="center-block">
                <button className="button"><h4>Order Status from {customerorderstatus.kitchenName} </h4></button>
                <p>Thank you for ordering from our kitchen.</p>
                <div className="p-content"><p>{customerorderstatus.orderStatus}</p></div>
            </div>
            <Footer/>
        </div>
        </>
    ) 
}


CustomerOrderStatus.propTypes = {
    orderPlaced: PropTypes.bool,
    customer: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  };

export default CustomerOrderStatus 