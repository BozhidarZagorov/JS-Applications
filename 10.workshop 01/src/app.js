import "./config/firebaseInit.js"
import page from "./lib/page.js";
import layoutView from "./views/layoutView.js";

import catsView from "./views/catsView.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginView.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import logoutView from "./views/logoutView.js";
import registerView from "./views/registerView.js";
import createView from "./views/createView.js";
import detailsView from "./views/detailsView.js";

//setup layout
page(authMiddleware)
page(layoutView)

//setup routes
page('/',homeView)
page('/cats',catsView)
page("/cats/create",createView)
page('/cats/:catId/details',detailsView)
page("/login",loginView)
page('/logout',logoutView)
page('/register',registerView)

//start routing
page()