import React, { useState } from 'react'
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


  return (
    <div className='navbar'>
    <div className="grad"></div>
        <div className="links">
         <Link className={currentPath=='/' ? 'active' : ""} to='/'>Sign Up</Link>
         <Link  to='/podcast'>Podcasts</Link>
         <Link  to='/create-a-podcast'>Create a Podacst</Link>
         <Link  to='/profile'>Profile</Link>
        </div>
        <IoMenu id='icon' onClick={toggleMenu}/>
        <div className={`mini ${isMenuOpen ? 'open' : ''}`}>
        <Link className={currentPath=='/' ? 'active' : ""} to='/'>Sign Up</Link>
         <Link  to='/podcast'>Podcasts</Link>
         <Link  to='/create-a-podcast'>Create a Podacst</Link>
         <Link  to='/profile'>Profile</Link>
        </div>
    </div>
    
  )
}
