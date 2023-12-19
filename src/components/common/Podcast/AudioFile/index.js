import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import {FaPause, FaPlay, FaVolumeMute, FaVolumeUp} from 'react-icons/fa'

export default function AudioPlayer({image, audioSrc}) {
    const ref= useRef(null);
    const [isPlaying, setIsplaying]= useState(true);
    const [isMute, setIsMute]= useState(true);
    const [duration , setDuration]= useState();
    const [currentTime, setCurrent]= useState(0);
    const[volume, setVolume]= useState(0.5);

    const togglePlay=()=>{
        if(isPlaying){
            setIsplaying(false)
        }else{
            setIsplaying(true)
        }
    }

    const toggleMute=()=>{
        if(isMute){
            setIsMute(false)
        }else{
            setIsMute(true)
        }
    }
    const handleDuration=(e)=>{
        setCurrent(parseFloat(e.target.value))
        ref.current.currentTime=e.target.value;
    }

    const handleVolume=(e)=>{
        setVolume(e.target.value)
        ref.current.volume=e.target.value;
    }


    useEffect(() => {
      const audio= ref.current;
      audio.addEventListener('timeupdate',handleTimeUpdate);
      audio.addEventListener('loadedmetadata',handleLoadedMetaData);
      audio.addEventListener('ended',handleEnded);
    
      return () => {
        audio.removeEventListener('timeUpdate',handleTimeUpdate);
        audio.removeEventListener('loadedmetadata',handleLoadedMetaData);
        audio.removeEventListener('ended',handleEnded);
      }
    }, [])

    const handleTimeUpdate=()=>{
        setCurrent(parseFloat(ref.current.currentTime))
    }

    const handleLoadedMetaData=()=>{
        setDuration(parseFloat(ref.current.duration))
    }

    const handleEnded=()=>{
        setCurrent(0);
        setIsplaying(false)
    }
    
    useEffect(()=>{
        if(isPlaying){
            ref.current.play();
        }else{
            ref.current.pause();
        }
    }, [isPlaying])


    useEffect(()=>{
        if(isMute){
            ref.current.volume=volume;
        }else{
            ref.current.volume=0;
        }
    }, [isMute])


  return (
    <div className='custom-audio-player'>
    <img src={image} alt="" />
    <audio ref={ref} src={audioSrc}></audio>
    <p onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/> }</p>
    <div className="duration-flex">
        <p>{currentTime.toFixed(2)}</p>
        <input type="range"
         onChange={handleDuration} 
         min={0}
         max={duration}
         step={0.01}
         value={currentTime}
         className='audio-range' />
        <p>- {(duration-currentTime).toFixed(2)}</p>
        <p onClick={toggleMute}>{isMute ? <FaVolumeUp/> : <FaVolumeMute/> }</p>
        <input type="range" 
        value={volume}
        max={1}
        min={0}
        step={0.5}
        onChange={handleVolume}
        className='volume-range'
        />
    </div>
    </div>
  )
}
