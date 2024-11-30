import { register } from "../../api/usersApi.js";
import { render,html } from "../../lib/lit-html.js";
import page from "../../lib/page.js";
import { saveUserData } from "../../utils/userUtils.js";

const template = (onSubmit) => html`
 <!-- Register Page -->
 <section id="register">
            <div class="container">
                <form @submit=${onSubmit} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>
                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>
                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>
                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
        </section>
`
export default async function registerView(ctx) {

    render(template(registerFormSubmitHandler.bind(ctx)))
}
async function registerFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    const repeatPass = formData.get('repeatPass')


    if (username === '' || password === '' || repeatPass === '') {
        return alert('Fields are required!')
    }
    if (password !== repeatPass) {
        return alert('Passwords don\'t match')
        // return this.showNotification('Passwords don\'t match')
    }

    try {
        const userData = await register(username,password)

        saveUserData(userData)
        
        page.redirect('/catalog')
    } catch (err) {
        alert(err.message);
    }

}