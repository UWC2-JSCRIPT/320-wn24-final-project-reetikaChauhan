import {createContext} from "react";
import { useState,useEffect } from 'react';
import 'firebase/compat/auth';
import {auth,provider} from "./config"
import {GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";



const UserContext = createContext(null);

export const UserProvider = ( {children} ) =>{
    const [user, setUser ] = useState({})
    const[kitchenselectedname, setkitchenselectedname] = useState("") // for kitchen menu page on customer side
    const[kitchenselectedimage, setkitchenselectedimage] = useState("")
    const[kitchenselecteduid, setkitchenselecteduid] = useState("")
   

    return(
        <UserContext.Provider value = {{user,setUser,kitchenselectedname,kitchenselectedimage,kitchenselecteduid,setkitchenselectedname,setkitchenselectedimage,setkitchenselecteduid}}>
            { children }
        </UserContext.Provider>
    );
}
export default UserContext;