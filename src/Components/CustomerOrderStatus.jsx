import '../App.css'
import { useRef,useState,useEffect } from 'react';
import { collection } from "firebase/firestore"; 
import {  getDocs, query,where,orderBy,addDoc } from "firebase/firestore";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate} from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import PropTypes from "prop-types";
import { useContext } from 'react';
import UserContext from '../usercontext';

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // ...
};
firebase.initializeApp(config);



//const analytics = firebase.analytics();

const CustomerOrderStatus = () =>{
    const [customerorderstatus,setcustomerorderstatus] = useState({})
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
   
    useEffect(() => {
    const getData = async () => {
            try {
                if(!user.uid){
                    navigate("/CustomerSignIn")
                }
                const userRef = collection(db, 'order');
                const userQuery = query(userRef, where('customerinfo', '==', user.email));
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
         <div>
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


export default CustomerOrderStatus 