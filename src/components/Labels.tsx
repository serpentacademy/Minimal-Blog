import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { collection, query, where, getDoc, DocumentData, doc } from "firebase/firestore";
import db from "../firebase"
function Labels() {

    let [slug, setSlug] = useState("")
    let [load, setLoad] = useState(false)
    let [posts, setPosts] = useState<any>([])
    let [listItems, setListItems] = useState<any[]>([])
    let [labels, setLabels] = useState<string[]>([])
    

    useEffect(() => {
        let currentpathName = window.location.pathname;
        console.log("pathname: "+ currentpathName)
        // /category/1
        slug = currentpathName.substring(10, currentpathName.lastIndexOf("/"))
        setSlug(slug)
        const getPosts = async () => {


          const docRef = doc(db, "labels", "list");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPosts(docSnap.data());
            setLabels(docSnap.data()["labels"])

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
<h1>Labels: </h1>
<ul> 
        {labels.map(d => (<a href={"/label/"+d+"/" } key={d}> <li >{d}</li></a>))} 
                </ul>



       </div>
       
      </>
    );
  }
  export default Labels;