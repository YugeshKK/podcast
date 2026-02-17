import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const location= useLocation()
  const currentPath= location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [loggedIn, setLoggedIn]= useState(false);

  useEffect(()=>{
     let ll= localStorage.getItem('loggedIn');
      setLoggedIn(ll);
  },[])

  return (
    <div className='navbar'>
    <div className="grad"></div>
        <div className="links">
        {loggedIn && <Link className={currentPath=='/' ? 'active' : ""} to='/'>Sign Up</Link> }
         <Link  to='/podcast'>Podcasts</Link>
         <Link  to='/create-a-podcast'>Create a Podacst</Link>
         <Link  to='/profile'>Profile</Link>
        </div>
        <IoMenu id='icon' onClick={toggleMenu}/>
        <div className={`mini ${isMenuOpen ? 'open' : ''}`}>
        {loggedIn && <Link className={currentPath=='/' ? 'active' : ""} to='/'>Sign Up</Link> }
         <Link  to='/podcast'>Podcasts</Link>
         <Link  to='/create-a-podcast'>Create a Podacst</Link>
         <Link  to='/profile'>Profile</Link>
        </div>
    </div>
    
  )
}
