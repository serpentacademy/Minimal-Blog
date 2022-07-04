import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import db from "../firebase"
function Category() {

    let [slug, setSlug] = useState("")
    let [load, setLoad] = useState(false)
    let [posts, setPosts] = useState<any[]>([])
    let [listItems, setListItems] = useState<any[]>([])
    

    useEffect(() => {
        let currentpathName = window.location.pathname;
        console.log("pathname: "+ currentpathName)
        // /category/1
        slug = currentpathName.substring(10, currentpathName.lastIndexOf("/"))
        setSlug(slug)
        const getPosts = async () => {

            const q = query(collection(db, "posts"), where("category_"+slug.toString(), "==", true));
            posts = []
            setPosts(posts)
            listItems = []
            setListItems(listItems)
            const querySnapshot = await getDocs(q);
            // querySnapshot.forEach((doc) => {
            //   let theDoc:DocumentData = doc.data()
            //   // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            //   theDoc.id = doc.id
            //   theDoc.slug = doc.id
            //   posts.push(theDoc)
            //   setPosts(posts)



              

            // });
            setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

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
<h1>Category: {slug}</h1>
<ul> 
        {posts.map(d => (<a href={"https://serpent.academy/p/"+d.slug } key={d.id}> <li >{d.title}</li></a>))} 
                </ul>



       </div>
       
      </>
    );
  }
  export default Category;