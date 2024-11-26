import navigationView from "../src/views/navigationView.js"

export const navigationMiddleware = (ctx,next) => {
    navigationView()
    
    next()
}