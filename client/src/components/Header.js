import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const [value,setValue]=useState();
  const navigate = useNavigate();
  let doLogout = () => {
    localStorage.removeItem("react_app_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("id");
    navigate("/");
  };
  function MouseOver(event) {
    event.target.style.color = 'yellow';

  }
  function MouseOut(event){
    event.target.style.color="white";
  }
  return (
    <div>
     <div style={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,9,121,0.9752275910364145) 35%, rgba(0,212,255,1) 100%)"}}>
    <div className='container' >
    <nav class="navbar navbar-expand" >
  <h2 style={{color:'white' }}>Blog App</h2>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" style={{marginLeft:'auto',marginRight:'auto',fontWeight:'bold'}}>
      <Link style={{color:'white'}} to='/portal/allPosts' class="nav-link" onMouseOver={MouseOver} onMouseOut={MouseOut}>ALL BLOGS</Link>
      <Link style={{color:'white'}} to={`/portal/myPosts/${localStorage.getItem("id")}`} class="nav-link" onMouseOver={MouseOver} onMouseOut={MouseOut}>MY BLOGS</Link>
      <Link style={{color:'white'}} to='/portal/addPost' class="nav-link" onMouseOver={MouseOver} onMouseOut={MouseOut}>ADD BLOG</Link>
    </div>
    <button type="button" class="btn btn-danger" style={{marginLeft:'auto',borderRadius:20}} onClick={doLogout}>logout</button>
  </div>
</nav>
    </div></div>
    </div>
  )
}
export default Header

