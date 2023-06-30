import React from 'react'
import { MDBIcon } from 'mdbreact';
import logo from '../Assets/telstra-black.png'

const Navbar = () => {
  return (
    
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  {/* <a className="navbar-brand fw-bold fs-4" href="navbar">Telstronics</a> */}
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
  <img src={logo} alt="Logo" style={{height:'60px', width:'70px'}} />
  <p style={{fontFamily:'Sora', fontWeight: '300px',color: '#676767'}}>Telstronics</p>
  </div>
  <form className="d-flex ms-1">

    

  </form>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
      
        <li className="nav-item me-4">
        
          <a className="nav-link active" aria-current="page" style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: '700',fontSize: '18px', color: '#676767'}} href="/">HOME</a>
        </li>
        <li className="nav-item me-4">
          <a className="nav-link" style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: '700',fontSize: '18px', color: '#676767'}} href="/shop">SHOP</a>
        </li>
        <li className="nav-item me-4">
          <a className="nav-link" style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: '700',fontSize: '18px', color: '#676767'}} href="/contact">CONTACT</a>
        </li>
        <li className="nav-item me-4">
          <a className="nav-link" style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontWeight: '700',fontSize: '18px', color: '#676767'}} href="/aboutus">ABOUT US</a>
        </li>

      
      </ul>
     
      <div className='buttons'>
        <a href="/cart"  >
        <MDBIcon style={{fontSize:'30px',color:'#676767',paddingRight:'10px'}} className='me-4' icon='cart-plus' /></a>
        <a href="/signup" >
        <MDBIcon style={{fontSize:'30px',color:'#676767',paddingRight:'10px'}} className='me-4' icon='user-circle' /></a> 
        
      </div>
    </div>
  </div>
</nav>
  );
};
export default Navbar;