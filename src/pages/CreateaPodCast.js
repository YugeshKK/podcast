import React from 'react'
import { Header } from '../components/common/Header'
import { CreatePodcastForm } from '../components/createPodcastForm/CreatePodcastForm'


export const CreateaPodCast = () => {
  return (
    <div className='pp'>
        <Header/>
        <h1>Create a PodCast</h1>
       <CreatePodcastForm/>
    </div>
  )
}
