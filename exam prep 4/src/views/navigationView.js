import { baseRender,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js"

const headerElements = document.querySelector('#wrapper > header')

const template = (isAuthenticated) => html`
   <!-- Navigation -->
   <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt=""/></a>
        <nav>
          <div>
            <a href="/characters">Characters</a>
          </div>
          ${isAuthenticated
            ?
            html`
            <!-- Logged-in users -->
            <div class="user">
              <a href="addCharacter">Add Character</a>
              <a href="/logout">Logout</a>
            </div>
            `
            : html`
             <!-- Guest users -->
            <div class="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
            `
          }
        </nav>

`

export default function navigationView(ctx) {
    const userData = getUserData()
    const isAuthenticated = !!userData.accessToken
    
    
    baseRender(template(isAuthenticated), headerElements)
}