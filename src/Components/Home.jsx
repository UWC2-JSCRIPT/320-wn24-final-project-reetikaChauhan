import '../App.css'
import KitchenDisplayonHomePage from './KitchenDisplay';
import Footer from './footer';
import Header from './header';
import PropTypes from "prop-types";

function Home({setkitchenselectedname,setkitchenselectedimage,setkitchenselecteduid}) {
  
  return (
    <>
       <Header/>
        <KitchenDisplayonHomePage setkitchenselectedname={setkitchenselectedname} setkitchenselectedimage={setkitchenselectedimage} setkitchenselecteduid={setkitchenselecteduid}/>
       <Footer/>
    </>
  )
}

Home.propTypes = {
  setkitchenselectedname:PropTypes.func,
  setkitchenselectedimage:PropTypes.func,
  setkitchenselecteduid:PropTypes.func,
};

export default Home
