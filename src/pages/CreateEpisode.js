import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { InputComponent } from '../components/common/Input';
import { FileSelector } from '../components/common/File/FileSelector';
import { toast } from 'react-toastify';
import { Button } from '../components/common/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const CreateEpisode = () => {
  const [title, setTitle]= useState("")
  const [desc, setDesc]= useState('')
  const [audioFile, setAudioFile]= useState();
  const [load, setLoad]= useState(false);

  const navigate=useNavigate()
  const dispatch= useDispatch();
  
  const {id}= useParams();

  const audioFileHandle=(file)=>{
    setAudioFile(file)
  };

  const handleSubmit= async ()=>{
    setLoad(true)
    if(title, desc, audioFile){
      try {
        const audioRef= ref(
          storage, 
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioUrl= await getDownloadURL(audioRef);
        const episodeData={
          title:title,
          description:desc,
          audioFile:audioUrl
        }
        await addDoc(
          collection(db, 'podcasts', id, 'episodes'),
          episodeData
        )
        toast.success('Episode created');
        setLoad(false);
        navigate(`/podcast/${id}`);
        setTitle('');
        setDesc('');
        setAudioFile('');

      } catch (error) {
        toast.error(error.message)
        setLoad(false)
      }
    }else{
      toast.error('Provide all neccessary fields')
      setLoad(false)
    }
  }
  return (
    <div>
      <Header />
      <div className="wrapper">
        <h1>Create an Episode</h1>
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder='Title'
          type='text'
          required={true}
        />

<InputComponent
          state={desc}
          setState={setDesc}
          placeholder='Description'
          type='text'
          required={true}
        />
        <FileSelector 
          accept={'audio/*'}
          id='audio-file-input'
          fileHandle={audioFileHandle}
          text='Upload Audio File'
        />

      <Button 
        text={load ? 'Loading' : 'Create'} 
        onClick={handleSubmit}
        disabled={load}/>
      </div>
    </div>
  )
}
