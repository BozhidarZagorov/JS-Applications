import page from "../lib/page.js"
import { navigationMiddleware } from "../middlewares/navigationMiddleware.js"
import catalogView from "./views/catalogView.js"
import createView from "./views/createView.js"
import deleteView from "./views/deleteView.js"
import detailsView from "./views/detailsView.js"
import editView from "./views/editView.js"
import HomeView from "./views/homeView.js"
import loginView from "./views/loginView.js"
import logoutView from "./views/logoutView.js"
import myListedView from "./views/myListedView.js"
import registerView from "./views/registerView.js"
import searchByYearView from "./views/searchByYearView.js"



page(navigationMiddleware)

page('/',HomeView)
page('/login', loginView)
page('/register', registerView)
page('/logout',logoutView)
page('/catalog',catalogView)
page('/createCar',createView)
page('/details/:itemId',detailsView)
page('/catalog/:itemId/edit',editView)
page('/catalog/:itemId/delete',deleteView)
page('/profile',myListedView)
page('/searchYear',searchByYearView)



page()
