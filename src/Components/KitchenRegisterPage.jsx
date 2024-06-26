import '../App.css'
import { useState,useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { getDocs, query,where } from "firebase/firestore";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SideBar from './SideBarKitchenregister';
import PropTypes from "prop-types";

const KitchenRegister = ({kitchenuser}) =>{
    const [showregisterkitchen, setregisterKitchen] = useState('hide')
    const [showaddmenu, setAddmenu] = useState('hide')
    const [entry,setEntry] = useState({})
    const [hasError, setHasError] = useState('hide');
    const [isLoading, setIsLoading] = useState(true);

    // const config = {
    //     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    //     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    //     // ...
    // };
    // firebase.initializeApp(config);

    useEffect(() => {
    const getData = async () => {
    
            try {
                const userRef = collection(db, 'registeredkitchenadmins');
                const userQuery = query(userRef, where('uid', '==', kitchenuser.uid));
                await getDocs(userQuery).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                        querySnapshot.forEach((doc) => {
                            setEntry(doc.data())
                            setregisterKitchen("hide")
                            setAddmenu("")
                            setIsLoading(false)
                        });
                    }
                    else{
                        setregisterKitchen("")
                        setAddmenu("hide")
                        setIsLoading(false)
                    }
                })    
                
        } catch (error) {
            console.error('Error fetching admins: ', error);
            setIsLoading(true)
            
        }  
    }
    getData()
}, [kitchenuser.uid])

   
 
    const handleChange = (e) => {
    const { name, value } = e.target;
        setEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
            }))
    }
   const handlenextStep = async e =>{
    e.preventDefault();
    try{
         // Add a new document to registeredkitchenadmins.
        const docRef = await addDoc(collection(db, "registeredkitchenadmins"), {
            Address: entry.address,
            Name:kitchenuser.displayName,
            Email:kitchenuser.email,
            Category:entry.category,
            uid:kitchenuser.uid,
            KithenName:entry.name,
            kitchenimagelink:entry.kitchenimage,
            createdAT: new Date()
          });
          setEntry('')
          setregisterKitchen("hide")
          setAddmenu("")
          setHasError("")
    }
    catch(error){
        setHasError("")
        console.error('Error fetching admins: ', error); 
    }
  }
  const handlenextStepTwo = async e =>{
    e.preventDefault();
    try{
    // Add a new document to Menu.
    const docRef = await addDoc(collection(db, "Menu"), {
        uid:kitchenuser.uid,
        item:entry.item,
        price:entry.price,
        wait:entry.wait,
        itemimagelink:entry.imagelink
      });
      setEntry('')
      setregisterKitchen("hide")
      setAddmenu("")
      setHasError("hide")
    }
    catch(error){
        setHasError("")
        console.error('Error fetching admins: ', error); 
    }

  }
  
  if (isLoading) {
    return <h1>Loading...</h1>
  }



   

    return(
        <>
       <div className="container-admin" >
            <SideBar/>
            <div className="stepContainer" >
                <div className="affichStep">
                <h6 className= {`${hasError}`}>Please fill all fields</h6>
                    <div className={`stepInfo ${showregisterkitchen}`} >
                        {kitchenuser &&
                        <><h3> Welcome {kitchenuser.displayName}</h3></>}
                        <h4>Register your kitchen</h4>
                        <p>Name of Kitchen</p>
                        <input
                            type="text"
                            name="name" value={entry.name || ''} 
                            onChange={(e) => handleChange(e)}
                         />
                        <p>Category (eg. Indian, Mexican, Filipino)</p>
                        <input
                            type="text"
                            name="category" value={entry.category || ''}  
                            onChange={(e) => handleChange(e)}
                      />
                        <p>Address </p>
                        <input
                            type="text"
                            name="address" value={entry.address || ''}  
                            onChange={(e) => handleChange(e)}
                         />
                        <p>Image of your kitchen link </p>
                         <input
                            type="url"
                            name="kitchenimage" value={entry.kitchenimage || ''}  
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="buttonContainerStepOne">
                            <button  onClick={handlenextStep} className="nextStep">Next Step</button>
                        </div>
                    </div>
                    <div className={`stepInfo ${showaddmenu}`} >
                        {kitchenuser &&
                        <><h3> Welcome {kitchenuser.displayName}</h3></>}
                        <h4>Add Menu</h4>
                        <p>Item</p>
                        <input
                            type="text"
                            name="item" value={entry.item || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Image of your Item Link </p>
                        <input
                            type="text"
                            name="imagelink" value={entry.imagelink || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Price</p>
                        <input
                            type="text"
                            name="price" value={entry.price || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Wait Time </p>
                        <input
                            type="text"
                            name="wait" value={entry.wait|| ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="buttonContainerStepOne">
                            <button  onClick={handlenextStepTwo} className="nextStep">Add Menu</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>       
        </>
          )
}

KitchenRegister.propTypes = {
    kitchenuser: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  };

export default KitchenRegister;