import logo from './logo.svg';
import './App.css';
import Navbar from './Side/Navbar';
import Video from './Components/Video';
import Home from './Components/Home';
import { Route,Routes } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const[sidebar,setSidebar]=useState(true);
  return (
    <>
    <Navbar setSidebar={setSidebar}/>
   <Routes>
    <Route path='/'element={<Home sidebar={sidebar}/>}/>
    <Route path='/video/:categoryId/:videoId'element={<Video/>}/>
   </Routes>
    </>
  );
}

export default App;
