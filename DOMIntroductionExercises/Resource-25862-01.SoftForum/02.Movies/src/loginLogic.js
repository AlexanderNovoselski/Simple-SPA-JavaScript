import { createForm } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
import { loginFormData } from "./loginUtilities/utils.js";
import { showRegister } from "./registerLogic.js";
import * as userService from "./services/userService.js";

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

    let formData = new FormData(target);
    let email = formData.get('email');
    let password = formData.get('password');

    try {
        if (email && password) {
            let userData = await userService.loginUser(email, password);

            showHome(_body);
        } else {
            throw new Error('Email and password must not be empty');
        }

    } catch (error) {
        alert(error.message);
    }
}


