import React, { useRef, useState } from 'react'
import './styles.css';
import { Button } from '../Button';

export const EpisodeDetails = ({title, description, audioFile, index, onClick }) => {

  return (
    <div className='epi'>
        <h1>{index} . {title}</h1>
        <p>{description}</p>
        <Button  text='Play' onClick={()=>onClick(audioFile)} />
    </div>
  )
}
