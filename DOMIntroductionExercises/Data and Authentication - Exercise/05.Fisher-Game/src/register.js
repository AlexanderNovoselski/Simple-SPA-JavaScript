//Showing and hiding elements, and managing redirects
let logoutButton = document.getElementById('logout');
let redirect = '/Js-DOM-Projects/DOMIntroductionExercises/Data%20and%20Authentication%20-%20Exercise/05.Fisher-Game/src/index.html'

let token = sessionStorage.getItem('accessToken');
if (!token) {
    logoutButton.style.display = 'none';
}
else {
    logoutButton.style.display = 'inline-block';
    window.location = redirect;
}

//Page data
let inputEmail = document.querySelector('input[name="email"]');
let inputPassword = document.querySelector('input[name="password"]');
let inputRepass = document.querySelector('input[name="rePass"]');
let url = 'http://localhost:3030/users/register';
let notificationBar = document.querySelector('p.notification');

let button = document.querySelector('button');
button.addEventListener('click', register);

async function register(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = inputEmail.value;
    let password = inputPassword.value;
    let rePass = inputRepass.value;
    if (email && password) {
        if (!emailRegex.test(email)) {
            notificationBar.textContent = 'Invalid email address!';
        }
        else if (password != rePass) {
            notificationBar.textContent = 'Passwords do not match';
        }
        else {
            let obj = {'email': email, 'password': password};
            let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj)}
            try {
                let response = await fetch(url, options);
                let result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Request failed with status ' + response.status);
                }
                sessionStorage.setItem('userId', result._id);
                sessionStorage.setItem('loggedUser', result.email);
                sessionStorage.setItem('accessToken', result.accessToken);
                window.location = redirect;
            } catch (error) {
                notificationBar.textContent = error;
            }

        }

    }
    else {
        notificationBar.textContent = 'Email and password must not be empty';
    }
}