import { createForm, currentYear } from "../static/utils.js";
import { showHome } from "./homeLogic.js";
import { showLogin } from "./loginLogic.js";

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

        showHome(_body);

    } catch (error) {
        alert(error.message);
    }
}
const registerFormData = {
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
            id: 'form-sign-up',
            classes: ['view-section'],
            children: [
                {
                    elementName: 'form',
                    id: 'register-form',
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
                                    textContent: 'Email',
                                    attributes: [{ name: 'for', value: 'email' }]
                                },
                                {
                                    elementName: 'input',
                                    id: 'email',
                                    classes: ['form-control'],
                                    attributes: [
                                        { name: 'type', value: 'email' },
                                        { name: 'placeholder', value: 'Email' },
                                        { name: 'name', value: 'email' },
                                        { name: 'value', value: '' },
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
                                    textContent: 'Password',
                                    attributes: [{ name: 'for', value: 'password' }]
                                },
                                {
                                    elementName: 'input',
                                    id: 'password',
                                    classes: ['form-control'],
                                    attributes: [
                                        { name: 'type', value: 'password' },
                                        { name: 'placeholder', value: 'Password' },
                                        { name: 'name', value: 'password' },
                                        { name: 'value', value: '' },
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
                                    textContent: 'Repeat Password',
                                    attributes: [{ name: 'for', value: 'repeatPassword' }]
                                },
                                {
                                    elementName: 'input',
                                    id: 'repeatPassword',
                                    classes: ['form-control'],
                                    attributes: [
                                        { name: 'type', value: 'password' },
                                        { name: 'placeholder', value: 'Repeat-Password' },
                                        { name: 'name', value: 'repeatPassword' },
                                        { name: 'value', value: '' },
                                    ]
                                }
                            ]
                        },
                        {
                            elementName: 'button',
                            classes: ['btn', 'btn-primary'],
                            textContent: 'Register',
                            attributes: [{ name: 'type', value: 'submit' }]
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