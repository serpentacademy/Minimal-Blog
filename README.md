<p>Minimal Blog built with Firebase, Firestore, React, Cloud Functions Social Meta Tags</p>
<a href ="https://serpent.academy">Serpent Academy</a>

<h2>INSTRUCTIONS</h2>
<h3>Firebase Firestore security rules<h/3>
<code>rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
     
      match /categories/{doc} {
      allow read: if true	;
     
    }
       match /posts/{doc} {
      allow read: if true	;
     
    }
    match /labels/{doc} {
    allow read: if true;
    }
    }
   
  }
}</code>