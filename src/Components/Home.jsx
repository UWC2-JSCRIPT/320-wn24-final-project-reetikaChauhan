import '../App.css'
import KitchenDisplayonHomePage from './KitchenDisplay';
import Footer from './footer';
import Header from './header';
import PropTypes from "prop-types";

function Home({setkitchenselectedname,setkitchenselectedimage,setkitchenselecteduid}) {
  const myStyles = {
    WebkitTextStroke: '1px #dee2e6'
  };
  return (
    <>
      <section data-spy="scroll" data-target=".navbar" data-offset="51">
          <nav className="navbar fixed-top shadow-sm navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5">
            <a href="index.html" className="navbar-brand ml-lg-3">
                <h1 className="m-0 display-5"><span className="text-primary">Food</span>App</h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse px-lg-3" id="navbarCollapse">
                <div className="navbar-nav m-auto py-0">
                    <a href="/" className="nav-item nav-link active">Home</a>
                    <a href="/AdminSignIn" className="nav-item nav-link">Kitchen Register</a>
                    <a href="/CustomerOrderStatus" className="nav-item nav-link">Order</a>
                    <a href="#" className="nav-item nav-link">Contact</a>
                </div> 
            </div>
          </nav>
          <div className="container-fluid py-5" id="about">
              <div className="container">
                  <div className="position-relative d-flex align-items-center justify-content-center">
                      <h1 className="display-1 text-uppercase text-white" style={myStyles}>HOMEMADEFOOD</h1>
                      <h1 className="position-absolute text-uppercase text-primary">HOMEMADEFOOD</h1>
                  </div>
                  <div className="row align-items-center">
                      <div className="col-lg-5 pb-4 pb-lg-0">
                          <img className="img-fluid rounded w-100" src="https://www.upmenu.com/wp-content/uploads/2023/04/vegan3.jpg" alt=""/>
                      </div>
                      <div className="col-lg-7">
                          <h3 className="mb-4">Welcome to our Homemade Food Delivery App!</h3>
                          <p>Living away from home often means missing out on the comfort and nourishment of homemade meals. But fret not! Our Homemade Food Delivery App bridges the gap, connecting those craving homemade goodness with talented home cooks eager to share their culinary creations.</p>
                          <a href="" className="btn btn-outline-primary mr-4">Hire Me</a>
                          <a href="" className="btn btn-outline-primary">Learn More</a>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container-fluid pt-5" id="service">
            <div className="container">
                <div className="position-relative d-flex align-items-center justify-content-center">
                    <h1 className="display-1 text-uppercase text-white" style={myStyles}>Kitchens</h1>
                    <h1 className="position-absolute text-uppercase text-primary">Kitchens</h1>
                </div>
                <KitchenDisplayonHomePage setkitchenselectedname={setkitchenselectedname} setkitchenselectedimage={setkitchenselectedimage} setkitchenselecteduid={setkitchenselecteduid}/>
            </div>
          </div>
        <Footer/>
      </section>
    </>
  )
}

Home.propTypes = {
  setkitchenselectedname:PropTypes.func,
  setkitchenselectedimage:PropTypes.func,
  setkitchenselecteduid:PropTypes.func,
};

export default Home
