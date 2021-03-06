import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Post from './Post'
import Menu from './Menu'
import Footer from './Footer';
import Category from './components/Category';
//import db from './firebase';



function App() {

  

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/*" element={<Category />}/>
        <Route path="/p/*" element={<Post />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
