import React, { useState } from 'react'
import { auth } from '../firebase';
import {getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { InputComponent } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';


export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate=useNavigate();


    const handleResetPassword = async () => {
      try {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
           setMessage('Password Email sent');
           navigate('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorMessage)
          });
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };
  return (
    <div className='wrapper'>
        <h2>Forgot Password ? Reset Here</h2>
      <label>
      <InputComponent placeholder='Enter Email' state={email} setState={setEmail} />
      </label>
      <Button text='Reset Password' onClick={handleResetPassword}/>
      {message && <p>{message}</p>}
    </div>
  )
}
