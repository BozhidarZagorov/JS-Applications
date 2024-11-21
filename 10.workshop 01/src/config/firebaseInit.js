// Import the functions you need from the SDKs you need
// import { initializeApp } from "../../node_modules/firebase/firebase-app.js";
// import { getAuth } from "../../node_modules/firebase/firebase-auth.js";

import {initializeApp} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import {getAuth, setPersistence,browserLocalPersistence} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import page from "../lib/page.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI2k_pmZkq4ff6HtDmPUIIilFcKvy55XA",
  authDomain: "rent-a-cat-c2471.firebaseapp.com",
  projectId: "rent-a-cat-c2471",
  storageBucket: "rent-a-cat-c2471.firebasestorage.app",
  messagingSenderId: "280988520291",
  appId: "1:280988520291:web:57e8d3b5e6489e1eb80d56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
setPersistence(auth,browserLocalPersistence)
    .then(()=>{
        console.log('persistance');
        //refreshes  curr page when persistance is loaded
        page.redirect(location.pathname)
        
    })
    .catch(err=>{
        console.log('persistance err');
        
    })

export default app