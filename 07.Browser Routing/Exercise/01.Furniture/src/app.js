// import {page} from "../node_modules/page/page.mjs" //neshto ne go namira no idea why
import page from "//unpkg.com/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js"
import {userHelper} from "./utility/userHelper.js"
import { showDashboardView } from "./view/dashboardView.js"
import {showRegisterView} from "./view/registerView.js"
import {showLoginView} from "./view/loginView.js"
import {showLogoutView} from "./view/logoutView.js"
import {showDetailsView} from  "./view/detailsView.js"
import {showCreateView} from "./view/createView.js"
import {showMyFurnitureView} from "./view/myFurnitureView.js"
import {deleteItem} from "./view/deleteView.js"
import {showEditView} from "./view/editView.js"

const root = document.querySelector('div[data-id="root"]')
const userNav = document.getElementById('user')
const guestNav = document.getElementById('guest')

page(updateCTX) 
page('/', showDashboardView)
page('/dashboard', showDashboardView)
page('/register',showRegisterView)
page('/login',showLoginView)
page('/logout',showLogoutView)
page()
updateNav()

function renderer(temp) {
    render(temp,root)
}

function updateCTX(ctx,next) {
    ctx.render=renderer
    ctx.updateNav=updateNav
    ctx.goTo=goTo
    next()
}

function updateNav() {
    const user = userHelper.getUserData()
    if (user) {
        userNav.style.display='inline-block'
        guestNav.style.display='none'
    }else{
        userNav.style.display='none'
        guestNav.style.display='inline-block'
    }
}
function goTo(path) {
    page.redirect(path)
}