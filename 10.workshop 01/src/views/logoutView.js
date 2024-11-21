import {signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import {auth} from "../config/firebaseInit.js"
import page from "../lib/page.js"

export default async function(ctx) {
   await signOut(auth)
   page.redirect('/')
}