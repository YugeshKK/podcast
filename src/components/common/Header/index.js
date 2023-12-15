import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'


export const Header = () => {
  const location= useLocation()
  const currentPath= location.pathname;

  return (
    <div className='navbar'>
    <div className="grad"></div>
        <div className="links">
         <Link className={currentPath=='/' ? 'active' : ""} to='/'>Sign Up</Link>
         <Link  to='/podcast'>Podcasts</Link>
         <Link  to='/start-a-podcast'>Start a Podacst</Link>
         <Link  to='/profile'>Profile</Link>
        </div>
    </div>
  )
}
