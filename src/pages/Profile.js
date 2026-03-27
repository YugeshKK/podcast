import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { Header } from '../components/common/Header';
import { doc, getDoc } from 'firebase/firestore';
import { PodcastCard } from '../components/common/Podcast/PodcastCard';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Profile = () => {
  const [data, setData]=useState();
  const podcasts= useSelector((state)=> state.podcasts.podcasts);
  const userg=   useSelector(state=> state.user.user);
  const [user]= useAuthState(auth);


  const userId=userg?.uid;
  const mongoId= localStorage.getItem('mongoUserId');


  if(!user.isAnonymous){
        if(!userg){
      return <p>Loading...</p>
    }
    if(!podcasts){
      return <p>Loading...</p>
    }
  }
  
  console.log(userId, podcasts);


  const handleLogout=()=>{
    signOut(auth).then(()=>{
      toast.success('User Logged Out!')
    })
    .catch((error)=>{
      toast.error('Something went wrong' + error)
    })
  }

  return (
    <div>
    <Header />
    {!user.isAnonymous ? (
      <>
        <div className='btn'>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="img-wrapper">
          <h1>{user.name}</h1>
          <img src={user.profile} alt="" />
        </div>
        <h3>Your Podcasts</h3>
        <div className="your">
          {podcasts.length>0  ? (
            <div className='podcast-flex'>
              {podcasts.map((item)=>
                item.createdBy==mongoId ? <PodcastCard  key={item.id}  title={item.title} displayImage={item.displayImage} /> : null
              )}
            </div>
          )
           : <p>Not Found</p> }
        </div>
      </>
    ) :
      <div style={{textAlign:'center'}}>
        <h1>Welcome Guest</h1>
         <p>Please Sign Up or Login to start creating your own podacsts.</p>
         <div className='guest-vector'></div>
      </div>
    }
    </div>
  )
}
