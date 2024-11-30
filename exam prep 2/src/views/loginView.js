import page from "../../lib/page.js";
import { login } from "../../api/usersApi.js";
import { render,html } from "../../lib/lit-html.js";
import { saveUserData } from "../../utils/userUtils.js";

const template = (onSubmit) => html`
 <!-- Login Page -->
 <section id="login">
            <div class="container">
                <form @submit=${onSubmit} id="login-form" action="#" method="POST">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>
`
export default async function loginView(ctx) {
    render(template(loginFormSubmitHandler))
}

async function loginFormSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')


    if (username ==='' || password === '') {
        return alert('Fields are required!')
    }

    try {
       const userData = await login(username,password)
       saveUserData(userData)
       page.redirect('/')
    } catch (err) {
        alert(err.message)
    }
}