//Hiding button whether there is a logged user or not, and showing some information
let logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);

let loginButton = document.getElementById('login');
let registerButton = document.getElementById('register');
let welcomeGuest = document.querySelector('p.email span');
let mainFieldSet = document.getElementById('main');
let addBtn = document.querySelector('button.add');
let loadButton = document.querySelector('button.load');

let redirect = '/Js-DOM-Projects/DOMIntroductionExercises/Data%20and%20Authentication%20-%20Exercise/05.Fisher-Game/src/login.html'
let token = sessionStorage.getItem('accessToken');

if (!token) {
    logoutButton.style.display = 'none';
    welcomeGuest.innerText = 'guest';
}
else {
    addBtn.disabled = false;
    logoutButton.style.display = 'inline-block';
    mainFieldSet.style.display = 'inline-block';
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    welcomeGuest.innerText = sessionStorage.getItem('loggedUser');
}

async function logout() {
    let options = { method: 'GET', headers: { 'X-Authorization': token } };

    try {
        let response = await fetch('http://localhost:3030/users/logout', options);

        if (response.status == 204) {
            sessionStorage.clear()
            window.location = redirect;
        }
    } catch (error) {

    }

}

class CatchManager {
    constructor() {
        this.loadDataBtn = document.querySelector('button.load');
        this.addBtn = document.querySelector('button.add');
        this.addBtn.addEventListener('click', (e) => this.addCatch(e))
        this.loadDataBtn.addEventListener('click', () => this.loadCatches())
        this.catchesContainer = document.getElementById('catches');


    }

     async addCatch(e) {
        e.preventDefault();
        try {
            // Get form input values
            const angler = this.addBtn.parentElement.querySelector('[name="angler"]').value;
            const weight = parseFloat(this.addBtn.parentElement.querySelector('[name="weight"]').value);
            const species = this.addBtn.parentElement.querySelector('[name="species"]').value;
            const location = this.addBtn.parentElement.querySelector('[name="location"]').value;
            const bait = this.addBtn.parentElement.querySelector('[name="bait"]').value;
            const captureTime = parseInt(this.addBtn.parentElement.querySelector('[name="captureTime"]').value);

            // Validate input values (you can add more validation as needed)
            if (!angler || isNaN(weight) || !species || !location || !bait || isNaN(captureTime)) {
                throw new Error('Please fill in all fields with valid values.');
            }

            // Create a new catch object
            const newCatch = {
                angler,
                weight,
                species,
                location,
                bait,
                captureTime,
                '_ownerId': sessionStorage.getItem('userId')
            };

            // Send a POST request to add the new catch
            const response = await fetch('http://localhost:3030/data/catches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify(newCatch)
            });

            if (!response.ok) {
                throw new Error('Failed to add catch');
            }

            // Reload the catches after adding a new one
            this.loadCatches();
        } catch (error) {
            console.error('Error adding catch:', error);
        }
    }

    async loadCatches() {
        try {
            // Fetch catches data from the server
            const response = await fetch('http://localhost:3030/data/catches');
            if (!response.ok) {
                throw new Error('Failed to fetch catches');
            }

            // Parse the JSON response
            const catchesData = await response.json();

            // Clear existing catches in the container
            this.catchesContainer.innerHTML = '';

            // Create catch elements for each catch in the data
            catchesData.forEach(catchData => {
                const catchElement = this.createCatchElement(catchData);
                this.catchesContainer.appendChild(catchElement);
            });
        } catch (error) {
            console.error('Error loading catches:', error);
        }
    }

    createCatchElement(catchData) {
        const catchElement = document.createElement('div');
        catchElement.classList.add('catch');
        catchElement.dataset.id = catchData._id;

        const labels = ['Angler', 'Weight', 'Species', 'Location', 'Bait', 'Capture Time'];
        const inputClasses = ['angler', 'weight', 'species', 'location', 'bait', 'captureTime'];

        labels.forEach((label, index) => {
            const labelElement = document.createElement('label');
            labelElement.htmlFor = inputClasses[index];
            labelElement.textContent = label;

            const inputElement = document.createElement('input');
            inputElement.type = index === 5 ? 'number' : 'text';
            inputElement.classList.add(inputClasses[index]);
            inputElement.value = catchData[inputClasses[index]];
            if (catchData._ownerId != sessionStorage.getItem('userId')) {
                inputElement.disabled = true;
            }

            catchElement.appendChild(labelElement);
            catchElement.appendChild(inputElement);
        });

        const updateButton = document.createElement('button');
        updateButton.classList.add('update');
        updateButton.textContent = 'Update';
        updateButton.dataset.id = catchData._id;
        updateButton.addEventListener('click', (e) => this.updateCatch(e, catchData._id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = catchData._id;
        deleteButton.addEventListener('click', () => this.deleteCatch(catchData._id));

        if (catchData._ownerId != sessionStorage.getItem('userId')) {
            updateButton.disabled = true;
            deleteButton.disabled = true;
        }
        catchElement.appendChild(updateButton);
        catchElement.appendChild(deleteButton);

        return catchElement;
    }

    async updateCatch(e, id) {
        let target = e.target;
        const updatedCatch = {
            angler: target.parentElement.querySelector('.angler').value,
            weight: target.parentElement.querySelector('.weight').value,
            species: target.parentElement.querySelector('.species').value,
            location: target.parentElement.querySelector('.location').value,
            bait: target.parentElement.querySelector('.bait').value,
            captureTime: target.parentElement.querySelector('.captureTime').value,
        };
        try {
            const response = await fetch(`http://localhost:3030/data/catches/${id}`, { method: 'PUT', headers:{'X-Authorization':token}, body: JSON.stringify(updatedCatch)});
            this.loadCatches();
        } catch (error) {
            console.error('Error loading catches:', error);
        }
    }

    async deleteCatch(id) {
        try {
            const response = await fetch(`http://localhost:3030/data/catches/${id}`, { method: 'DELETE', headers:{'X-Authorization':token}});
            this.loadCatches();
        } catch (error) {
            console.error('Error loading catches:', error);
        }
    }

}

const catchManager = new CatchManager();