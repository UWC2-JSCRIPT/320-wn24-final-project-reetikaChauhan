import '../App.css'
import KitchenDisplayonHomePage from './KitchenDisplay';
import Footer from './footer';
import Header from './header';
function Home({setkitchenselectedname,setkitchenselectedimage,setkitchenselecteduid}) {
  
  return (
    <>
       <Header/>
        <KitchenDisplayonHomePage setkitchenselectedname={setkitchenselectedname} setkitchenselectedimage={setkitchenselectedimage} setkitchenselecteduid={setkitchenselecteduid}/>
       <Footer/>
    </>
  )
}

export default Home
