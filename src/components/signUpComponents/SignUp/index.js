import React, {useState} from 'react'
import { InputComponent } from '../../common/Input';
import { Button } from '../../common/Button';
import {auth, db, storage} from '../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileSelector } from '../../common/File/FileSelector';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



export const SignUpForm = () => {

    const [fullname, setFullName]= useState("")
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('');
    const [confirm, setConfirm]= useState('');
    const [profilePic, setProfilePic]= useState();
    const [load, setLoad]= useState(false);

    const dispatch= useDispatch()
    const navigate = useNavigate()

    const handleSignup= async()=>{
      console.log('login ')
      setLoad(true)
      if(fullname && email && password && confirm && profilePic){
        try {
          //Creating user's account
          const userCredential= await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
          );
          const user= userCredential.user;

          //Saving user details
          await setDoc(doc(db, 'users', user.uid), {
            name:fullname,
            email:user.email,
            uid:user.uid,
          })

          //set Profile Pic
          const profileRef= ref(
            storage,
            `profile/${auth.currentUser.uid}/${Date.now()}`
          );

          await uploadBytes(profileRef, profilePic);
          const profileUrl= await getDownloadURL(profileRef);

          const data={
            email:email,
            profilepic:profileUrl
          }
          await addDoc(collection(db, 'profile'), data);

          // Save data in the redux, call the redux 
          dispatch(setUser({
            name:fullname,
            email:user.email,
            uid:user.uid, 
            profile:profileUrl,
          }));

          setLoad(false)
          toast.success('User has been created')
          navigate('/profile')
        } catch (error) {
          setLoad(false);
          console.log("Error"+ error)
          toast.error(error.message);
        }
      }else{
        if(password!=confirm){
          console.log('not equal')
          toast.error('Password and Confirm password is not same')
        }else if(password.length<6){
          toast.error('Please make sure your password is 6 digits long')
        }else{
          toast.error('Please Enter all the fields')
        }
        setLoad(false)
      }
    }

    function setProfileFun(file){
      setProfilePic(file);
    }

  return (
    <>
         <InputComponent state={fullname} setState={setFullName} 
            placeholder='Full Name' type='text' required={true}
            />
            <InputComponent state={email} setState={setEmail} 
            placeholder='Email' type='email' required={true}
            />
            <InputComponent state={password} setState={setPassword} 
            placeholder='Pasword' type='password' required={true}
            />
            <InputComponent state={confirm} setState={setConfirm} 
            placeholder='Confirm Password' type='password' required={true}
            />
           <FileSelector accept={'image/*'} id='profile-image' fileHandle={setProfileFun} text='Add Profile Pic' />  
            <Button text={load ? 'Loading..' : 'Sign Up'} disabled={load} onClick={handleSignup}/>
    </>
  )
}
