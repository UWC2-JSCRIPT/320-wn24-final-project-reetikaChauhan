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
import { useContext } from 'react';
import UserContext from '../usercontext';



const auth = firebase.auth();


const ChatroomClient = () =>{
    //const [user] = useAuthState(auth);
    const [customerorderstatus,setcustomerorderstatus] = useState({})
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
   
    useEffect(() => {
    const getData = async () => {
            try {
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
        {user.uid && 
         <div className="App">
            <header>
            <a href="/" >Home</a>
                <SignOut />
            </header>
            <section>
                <ChatRoom />
            </section>
        </div>
        }
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
      <button className="sign-out" onClick={() => {
        auth.signOut() 
        navigate("/")
        }}>Sign Out</button>
    )
  }

export default ChatroomClient