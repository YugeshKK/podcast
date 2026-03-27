import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'
import { IoMenu } from "react-icons/io5";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

export const Header = () => {
  const location= useLocation()
  const currentPath= location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [loggedIn, setLoggedIn]= useState(false);
  const [user]= useAuthState(auth);


  return (
    <div className='navbar'>
      <div className="grad"></div>
      <div className="links">
        {user && (
          <>
            <Link className={currentPath === '/' ? 'active' : ""} to='/'>Sign Up</Link>
            <Link to='/podcast'>Podcasts</Link>
           {user.isAnonymous ? '' : <Link to='/create-a-podcast'>Create a Podcast</Link>}
            <Link to='/profile'>Profile</Link>
          </>
        )}
      </div>
      <IoMenu id='icon' onClick={toggleMenu}/>
      <div className={`mini ${isMenuOpen ? 'open' : ''}`}>
        {user && (
          <>
            <Link className={currentPath === '/' ? 'active' : ""} to='/'>Sign Up</Link>
            <Link to='/podcast'>Podcasts</Link>
            {user.isAnonymous ? '' : <Link to='/create-a-podcast'>Create a Podcast</Link>}
            <Link to='/profile'>Profile</Link>
          </>
        )}
      </div>
    </div>
  )
}
