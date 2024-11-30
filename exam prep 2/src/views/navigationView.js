import { baseRender,html } from "../../lib/lit-html.js";
import { getUserData } from "../../utils/userUtils.js"

const headerElements = document.querySelector('#container > header')

const template = (isAuthenticated,username) => html`
  <!-- navigation -->
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/searchYear">By Year</a>
    ${isAuthenticated
      ? html`
      <!-- Logged users -->
      <div id="profile">
        <a>Welcome ${username}</a>
        <a href="/profile">My Listings</a>
        <a href="/createCar">Create Listing</a>
        <a href="/logout">Logout</a>
      </div>
      `
      : html `
      <!-- Guest users -->
      <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
      `
    }
    
    
</nav>`

export default function navigationView(ctx) {
    const userData = getUserData()
    const isAuthenticated = !!userData.accessToken
    const username = userData.username
    
    baseRender(template(isAuthenticated,username), headerElements)
}