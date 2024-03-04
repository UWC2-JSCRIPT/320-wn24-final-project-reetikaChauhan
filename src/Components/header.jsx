import '../App.css'
import React from 'react';
const Header = () =>{
    return(
        <>
            <div className='top-head'>
                <a href='#'>Find a Kitchen</a>
                <p>|</p>
                <a href='#'>Help</a>
                <p>|</p>
                <a href='#'>Join us</a>
                <p>|</p>
                <a href='/AdminSignIn'>Register</a>
            </div>
            <div className='head'>
                <div className='navbar'>
                    <div className='bnb'>
                        <a href='/' className='bnb'><h4>HomeMadeFood</h4></a>
                    </div>
                    <div className='logins'>
                        <a href='/CustomerOrderStatus'className='byh'><h6>Status</h6></a>
                    </div>
                </div> 
                <div className='heading'>
                    <div className='head-text'> <h4>Learn About Guest Favourites, most loved food of HomeMadeFood</h4></div>
                </div>  
            </div>
        </>
    )
}
export default Header;
