import authAPI from "../../api/auth.js";
const baseUrl = 'http://localhost:3030/users';

const sectionElement = document.getElementById('login-section');
const loginForm = sectionElement.querySelector('form');

export default function loginPage() {
    sectionElement.style.display = 'block';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    authAPI.login(email,password)
        .then(()=>{
            location.href = '/';
        })
        .catch(err => alert(err.message));

});

