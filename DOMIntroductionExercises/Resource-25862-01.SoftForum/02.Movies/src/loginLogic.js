import { createForm } from "../static/utils.js";

export function showLogin(mainDomElement){
    mainDomElement.innerHTML = '';
    let loginSection = createForm(loginFormData);
    let form = loginSection.querySelector('form');
    form.addEventListener('submit', (e) => login(e));

    mainDomElement.appendChild(loginSection);
}

async function login(e){
    e.preventDefault();
    let target = e.target;

    let formData = new FormData(target)

    let email = formData.get('email');
    let password = formData.get('password');
    let url = 'http://localhost:3030/users/login';
    let options = {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email, password})}
    try {
        if(email && password){
            let response = await fetch(url, options);
            let data = await response.json();

            if(!response.ok){
                throw new Error('Response failed');
            }

            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('isLogged', true);
            sessionStorage.setItem('accessToken', data.accessToken);

            // TODO redirect to main
        }
        else{
            throw new Error('Email and password must not be empty');
        }

    } catch (error) {
        alert(error.message);
    }
}



const loginFormData = {
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
  };



