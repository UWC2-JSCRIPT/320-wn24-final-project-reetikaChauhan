import '../App.css'
import { useState,useEffect } from 'react';
import { collection} from "firebase/firestore"; 
import { query,where,onSnapshot } from "firebase/firestore";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SideBar from './SideBarKitchenregister';
import PropTypes from "prop-types";

const MenuDashboard = ({kitchenuser}) =>{
    const[menuItems,setMenuItems] = useState([])
    useEffect(() => {
        const getMenuData = async () => {
                    try {
                        const userRefMenu = collection(db, 'Menu');
                        const userQueryMenu = query(userRefMenu, where('uid', '==', kitchenuser.uid));
                        onSnapshot(userQueryMenu, snapshot => {
                            setMenuItems(snapshot.docs)
                        });
                        
                } catch (error) {
                    console.error('Error fetching admins: ', error);
                    
                }  
                }
                
        getMenuData()
        return () => onSnapshot;
    }, [kitchenuser.uid])
    

    return(
        <>
        {menuItems &&
            <>
                <div className='container-admin'>
                    <SideBar/>
                    <div className="stepContainer" >
                        <div className="affichStep">
                            <h3>Menu of your kitchen</h3>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Item</th> 
                                    <th>Price</th>
                                    <th>Wait</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { menuItems.map((menuItem,index) =>{
                                    return(
                                        <tr key={`MenuDashboard-${index}`} >
                                            <td> {menuItem.data().item}</td>
                                            <td>{menuItem.data().price}</td>
                                            <td>{menuItem.data().wait}</td>
                                        </tr>   
                                    )
                                })
                                }
                               </tbody>
                         </table>
                        </div>
                    </div>
                </div>
            </>
        }
        </>
        
    )
}

MenuDashboard.propTypes = {
    kitchenuser: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  };

export default MenuDashboard;