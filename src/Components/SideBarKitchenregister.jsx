import '../App.css'
import { useNavigate,Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const SideBar = () =>{
   
    const navigate = useNavigate()
//     const config = {
//       apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//       authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//       projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//       // ...
//   };
//   firebase.initializeApp(config);
  
  
  
  return(<>
        <div className="displayStep">
            <div className="circle">
                <div className="circle1"><Link to={"/MenuDashboard"}><p>1</p></Link></div>
                <div className="circle2" ><Link to={"/KitchenRegister"}><p>2</p></Link></div>
                <div className="circle3" ><Link to={"/KitchenOrders"}><p>3</p></Link></div>
                <div className="circle4"><span onClick={() =>{
                firebase.auth().signOut();
                navigate("/")
            } }>4</span></div>
            </div>
            <div className="steps">
                <div className="step1">
                    <span><Link to={"/MenuDashboard"}>MENU</Link></span>
                </div>
                <div className="step1">
                    <span><Link to={"/KitchenRegister"}>ADD TO MENU</Link></span>
                </div>
                <div className="step1">
                    <span><Link to={"/KitchenOrders"}>Orders</Link></span>
                </div>
                <div className="step1">
                    <span onClick={() =>{
                firebase.auth().signOut();
                navigate("/")
            } }>   SIGN OUT</span>
                </div>
            </div>
        </div>
  
  </>)
}

export default SideBar;