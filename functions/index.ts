const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');


var app = admin.initializeApp();

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
    console.log(index)
    const setMetas = (title:string, description:string  ) => {
        
        index = index.replace('TWITTER_DYNAMIC_TITLE', title);
        index = index.replace('TWITTER_DYNAMIC_DESC', description);
        index = index.replace('TITLE', title);

        
    }
    
    setMetas('God', 'God desc 33');
    response.status(200).send(index);


 
    
});