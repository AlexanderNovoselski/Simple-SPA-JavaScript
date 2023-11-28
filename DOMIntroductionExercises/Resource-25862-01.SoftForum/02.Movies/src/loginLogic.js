import { createForm, currentYear } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
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



const loginFormData = {
    elementName: 'div',
    id: 'container',
    children: [
        {
            elementName: 'nav',
            classes: ['navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark'],
            children: [
                {
                    elementName: 'a',
                    id: 'homePageBtnNav',
                    classes: ['navbar-brand', 'text-light'],
                    attributes: [{ name: 'href', value: '#' }],
                    textContent: 'Movies'
                },
                {
                    elementName: 'ul',
                    classes: ['navbar-nav', 'ml-auto'],
                    children: [
                        {
                            elementName: 'li',
                            classes: ['nav-item', 'guest'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'loginBtnNav',
                                    classes: ['nav-link'],
                                    attributes: [{ name: 'href', value: '#' }],
                                    textContent: 'Login'
                                }
                            ]
                        },
                        {
                            elementName: 'li',
                            classes: ['nav-item', 'guest'],
                            children: [
                                {
                                    elementName: 'a',
                                    id: 'registerBtnNav',
                                    classes: ['nav-link'],
                                    attributes: [{ name: 'href', value: '#' }],
                                    textContent: 'Register'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            elementName: 'section',
            id: 'form-login',
            classes: ['view-section'],
            children: [
                {
                    elementName: 'form',
                    id: 'login-form',
                    classes: ['text-center', 'border', 'border-light', 'p-5'],
                    action: '',
                    method: '',
                    children: [
                        {
                            elementName: 'div',
                            classes: ['form-group'],
                            children: [
                                {
                                    elementName: 'label',
                                    attributes: [{ name: 'for', value: 'email' }],
                                    textContent: 'Email'
                                },
                                {
                                    elementName: 'input',
                                    id: 'email',
                                    classes: ['form-control'],
                                    attributes: [
                                        { name: 'type', value: 'email' },
                                        { name: 'placeholder', value: 'Email' },
                                        { name: 'name', value: 'email' }
                                    ]
                                }
                            ]
                        },
                        {
                            elementName: 'div',
                            classes: ['form-group'],
                            children: [
                                {
                                    elementName: 'label',
                                    attributes: [{ name: 'for', value: 'password' }],
                                    textContent: 'Password'
                                },
                                {
                                    elementName: 'input',
                                    id: 'password',
                                    classes: ['form-control'],
                                    attributes: [
                                        { name: 'type', value: 'password' },
                                        { name: 'placeholder', value: 'Password' },
                                        { name: 'name', value: 'password' }
                                    ]
                                }
                            ]
                        },
                        {
                            elementName: 'button',
                            attributes: [{ name: 'type', value: 'submit' }],
                            classes: ['btn', 'btn-primary'],
                            textContent: 'Login'
                        }
                    ]
                }
            ]
        },
        {
            elementName: 'footer',
            classes: ['page-footer', 'font-small'],

            children: [
                {
                    elementName: 'div',
                    classes: ['footer-copyright', 'text-center', 'py-3'],
                    attributes: [{ name: 'type', value: 'submit' }],
                    textContent: `\u00A9 ${currentYear} `,
                    children: [
                        {
                            elementName: 'a',
                            classes: ['text-dark'],
                            attributes: [{ name: 'href', value: '#' },],
                            textContent: 'Movies Application'
                        }
                    ]
                }
            ]
        }
    ]
};