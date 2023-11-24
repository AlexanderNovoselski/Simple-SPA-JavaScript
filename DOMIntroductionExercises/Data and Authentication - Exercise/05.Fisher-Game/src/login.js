let token = sessionStorage.getItem('accessToken');
let logoutButton = document.getElementById('logout');

let redirect = '/Js-DOM-Projects/DOMIntroductionExercises/Data%20and%20Authentication%20-%20Exercise/05.Fisher-Game/src/index.html'
if (!token) {
    logoutButton.style.display = 'none';
}
else {
    window.location = redirect;
    logoutButton.style.display = 'inline-block';
}


let url = 'http://localhost:3030/users/login';
let notificationBar = document.querySelector('p.notification');

let inputEmail = document.querySelector('input[name="email"]');
let inputPassword = document.querySelector('input[name="password"]');

let button = document.querySelector('button');

button.addEventListener('click', login);




async function login(e) {
    e.preventDefault();

    notificationBar.textContent = ''
    let email = inputEmail.value;
    let password = inputPassword.value;
    let obj = { email, password };
    if (email && password) {
        try {
            let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };

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
    else {
        notificationBar.textContent = 'Email and password must not be empty';
    }
}

