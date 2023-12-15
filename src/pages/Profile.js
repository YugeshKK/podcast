import React from 'react'
import { useSelector } from 'react-redux'

export const Profile = () => {
  const user= useSelector(state=> state.user.user);
  console.log(user)
  return (
    <div>
     {user.name}
    </div>
  )
}
