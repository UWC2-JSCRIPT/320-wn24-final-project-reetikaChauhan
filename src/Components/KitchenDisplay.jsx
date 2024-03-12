import '../App.css'
import { collection,orderBy, onSnapshot, query} from "firebase/firestore"; 
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const KitchenDisplayonHomePage = ({setkitchenselectedname,setkitchenselectedimage,setkitchenselecteduid}) =>{
    const[kitchens, setkitchens] = useState([])
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
                    const userRef = collection(db, 'registeredkitchenadmins');
                    const userQuery = query(userRef, orderBy("createdAT", 'desc'));
                    onSnapshot(userQuery, snapshot => {
                        setkitchens(snapshot.docs)
                       
                    });      
            } catch (error) {
                console.error('Error fetching admins: ', error);  
            }  
        }
        getData()
        return () =>onSnapshot;
    }, [])

   const handleClick = (kitchen) =>{
        setkitchenselectedimage(kitchen.data().kitchenimagelink)
        setkitchenselectedname(kitchen.data().KithenName)
        setkitchenselecteduid(kitchen.data().uid)
        navigate(`/KitchenMenu/${kitchen.data().uid}`)
   }
    return(
        <>
             <div className="row portfolio-container">
               { kitchens.map((kitchen,index) =>{
                    return(
                        <div className="col-lg-4 col-md-6 mb-4 portfolio-item first"  onClick={() => handleClick(kitchen)}  key={`KitchenDisplay-${index}`}>
                            <div className="position-relative overflow-hidden mb-2">
                                <h5>{kitchen.data().KithenName}</h5>
                                <img className="img-fluid rounded w-100" src={kitchen.data().kitchenimagelink} alt=""/>
                            </div>
                        </div>
                    )   
             })
            }
            </div>
        </>
    )
   
}

KitchenDisplayonHomePage.propTypes = {
    setkitchenselectedname:PropTypes.func,
    setkitchenselectedimage:PropTypes.func,
    setkitchenselecteduid:PropTypes.func,
  };

export default KitchenDisplayonHomePage;