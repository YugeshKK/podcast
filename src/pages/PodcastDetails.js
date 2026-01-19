import React, { useEffect, useState } from 'react'
import { Header } from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { EpisodeDetails } from '../components/common/Episode';
import AudioPlayer from '../components/common/Podcast/AudioFile';
import { useLocation } from 'react-router-dom';

export const PodcastDetails = () => {
    const {id}= useParams();
    const [podcast, setPodcast]= useState({})
    const navigate= useNavigate();
    const [episode, setEpisode]= useState([]);
    const [playFile, setFile]= useState('');
    const location = useLocation();    

    const mongoId= localStorage.getItem('mongoUserId');
    console.log(mongoId)
    const API_URL = "https://podcast-backend-zbz1.onrender.com";
    const getData= async ()=>{
      try {
        fetch(`${API_URL}/api/podcasts/${id}`)
          .then(res => res.json())
          .then(data => setPodcast(data));
        } catch (error) {
          toast.error('No such Podcast')
          navigate('/podcast')
        }
    }

    useEffect(()=>{
      getData();
    }, [location.pathname])
    
    useEffect(() => {
       fetch(`${API_URL}/api/episodes/${mongoId}`)
          .then(res => res.json())
          .then(data => setEpisode(data));
    }, [mongoId, location.pathname]);
    
  return (
    <div>
        <Header />
        <div className='tit'>
        <h1>{podcast.title}</h1>
        {podcast.createdBy === mongoId && (
            <button onClick={()=> navigate(`/podcast/${podcast.createdBy}/create-episode`)}>Create Episode</button>
        )} 
        </div>
        <div className="wrapper">
            {podcast.createdBy && (
               <div className='details'>
               <div className="banner-wrapper">
                <img src={podcast.displayImage} alt="" />
               </div>
               <p>{podcast.description}</p>
               <h1>Episodes</h1>
               <p>{episode.length>0 ? 
                <div className='sanj'>
                  {episode.map((item, index)=>{
                    return <EpisodeDetails
                    key={index}
                    index={index+1}
                    title={item.title} description={item.description} audioFile={item.audioFile}
                    onClick={(file)=> setFile(file)} />
                  })}
                </div>
                : <p>No episode</p> }</p>
               </div>
            )}
        </div>
        <div>
          {playFile ? <AudioPlayer audioSrc={playFile} image={podcast.displayImage}/> : ""}
        </div>
    </div>
  )
}
