import { createForm } from "../static/utils.js";

export function showRegister(mainDomElement){
    mainDomElement.innerHTML = '';
    let registerForm = createForm(formData);
    let form = registerForm.querySelector('form');
    form.addEventListener('submit', (e) => register(e));

    mainDomElement.appendChild(registerForm);
}

async function register(e){
    e.preventDefault();
    let target = e.target;

    let formData = new FormData(target)

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

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
        else if(password != repeatPassword){
            throw new Error('Passwords do not match');
        }
        else{
            throw new Error('Email and password must not be empty');
        }

    } catch (error) {
        alert(error.message);
    }
}

const registerFormData = {

}

{/* <section id="form-sign-up" class="view-section">
        <form
          id="register-form"
          class="text-center border border-light p-5"
          action=""
          method=""
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              class="form-control"
              placeholder="Repeat-Password"
              name="repeatPassword"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </section> */}