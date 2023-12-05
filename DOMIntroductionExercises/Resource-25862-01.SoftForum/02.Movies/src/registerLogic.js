import { createForm } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
import { showLogin } from "./loginLogic.js";
import { registerFormData } from "./registerUtilities/utils.js";
import * as userService from "./services/userService.js";

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

    let formData = new FormData(target);
    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    try {
        let userData = await userService.registerUser(email, password, repeatPassword);

        showHome(_body);
    } catch (error) {
        alert(error.message);
    }
}
