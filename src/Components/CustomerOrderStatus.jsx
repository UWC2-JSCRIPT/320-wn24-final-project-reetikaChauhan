import "../styleChat.css"
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

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // ...
};
firebase.initializeApp(config);

const auth = firebase.auth();

//const analytics = firebase.analytics();

const CustomerOrderStatus = ({customer}) =>{
    const [user] = useAuthState(auth);
    const [customerorderstatus,setcustomerorderstatus] = useState({})
    const navigate = useNavigate()

   
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
         <div className="App">
            <header>
            <a href="/" >Home</a>
                <SignOut />
            </header>
            <div className="center-block">
                <button className="button"><h4>Order Status from {customerorderstatus.kitchenName} </h4></button>
                <p>Thank you for ordering from our kitchen.</p>
                <div className="p-content"><p>{customerorderstatus.orderStatus}</p></div>
            </div>
            <section>
                <ChatRoom />
            </section>
        </div>
        </>
    ) 
}

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = collection(db,'messages');
    const queryresp = query(messagesRef,orderBy('createdAt','asc'));
  
    const [messages] = useCollectionData(queryresp, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await addDoc(messagesRef,({
        text: formValue,
        createdAt: new Date(),
        uid,
        photoURL
      }))
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
  
      </main>
  
      <form onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>Send</button>
  
      </form>
    </>)
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p className="chatp">{text}</p>
      </div>
    </>)
  }
  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }


CustomerOrderStatus.propTypes = {
    customer: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  };

export default CustomerOrderStatus 