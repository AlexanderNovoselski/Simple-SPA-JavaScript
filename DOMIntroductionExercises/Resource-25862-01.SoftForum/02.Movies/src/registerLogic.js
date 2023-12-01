import { createForm } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
import { showLogin } from "./loginLogic.js";
import { registerFormData } from "./registerUtilities/utils.js";

let _body = document.body;
export function showRegister(mainDomElement) {
    mainDomElement.innerHTML = '';
    let registerForm = createForm(registerFormData);
    let form = registerForm.querySelector('form');
    form.addEventListener('submit', (e) => register(e));

    let loginBtn = registerForm.querySelector('#loginBtnNav');
    let registerBtn = registerForm.querySelector('#registerBtnNav');
    let homePageBtn = registerForm.querySelector('#homePageBtnNav');

    loginBtn.addEventListener('click', () => showLogin(_body));
    registerBtn.addEventListener('click', () => showRegister(_body));
    homePageBtn.addEventListener('click', () => showHome(_body));
    mainDomElement.appendChild(registerForm);
}

async function register(e) {
    e.preventDefault();
    let target = e.target;

    let formData = new FormData(target)

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    let url = 'http://localhost:3030/users/register';
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }
    try {
        if (!email || !password) {
            throw new Error('Email and password must not be empty');
        }
        else if (password != repeatPassword) {
            throw new Error('Passwords do not match');
        }

        let response = await fetch(url, options);
        let data = await response.json();

        if (!response.ok) {
            throw new Error('Response failed');
        }

        sessionStorage.setItem('isLogged', true);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('id', data._id);

        showHome(_body);

    } catch (error) {
        alert(error.message);
    }
}

