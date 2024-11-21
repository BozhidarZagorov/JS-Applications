import "./config/firebaseInit.js"
import page from "./lib/page.js";
import layoutView from "./views/layoutView.js";
import catsView from "./views/catsView.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginView.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import logoutView from "./views/logoutView.js";

//setup layout
page(authMiddleware)
page(layoutView)

//setup routes
page('/',homeView)
page('/cats',catsView)
page("/login",loginView)
page('/logout',logoutView)

//start routing
page()