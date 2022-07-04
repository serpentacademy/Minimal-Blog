import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { collection, query, where, getDoc, DocumentData, doc } from "firebase/firestore";
import db from "../firebase"
function Categories() {

    let [slug, setSlug] = useState("")
    let [load, setLoad] = useState(false)
    let [posts, setPosts] = useState<any>([])
    let [listItems, setListItems] = useState<any[]>([])
    let [categories, setCategories] = useState<string[]>([])
    

    useEffect(() => {
        let currentpathName = window.location.pathname;
        console.log("pathname: "+ currentpathName)
        // /category/1
        slug = currentpathName.substring(10, currentpathName.lastIndexOf("/"))
        setSlug(slug)
        const getPosts = async () => {


          const docRef = doc(db, "categories", "list");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPosts(docSnap.data());
            setCategories(docSnap.data()["categories"])

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
         

            return posts


      
            

                    }
        if (!load){
            getPosts()
load = true
setLoad(load)
        }else{
          console.log("loaded")
        }
      


       

    

    }, [])

      

  

    return (
      <>
       <div>
<h1>Categories: </h1>
<ul> 
        {categories.map(d => (<a href={"https://serpent.academy/p/"+d } key={d}> <li >{d}</li></a>))} 
                </ul>



       </div>
       
      </>
    );
  }
  export default Categories;