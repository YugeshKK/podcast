import React, { useEffect, useState } from 'react'
import { Header } from '../components/common/Header'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcast } from '../slices/podCastSlice'
import { PodcastCard } from '../components/common/Podcast/PodcastCard'

export const Podcasts = () => {

    const dispatch= useDispatch();
    const podcasts= useSelector((state)=> state.podcasts.podcasts);
    const [search, setSearch]= useState('')




    useEffect(() => {
      const unsubscribe=onSnapshot(
        query(collection(db, 'podcasts')), 
        (querySnapShot)=>{
            const podcastData=[];
            querySnapShot.forEach((doc)=>{
                podcastData.push({id:doc.id, ...doc.data()})
            });
            dispatch(setPodcast(podcastData))
        }, 
        (err)=>{
            console.log('Error Message is' + err);
        }
      )
    
      return () => {
        unsubscribe();
      }
    }, [])


    var filteredData= podcasts.filter((item)=>
        item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
    
  return (
    <div>
        <Header />
        <div className="wrapper" style={{marginTop:'1rem'}}>
            <h1>Podcasts</h1>
            <input className='inpu' type="text" value={search}
                onChange={(e)=> setSearch(e.target.value)}
             />
            {filteredData.length>0 ? (
                <div className='podcast-flex'>
                {filteredData.map((item)=>{
                     return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage} />
                })}
                </div>
            )
             : <p>Not Found</p> }
        </div>
    </div>
  )
}
