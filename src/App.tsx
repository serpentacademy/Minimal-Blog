import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Post from './Post'
//import db from './firebase';



function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/*" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
