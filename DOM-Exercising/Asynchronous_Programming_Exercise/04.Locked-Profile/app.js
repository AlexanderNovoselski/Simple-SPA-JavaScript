async function lockedProfile() {

    class Profile {
        constructor(userName, email, age, index) {
            this.index = index;
            this.userName = userName;
            this.email = email;
            this.age = age;
            this.isProfileLocked = true;
            this.profile = this.createHtmlContent();
            this.main = document.getElementById('main').appendChild(this.profile);
            this.attachEventListeners();
        }


        attachEventListeners() {
            this.profile.querySelector('.profile button').addEventListener('click', (e) => this.showMore(e));
            this.profile.querySelector('.profile input[value="lock"]').addEventListener('click', () => this.lockProfile());
            this.profile.querySelector('.profile input[value="unlock"]').addEventListener('click', () => this.unlockProfile());
        }

        createHtmlContent() {
            let div = document.createElement('div');
            div.classList.add('profile');

            let img = document.createElement('img');
            img.src = "./iconProfile2.png";
            img.classList.add('userIcon')

            let labelLock = document.createElement('label');
            labelLock.textContent = 'Lock';

            let inputLockRadio = document.createElement('input');
            inputLockRadio.type = 'radio';
            inputLockRadio.name = `user${this.index}Locked`;
            inputLockRadio.value = 'lock';
            inputLockRadio.checked = true;

            let labelUnlock = document.createElement('label');
            labelUnlock.textContent = 'Unlock';

            let inputUnlockRadio = document.createElement('input');
            inputUnlockRadio.type = 'radio';
            inputUnlockRadio.name = `user${this.index}Unlocked`;
            inputUnlockRadio.value = 'unlock';
            inputUnlockRadio.checked = false;

            let br = document.createElement('br');
            let hr = document.createElement('hr');

            let labelUsername = document.createElement('label');
            labelUsername.textContent = 'Username';

            let inputUsername = document.createElement('input');
            inputUsername.type = 'text';
            inputUsername.name = `user${this.index}Username`;
            inputUsername.value = this.userName;
            inputUsername.disabled = true;
            inputUsername.readOnly = true;

            let divHiddenFields = document.createElement('div');
            divHiddenFields.id = `user${this.index}HiddenFields`;
            divHiddenFields.style.display = 'none';

            let hr2 = document.createElement('hr');

            let labelEmail = document.createElement('label');
            labelEmail.textContent = 'Email:'

            let inputEmail = document.createElement('input');
            inputEmail.type = 'email';
            inputEmail.name = `user${this.index}Email`;
            inputEmail.value = this.email;
            inputEmail.disabled = true;
            inputEmail.readOnly = true;


            let labelAge = document.createElement('label');
            labelAge.textContent = 'Age:'

            let inputAge = document.createElement('input');
            inputAge.type = 'age';
            inputAge.name = `user${this.index}Age`;
            inputAge.value = this.age;
            inputAge.disabled = true;
            inputAge.readOnly = true;

            let showMore = document.createElement('button');
            showMore.textContent = 'Show more';

            divHiddenFields.append(hr2, labelEmail, inputEmail, labelAge, inputAge);
            div.append(img, labelLock, inputLockRadio, labelUnlock, inputUnlockRadio, br, hr, labelUsername, inputUsername, divHiddenFields, showMore);

            return div;
        }

        showMore(e) {
            let target = e.target
            let divHiddenFields = this.profile.querySelector(`#user${this.index}HiddenFields`);
            let radioUnlock = this.profile.querySelector('.profile input[value="unlock"]');
        
            if (radioUnlock.checked) {
                if (divHiddenFields.style.display == 'none') {
                    divHiddenFields.style.display = 'inline-block';
                    target.textContent = 'Hide it';
                } else {
                    divHiddenFields.style.display = 'none';
                    target.textContent = 'Show more';
                }
            }
        }

        lockProfile() {
            this.profile.querySelector('.profile input[value="unlock"]').checked = false;
            this.isProfileLocked = true;
        }

        unlockProfile() {
            this.profile.querySelector('.profile input[value="lock"]').checked = false;
            this.isProfileLocked = false;
        }
    }
    try {
        let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let data = await response.json();

        let id = 1;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const profileData = data[key];
                // Create an instance of the Profile class for each profile
                new Profile(profileData.username, profileData.email, profileData.age, id);
                id++;
            }
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }



}
