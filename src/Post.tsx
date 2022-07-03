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
  let [image, setImage] = useState("https://www.arweave.net/elAbIMOD74awWYccK7wkGLmT-1O19Hqrq6aULqb5bo8?ext=gif")
  let [loadB, setLoadB] = useState(false)
  let [description, setDescription] = useState("")
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
          image = docSnap.data().image
          description = docSnap.data().description
          setTitle(title)
          setImage(image)
          setDescription(description)
        
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
        <img src={image} className="img-fluid" alt="..."/>

          <h2>{title}</h2>
          <p>{description}</p>
        </main>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </>
    );
  }
  export default Post;