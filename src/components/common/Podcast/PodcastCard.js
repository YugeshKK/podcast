import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';


export const PodcastCard = ({id, title, displayImage}) => {
  return (
    <Link to={'/podcast/${id}'}>
    <div className='podcast-card'>
        <img src={displayImage} alt="" />
        <h3>{title}</h3>
    </div>
    </Link>
  )
}
