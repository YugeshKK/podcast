import { signOut } from 'firebase/auth';
import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { Header } from '../components/common/Header';

export const Profile = () => {
  const user= useSelector(state=> state.user.user);
  if(!user){
    return <p>Loading...</p>
  }

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
     {user.name}
     <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
