import '../App.css'
import { useState,useEffect } from 'react';
import { collection, query,where,addDoc,getDocs} from "firebase/firestore"; 
import db from '../db'
import { useNavigate, Link} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Footer from './footer';
import Header from './header'
import PropTypes from "prop-types";
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../usercontext';

const ShoppingCart = ({cart,setCart,setorderPlaced}) =>{
    const navigate = useNavigate()
    const [customeraddress,setcustomeraddress] = useState('')
    const [showsummary, setshowsummary] = useState('hide')
    const [showstatus, setshowstatus] = useState('hide')
    const [apiquery, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const {user,kitchenselecteduid,kitchenselectedname} = useContext(UserContext)
    const order = []
    let  totalprice = 2.99 + 7.46
    
    useEffect(() => {
    const getData = async () => {
    
            try {
                const userRef = collection(db, 'order');
                const userQuery = query(userRef, where('customerinfo', '==', user.email));
                await getDocs(userQuery).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                       navigate("/CustomerOrderStatus")
                    }
                    else{
                        setshowsummary('')
                        setshowstatus('hide')
                    }
                })    
                
        } catch (error) {
            console.error('Error fetching admins: ', error);    
        }  
    }
    getData()
}, [])

    const handleDeleteItem = (index) =>{
        if(showstatus == ""){
            const newData = window.prompt('You want to update the order. Say yes or no')
        }
        else{
            if(cart.length === 1){
                setCart([])
            }
            else if(index > 0){
            const arr1 = cart.slice(0,index)
            const arr2 = cart.slice(index+1)
            setCart([...arr1,...arr2])
            }
            else{
            const arr2 = cart.slice(index + 1)
            setCart([...arr2])
            }

        }
    
    }

    const handleAddress = async(e) =>{
        const value = e.target.value;
        setQuery(value);
        try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(response.data);
        } catch (error) {
        console.error('Error fetching address suggestions:', error);
        }
        //setcustomeraddress(e.target.value)
    }

    const handleSelectAddress = (address) => {
        console.log(address)
        setQuery(address.display_name);
        setSuggestions([]);
        setcustomeraddress(address.display_name)
        // Do something with the selected address, like storing it in state
    };
    
    const handleOrderSubmission = async() =>{
        {
            // Add a new document to Menu.
            const docRef = await addDoc(collection(db, "order"), {
                kitchenuid:kitchenselecteduid,
                kitchenName:kitchenselectedname,
                order:order,
                customerinfo:user.email,
                orderStatus:"recieved",
                customeraddress:customeraddress
              });
              setshowsummary('hide')
              setshowstatus('')
              setorderPlaced(true)
          }
    }
    return(
        <div className='kitchencontainer'>
        <Header/>
        <h3>Shopping Cart</h3>
        <div className="kitchenMenu">
            <div className='tm-tab-content'>
                <div className={`tm-list `}>
                    { cart.map((menuItem,index) =>{
                        totalprice = parseFloat(totalprice) + parseFloat(menuItem.price)
                        order.push(menuItem.item)
                        return(
                            <div className={`tm-list-item ${showsummary}`} key={`ShoppingCart-${index}`}>
                                <img src={menuItem.itemimagelink} alt="Image" className="tm-list-item-img"/>
                                <div className="tm-black-bg tm-list-item-text">
                                    <h5 className='tm-list-item-name'>{menuItem.item} 
                                    <span  className="tm-list-item-price material-symbols-outlined" onClick={() => handleDeleteItem(index)}>
                                        delete
                                    </span>
                                    </h5>
                                    <p>{menuItem.price}</p>
                                </div>
                            </div>  
                            
                        )
                    })
                    }

                    <div className={`booking ${showsummary}`}>
                        <h4>Total of your order</h4>
                        <p>Please enter your delivery address</p>
                        <input type="text" value={apiquery}  onChange={(e) => handleAddress(e)}/>
                        <ul>
                            {suggestions.map((address) => (
                            <li key={address.place_id} onClick={() => handleSelectAddress(address)}>
                                {address.display_name}
                            </li>
                            ))}
                        </ul>
                        <p>Delivery Fee:              $2.99 </p>
                        <p>Fees and Estimated Tax:    $7.46</p>
                        <p>Total :                    ${totalprice}</p>
                        <button onClick = {() => handleOrderSubmission()}>Submit order</button>
                    </div>
                    <div className={`orderstatus ${showstatus}`}>
                        <h4>Status of your order</h4>
                        <p>Your Order is sent</p>
                        <button><Link to={"/CustomerOrderStatus"}>View Your order Status on this link</Link></button>
                    </div>
                </div>
            </div>      
        </div>
        <Footer/>
    </div>
   
    )
}
ShoppingCart.propTypes = {
    setkitchenselectedname:PropTypes.func,
    setkitchenselecteduid:PropTypes.func,
    kitchenselecteduid:PropTypes.string,
    kitchenselectedname:PropTypes.string,
    cart:PropTypes.arrayOf(
    PropTypes.shape({
        item:PropTypes.string,
        wait:PropTypes.string,
        itemimagelink:PropTypes.string,
        price:PropTypes.string
    }),
    ).isRequired,
    setCart:PropTypes.func,
    setorderPlaced:PropTypes.func
  };

export default ShoppingCart;