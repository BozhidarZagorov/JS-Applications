import { register } from "../../api/usersApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";
import { saveUserData } from "../../utils/userUtils.js";

const template = (onSubmit) => html`
     <!-- Register Page (Only for Guest users) -->
     <section id="register">
          
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input type="text" name="email" id="register-email" placeholder="email"/>
              <input type="password" name="password" id="register-password" placeholder="password"/>
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
         
        </section>
`
export default async function registerView(ctx) {

    render(template(registerFormSubmitHandler.bind(ctx)))
}
async function registerFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const repeatPass = formData.get('re-password')


    if (email === '' || password === '' || repeatPass === '') {
        return alert('Fields are required!')
    }
    if (password !== repeatPass) {
        return alert('Passwords don\'t match')
        // return this.showNotification('Passwords don\'t match')
    }

    try {
        const userData = await register(email,password)

        saveUserData(userData)
        
        page.redirect('/')
    } catch (err) {
        alert(err.message);
    }

}