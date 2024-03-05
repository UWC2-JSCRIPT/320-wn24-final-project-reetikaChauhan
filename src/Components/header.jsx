import React from 'react';
const Header = () =>{
    const myStyles = {
        WebkitTextStroke: '1px #dee2e6'
      };
    return(
        <>
        <section data-spy="scroll" data-target=".navbar" data-offset="51">
            <nav className="navbar fixed-top shadow-sm navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5">
            <a href="index.html" class="navbar-brand ml-lg-3">
                <h1 class="m-0 display-5"><span className="text-primary">HOME MADE</span>FOOD</h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse px-lg-3" id="navbarCollapse">
                <div className="navbar-nav m-auto py-0">
                    <a href="/" class="nav-item nav-link active">Home</a>
                    <a href="/AdminSignIn" class="nav-item nav-link">Kitchen Register</a>
                    <a href="//CustomerOrderStatus" class="nav-item nav-link">Order</a>
                    <a href="#" class="nav-item nav-link">Contact</a>
                </div>
                <a href="" class="btn btn-outline-primary d-none d-lg-block">Hire Me</a>
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
                        <img class="img-fluid rounded w-100" src="https://www.upmenu.com/wp-content/uploads/2023/04/vegan3.jpg" alt=""/>
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
        </section>
        </>
    )
}
export default Header;
