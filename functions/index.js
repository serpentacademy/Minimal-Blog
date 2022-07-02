var functions = require('firebase-functions');
var admin = require('firebase-admin');
var fs = require('fs');
var path = require('path');
var app = admin.initializeApp();
// Getting and replacing meta tags
exports.posts = functions.https.onRequest(function (request, response) {
    // Error 404 is false by default
    // Getting the path
    //const path = request.path ? request.path.split('/') : request.path;
    console.log("path: " + __dirname.toString());
    var path1 = path.resolve(__dirname, './build/index.html');
    try {
        if (fs.existsSync(path1)) {
            //file exists
            console.log("exists");
        }
    }
    catch (err) {
        console.error(err);
    }
    var index = fs.readFileSync(path.resolve(__dirname, './build/index.html')).toString();
    //const index = fs.readFileSync('./build/index.hml',
    //  {encoding:'utf8', flag:'r'}).toString();
    // Changing metas function
    console.log(index);
    var setMetas = function (title, description) {
        index = index.replace('TWITTER_DYNAMIC_TITLE', title);
        index = index.replace('TWITTER_DYNAMIC_DESC', description);
        index = index.replace('TITLE', title);
    };
    setMetas('God', 'God desc 33');
    response.status(200).send(index);
});
