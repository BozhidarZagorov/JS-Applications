import {signOut} from "firebase/auth"
import {auth} from "../config/firebaseInit.js"
import page from "../lib/page.js"

export default async function(ctx) {
   await signOut(auth)
   page.redirect('/')
}