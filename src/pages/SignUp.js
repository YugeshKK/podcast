import React, { useState } from 'react'
import { Header } from '../components/common/Header'
import { SignUpForm } from '../components/signUpComponents/SignUp'
import { LoginForm } from '../components/signUpComponents/LoginComponents'

export const SignUp = () => {

    const [flag, setFlag]= useState(false);

  return (
    <div>
        <Header/>
        <div className='wrapper'>
          {!flag ? <h1>Sign Up</h1> : <h1>Login</h1>}
          {!flag ? <SignUpForm /> : <LoginForm />}
          {!flag ? 
            <p onClick={()=> setFlag(!flag)}>Already have an account. click here to Login</p> :
            <p onClick={()=> setFlag(!flag)}>Don't have an account. click here to SignUp</p>
            }
        </div>

    </div>
  )
}
