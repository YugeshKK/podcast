import React, { useState } from 'react'
import { Header } from '../components/common/Header'
import { SignUpForm } from '../components/signUpComponents/SignUp'
import { LoginForm } from '../components/signUpComponents/LoginComponents'
import { auth } from '../firebase'
import { signInAnonymously } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {

    const [flag, setFlag]= useState(false);
    const navigate = useNavigate();

    async function guestLogin(){
      const guestId= await signInAnonymously(auth);
      navigate('/podcast')
    }

  return (
    <div className='bg'>
        {/* <Header/> */}
        <div className='wrapper'>
        <div className="bg-div">
            <h1 className='anime'>Welcome to Podcast Platform</h1>
           <h2 className='anime'>Tell your amazing story and share it with the world</h2>
        </div>

        <div className='g-div'>
          <div>
            <div className='vector'></div>
          </div>
          <div className='sign-div'>
            {!flag ? <h1>Sign Up</h1> : <h1>Login</h1>}
            {!flag ? <SignUpForm /> : <LoginForm />}
            {!flag ? 
              <p onClick={()=> setFlag(!flag)}>Already have an account. click here to Login</p> :
              <p onClick={()=> setFlag(!flag)}>Don't have an account. click here to SignUp</p>
              }
              <button onClick={()=> guestLogin()} className='guest-btn'>Continue as a guest</button>
          </div>
        </div>
        </div>

    </div>
  )
}
