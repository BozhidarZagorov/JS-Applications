import page from "../lib/page.js";
import { navigationMiddleware } from "../middlewares/navigationMiddleware.js";
import createView from "./views/createView.js"
import deleteView from "./views/deleteView.js";
import detailsView from "./views/detailsView.js";
import editView from "./views/editView.js";
import HomeView from "./views/homeView.js";
import loginView from "./views/loginView.js";
import logoutView from "./views/logoutView.js";
import registerView from "./views/registerView.js";
import dashBoardView from "./views/dashBoardView.js";




page(navigationMiddleware)


page('/',HomeView)
page('/login',loginView)
page('/register',registerView)
page('/logout',logoutView)
page('/characters',dashBoardView)
page('/addCharacter',createView)
page('/characters/:itemId',detailsView)
page('/characters/:itemId/edit',editView)
page('/characters/:itemId/delete',deleteView)


page()
