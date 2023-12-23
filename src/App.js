import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import { auth, db } from './firebase';
import { PrivateRoutes } from './components/common/PrivateRoutes';
import { CreateaPodCast } from './pages/CreateaPodCast';
import { Podcasts } from './pages/Podcasts';
import { PodcastDetails } from './pages/PodcastDetails';
import { CreateEpisode } from './pages/CreateEpisode';
import { ResetPassword } from './pages/ResetPassword';

function App() {

const dispatch= useDispatch();

  useEffect(() => {
    const authUnsubscribe= onAuthStateChanged(auth, (user)=>{
      if(user){
        const unsubscribesnapshot= onSnapshot(
          doc(db, 'users', user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData= userDoc.data();
              dispatch(setUser({
                name:userData.name,
                email:userData.email,
                uid:user.uid
              }))
            }
          },
          (error)=>{
            console.log("Facing Error" + error)
          }
        );

        return ()=>{
          unsubscribesnapshot();
        }
      }
    });
    
    return()=>{
      authUnsubscribe();
    }

  }, [])
  
  return (
    <div className="App">
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element=<SignUp/> />

        <Route element=<PrivateRoutes/> >
        <Route path='/profile' element=<Profile/> />
        <Route path='/create-a-podcast' element=<CreateaPodCast/> />
        <Route path='/podcast' element=<Podcasts/> />
        <Route path='/podcast/:id' element=<PodcastDetails/> />
        <Route path='/podcast/:id/create-episode' element=<CreateEpisode/> />
        </Route>
        <Route path='/reset-pass' element=<ResetPassword/> />
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
