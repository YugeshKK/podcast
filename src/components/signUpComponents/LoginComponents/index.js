import React, {useState} from 'react'
import { InputComponent } from '../../common/Input';
import { Button } from '../../common/Button';
import {auth, db} from '../../../firebase'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const LoginForm = () => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('');
    const [load, setLoad]= useState(false)
    const userPro=   useSelector(state=> state.user.user);

    const dispatch= useDispatch();
    const navigate= useNavigate();


    const handleLogin= async ()=>{
      console.log('login ')
     setLoad(true)
      if(password.length>0 || email.length>0){
        try {
          //Creating user's account
          const userCredential= await signInWithEmailAndPassword(
            auth, 
            email, 
            password
          );

          const user= userCredential.user;
         

          //Saving user details
         const userDoc= await getDoc(doc(db, 'users', user.uid))
         const userData= userDoc.data();
          // Save data in the redux, call the redux 
          dispatch(setUser({
            name:userData.name,
            email:user.email,
            uid:user.uid,
            profile:userPro.profile
          }));

          setLoad(false)
          toast.success('User Logged in successfully')
          navigate('/profile')
        } catch (error) {
          console.log(error)
          setLoad(false)
          toast.error(error.message)
        }
      }else{
        if(password.length<=0 || email.length<=0){
          toast.error('Please fill all the required fields')
        }
        setLoad(false)
      }
    
    }


  return (
    <>
    
            <InputComponent state={email} setState={setEmail} 
            placeholder='Email' type='email' required={true}
            />
            <InputComponent state={password} setState={setPassword} 
            placeholder='Pasword' type='password' required={true}

            />
            <Button text={load ? 'Loading' : 'Login'} onClick={handleLogin} disabled={load}/>
    </>
  )
}
