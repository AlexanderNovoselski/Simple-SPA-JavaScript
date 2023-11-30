import { createForm, currentYear } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
import { loginFormData } from "./loginUtilities/utils.js";
import { showRegister } from "./registerLogic.js";

let _body = document.body;
export function showLogin(mainDomElement) {
    mainDomElement.innerHTML = '';
    let loginSection = createForm(loginFormData);
    let form = loginSection.querySelector('form');
    form.addEventListener('submit', (e) => login(e));

    let loginBtn = loginSection.querySelector('#loginBtnNav');
    let registerBtn = loginSection.querySelector('#registerBtnNav');
    let homePageBtn = loginSection.querySelector('#homePageBtnNav');

    loginBtn.addEventListener('click', () => showLogin(_body))
    registerBtn.addEventListener('click', () => showRegister(_body))
    homePageBtn.addEventListener('click', () => showHome(_body))

    mainDomElement.appendChild(loginSection);
}

async function login(e) {
    e.preventDefault();
    let target = e.target;

    let formData = new FormData(target)

    let email = formData.get('email');
    let password = formData.get('password');
    let url = 'http://localhost:3030/users/login';
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }
    try {
        if (email && password) {
            let response = await fetch(url, options);
            let data = await response.json();

            if (!response.ok) {
                throw new Error('Response failed');
            }

            if (sessionStorage.getItem('accessToken')) {
                throw new Error('You are already logged in');
            }

            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('isLogged', true);
            sessionStorage.setItem('accessToken', data.accessToken);

            showHome(_body);
        }
        else {
            throw new Error('Email and password must not be empty');
        }

    } catch (error) {
        alert(error.message);
    }
}



