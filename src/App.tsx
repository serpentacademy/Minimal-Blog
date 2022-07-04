import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Post from './Post'
import Menu from './Menu'
import Footer from './Footer';
import Category from './components/Category';
import Label from './components/Label';
import Categories from './components/Categories'
import Labels from './components/Labels'
//import db from './firebase';



function App() {

  

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/*" element={<Category />}/>
        <Route path="/categories/" element={<Categories />}/>
        <Route path="/labels/" element={<Labels />}/>


        <Route path="/label/*" element={<Label />}/>
        <Route path="/p/*" element={<Post />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
