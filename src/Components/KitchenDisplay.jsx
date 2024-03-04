import '../App.css'
import { collection,orderBy, onSnapshot, query} from "firebase/firestore"; 
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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
            <section class="image-gallery">
               { kitchens.map(kitchen =>{
                    return(
                        <div className="img-card" onClick={() => handleClick(kitchen)} >
                            <div className='image'>
                                <img src={kitchen.data().kitchenimagelink} alt="image"/>  
                                <div className='text'>
                                <button> <h6>{kitchen.data().KithenName}</h6> </button>    
                                </div> 
                                <div className='reviews'>
                                    <span className="material-symbols-outlined">favorite</span>
                                </div>
                            </div>
                       </div>
                    )   
             })
            }
            </section>
        </>
    )
   
}

export default KitchenDisplayonHomePage;