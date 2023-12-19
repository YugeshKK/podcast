import React, { useEffect, useState } from 'react'
import { Header } from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { EpisodeDetails } from '../components/common/Episode';
import AudioPlayer from '../components/common/Podcast/AudioFile';

export const PodcastDetails = () => {
    const {id}= useParams();
    const [podcast, setPodcast]= useState({})
    const navigate= useNavigate();
    const [episode, setEpisode]= useState([]);
    const [playFile, setFile]= useState('');


    useEffect(() =>{
      if(id){
        getData();
      }
    }, [])
    
    const getData= async ()=>{
        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
            setPodcast({id:id, ...docSnap.data()})
            toast.success('Podcast Found')
            }
          } catch (error) {
            toast.error('No such Podcast')
            navigate('/podcast')
          }
    }

    useEffect(() => {
      const unsubscribe= onSnapshot(
        query(collection(db, 'podcasts', id, 'episodes')),
        (querySnapShot)=>{
          const episodeData=[];
         querySnapShot.forEach((doc)=>{
          episodeData.push({id:doc.id, ...doc.data()})
         });
         setEpisode(episodeData);
        }, 
        (error)=>{
          console.log('error' + error)
        }
      )
    
      return () => {
        unsubscribe();
      }
    }, [id])
    
  return (
    <div>
        <Header />
        <div className='tit'>
        <h1>{podcast.title}</h1>
        {podcast.createdBy == auth.currentUser.uid && (
            <button onClick={()=> navigate(`/podcast/${podcast.id}/create-episode`)}>Create Episode</button>
        )} 
        </div>
        <div className="wrapper">
            {podcast.id && (
               <div className='details'>
               <div className="banner-wrapper">
                <img src={podcast.displayImage} alt="" />
               </div>
               <p>{podcast.description}</p>
               <h1>Episodes</h1>
               <p>{episode.length>0 ? 
                <>
                  {episode.map((item, index)=>{
                    return <EpisodeDetails
                    key={index}
                    index={index+1}
                    title={item.title} description={item.description} audioFile={item.audioFile}
                    onClick={(file)=> setFile(file)} />
                  })}
                </>
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
