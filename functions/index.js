var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var functions = require('firebase-functions');
var admin = require('firebase-admin');
var fs = require('fs');
var url = require('url');
var path = require('path');
var _a = require('firebase-admin/firestore'), getFirestore = _a.getFirestore, Timestamp = _a.Timestamp, FieldValue = _a.FieldValue;
var app = admin.initializeApp();
var db = getFirestore();
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
    // console.log(index)
    var setMetas = function (titleS, descriptionS, imageS, urlS) {
        index = index.replace('TWITTER_DYNAMIC_TITLE', titleS);
        index = index.replace('TWITTER_DYNAMIC_DESC', descriptionS);
        index = index.replace('TWITTER_DYNAMIC_DESC', descriptionS);
        index = index.replace('OG_URL', urlS);
        index = index.replace('OG_TITLE', titleS);
        index = index.replace('OG_DESCRIPTION', descriptionS);
        index = index.replace('OG_IMAGE', imageS);
    };
    function getMetaTags() {
        return __awaiter(this, void 0, void 0, function () {
            var path, slug, cityRef, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = url.parse(request.url).path;
                        slug = path.substring(3, path.length - 1);
                        console.log(slug + ", " + path);
                        cityRef = db.collection('meta_tags').doc(slug);
                        return [4 /*yield*/, cityRef.get()];
                    case 1:
                        doc = _a.sent();
                        if (!doc.exists) {
                            console.log('No such document!');
                        }
                        else {
                            //console.log('Document data:', doc.data());
                            setMetas(doc.data().OG_TITLE, doc.data().OG_DESCRIPTION, doc.data().OG_IMAGE, doc.data().OG_URL);
                            response.status(200).send(index);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    getMetaTags();
});
