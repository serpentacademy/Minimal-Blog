import {Link} from 'react-router-dom'
import db from './firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from 'react'
import { title } from 'process';
function Post() {
  let [title, setTitle] = useState("")
  let [slug, setSlug] = useState("");
  let [loadB, setLoadB] = useState(false)
  useEffect(() => {
    if (loadB){
      return
    }else{
      loadB = true
      setLoadB(loadB)
      const getPosts = async () => {
        let currentpathName = window.location.pathname;
        console.log("pathname: "+ currentpathName)
        // /p/1
        slug = currentpathName.substring(3, currentpathName.length-1)
        setSlug(slug)
        console.log("slug: "+slug)
        
        const docRef = doc(db, "posts", slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          title = docSnap.data().title
          setTitle(title)
        
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
        getPosts()
    }
  

 

  
  },[]);
  async function GetPost(){


  }

    return (
      <>
        <main>
          <h2>{title}</h2>
          <p>I believe in you.</p>
        </main>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </>
    );
  }
  export default Post;