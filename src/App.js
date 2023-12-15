import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element=<SignUp/> />
        <Route path='/profile' element=<Profile/> />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
