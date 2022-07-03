const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const url = require('url');

const path = require('path');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


var app = admin.initializeApp();
const db = getFirestore();

// Getting and replacing meta tags
exports.posts = functions.https.onRequest((request:any, response:any) => {
    
    // Error 404 is false by default
        
    // Getting the path
    //const path = request.path ? request.path.split('/') : request.path;
   

    console.log("path: "+__dirname.toString())
    const path1 = path.resolve(__dirname,'./build/index.html')

try {
  if (fs.existsSync(path1)) {
    //file exists
    console.log("exists")
  }
} catch(err) {
  console.error(err)
}
    let index = fs.readFileSync(path.resolve(__dirname,'./build/index.html')).toString();
    //const index = fs.readFileSync('./build/index.hml',
            //  {encoding:'utf8', flag:'r'}).toString();

    // Changing metas function
   // console.log(index)
    const setMetas = (titleS:string, descriptionS:string, imageS:string,urlS:string  ) => {
        
        index = index.replace('TWITTER_DYNAMIC_TITLE', titleS);
        index = index.replace('TWITTER_DYNAMIC_DESC', descriptionS);
        index = index.replace('TWITTER_DYNAMIC_DESC', descriptionS);
        index = index.replace('OG_URL', urlS);
        index = index.replace('OG_TITLE', titleS);
        index = index.replace('OG_DESCRIPTION', descriptionS);
        index = index.replace('OG_IMAGE', imageS);


        
    }
    
    async function getMetaTags(){
      const path = url.parse(request.url).path;
      const slug = path.substring(3, path.length -1)
      console.log(slug+", "+ path)

      const cityRef = db.collection('meta_tags').doc(slug);
      const doc = await cityRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        //console.log('Document data:', doc.data());
        setMetas(doc.data().OG_TITLE,doc.data().OG_DESCRIPTION, doc.data().OG_IMAGE,doc.data().OG_URL);
        response.status(200).send(index);

      }

      
    }

getMetaTags()
 
    
});