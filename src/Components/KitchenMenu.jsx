import '../App.css'
import { useState,useEffect } from 'react';
import { collection, query,where,onSnapshot} from "firebase/firestore"; 
import db from '../db'
import { useParams , useNavigate} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PropTypes from "prop-types";

const KitchenMenu = ({cart,setCart,customer,kitchenselectedimage,kitchenselectedname }) =>{
    const { id } = useParams();
    const navigate = useNavigate()
    const[kitchenmenu,setkitchenMenu] = useState([])
    
    useEffect(() => {
        const getMenuData = async () => {
                    try {
                        const userRefMenu = collection(db, 'Menu');
                        const userQueryMenu = query(userRefMenu, where('uid', '==', id));
                        onSnapshot(userQueryMenu, snapshot => {
                            setkitchenMenu(snapshot.docs)
                        });
                    } catch (error) {
                        console.error('Error fetching admins: ', error);   
                    }  
                }     
        getMenuData()
        return () => onSnapshot;
    }, [id])
   
    
    const handleshowcart = () =>{
           if(!customer.uid){
            navigate("/CustomerSignIn")
           }
           else{
             navigate("ShoppingCart")
           }   
    }
    return(
        <>
        {kitchenmenu &&
            <>
                <div className='kitchencontainer'>
                    <div className="kitchenimagediv">
                       <img src={kitchenselectedimage}/>
                    </div>
                    <h3>{kitchenselectedname}</h3>
                    <div className="kitchenMenu">
                        <div className='heading'>
                            <div className='head-text'> 
                                <h4>Full Menu</h4>
                                <p>10:00 AM - 8:15 PM</p>
                            </div>
                            <div className='cart' >
                                <button onClick={() => handleshowcart()}><span className="material-symbols-outlined">shopping_bag</span></button>
                                <span className="cart-count">{cart.length} </span>      
                            </div> 
                        </div> 
                      
                        <div className='tm-tab-content'>
                            <div className="tm-list">
                           
                                { kitchenmenu.map((menuItem,index) =>{
                                    const handleAddToCart = (menuItem) =>{
                                        setCart(prevcart => [...prevcart,menuItem.data()]); 
                                    }
                                    return(
                                        <div className='tm-list-item' key={`KitchenMenu-${index}`}>
                                            <img src={menuItem.data().itemimagelink} alt="Image" className="tm-list-item-img"/>
                                            <div className="tm-black-bg tm-list-item-text">
                                                <h5 className='tm-list-item-name'>{menuItem.data().item} <span className="tm-list-item-price">${menuItem.data().price}</span></h5>
                                                <p className="tm-list-item-description">Here is a wait timming for the first item. {menuItem.data().wait}.</p>
                                                <p>{menuItem.data().wait}</p>
                                                <button onClick={() => handleAddToCart(menuItem)}>+</button>
                                            </div>
                                        </div>  
                                    )
                                })
                                }
                            </div>
                        </div> 
                           
                    </div>
                </div>
            </>
        }
        </>
        
    )
}

KitchenMenu.propTypes = {
    setkitchenselectedname:PropTypes.func,
    setkitchenselectedimage:PropTypes.func,
    kitchenselectedimage:PropTypes.string,
    kitchenselectedname:PropTypes.string,
    customer: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        uid: PropTypes.string,
      }).isRequired,
    cart:PropTypes.arrayOf(
    PropTypes.shape({
        item:PropTypes.string,
        wait:PropTypes.string,
        itemimagelink:PropTypes.string,
        price:PropTypes.string
    }),
      ).isRequired,
      setCart:PropTypes.func
  };
export default KitchenMenu;