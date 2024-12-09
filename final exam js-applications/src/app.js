import page from "../lib/page.js";
import { navigationMiddleware } from "../middlewares/navigationMiddleware.js";
import { notificationsMiddleware } from "../middlewares/notificationMiddleware.js"
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
page(notificationsMiddleware)


page('/',HomeView)
page('/login',loginView)
page('/register',registerView)
page('/logout',logoutView)
page('/marketplace',dashBoardView)
page('/sell',createView)
page('/marketplace/:itemId',detailsView)
page('/marketplace/:itemId/edit',editView)
page('/marketplace/:itemId/delete',deleteView)


page()
