import React, { useState } from 'react'
import { InputComponent } from '../common/Input'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Button} from '../common/Button'
import { toast } from 'react-toastify';
import { FileSelector } from '../common/File/FileSelector';
import {auth, db, storage} from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


export const CreatePodcastForm = () => {

  const [title, setTitle]= useState('')
  const [desc, setDesc]= useState('');
  const [genere, setGenere]= useState('');
  const [displayImage, setDisplayImage]= useState('');
  const [bannerIamge, setBanner]= useState('');

  const [load, setLoading]= useState(false);

  const navigate=useNavigate()
  const dispatch= useDispatch()

  const handleSubmit= async ()=>{
  if(title && desc && displayImage && bannerIamge){
    toast.success('Handleing Form')
    setLoading(true)
    try {
      const bannerImageRef= ref(
        storage, 
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
      );
      await uploadBytes(bannerImageRef, bannerIamge);
      
      const bannerImageUrl= await getDownloadURL(bannerImageRef)

      const displayImageRef= ref(
        storage, 
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
      );
  
      await uploadBytes(displayImageRef, displayImage);
      
      const displayImageUrl= await getDownloadURL(displayImageRef)

      const podCastData= {
        title:title,
        description:desc,
        bannerIamge:bannerImageUrl,
        displayImage:displayImageUrl,
        createdBy:auth.currentUser.uid,
        genere:genere,
      }

     const docRef= await addDoc(collection(db, 'podcasts'), podCastData);
      setTitle('');
      setDesc('');
      setBanner('');
      setDisplayImage('');
      setGenere('');
      toast.success('Podcast Created')
      setLoading(false)
      navigate('/podcast')
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }else{
    toast.error('Please Provide all the required Data')
    setLoading(false)
  }

}

  const bannerImageFun=(file)=>{
    setBanner(file)
  }

  const displayImageFun=(file)=>{
    setDisplayImage(file)
  }

  return (
    <div className='pod'>
       <InputComponent state={title} setState={setTitle} 
            placeholder='Title' type='text' required={true}
        />

        <InputComponent state={desc} setState={setDesc} 
            placeholder='Description' type='text' required={true}
        />

        <label for="cars">Choose a Genere:</label>

        <select id="cars" onChange={(e)=> setGenere(e.target.value)} value={genere}>
          <option value="sports">Sports</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="fiction">Fiction</option>
      </select>

        <FileSelector accept={'image/*'} id='display-image' fileHandle={displayImageFun} text='Select Display Image' />  
        <FileSelector accept={'image/*'} id='banner-image' fileHandle={bannerImageFun} text='Select Banner Iamge'/>  
        <Button text={load ? 'Loading..' : 'Create Podcast'} disabled={load} onClick={handleSubmit}/>
    </div>
  )
}
