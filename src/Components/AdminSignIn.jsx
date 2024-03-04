import '../App.css'
import React from 'react';
import 'firebase/compat/auth';
import {auth,provider} from "../config"
import {signInWithPopup} from "firebase/auth";
import KitchenRegister from './KitchenRegisterPage';
const AdminSignIn = ({setKitchenUser,kitchenuser}) =>{
   const handleClick = () =>{
    signInWithPopup(auth,provider).then((data) =>{
      setKitchenUser(data.user)
    })
   }
   

    return(
        <>{
          kitchenuser.uid ? <KitchenRegister kitchenuser={kitchenuser}/> :
          <div className="container" >
            <h3>Please Register Yourself</h3>
            <button onClick={handleClick}>Register with google</button>
          </div>   
        }
           
        </>
          )
}

export default AdminSignIn;