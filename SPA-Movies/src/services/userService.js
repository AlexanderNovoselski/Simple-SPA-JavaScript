const url = 'http://localhost:3030/users';

async function _internalFetch(url, settings) {
    try {
        let response = await fetch(url, settings);
        if (response.status === 200) {
            let result = response.json();
            return result;
        }
        else if (response.status === 204) {
            return undefined;
        }
        else {
            throw new Error('Error happened during the action')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(email, password) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    try {
        const data = await _internalFetch(`${url}/login`, options)

        if (sessionStorage.getItem('accessToken')) {
            throw new Error('You are already logged in');
        }

        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('id', data._id);


        return data;
    } catch (error) {
        throw new Error('Error during login');
    }
}

export async function registerUser(email, password, repeatPassword) {

    if (!email || !password) {
        throw new Error('Email and password must not be empty');
    } else if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    try {
        const data = await _internalFetch(`${url}/register`, options)

        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('id', data._id);

        return data;
    } catch (error) {
        throw new Error('Error during registration');
    }
}

export async function logoutUser() {
    let options = { 
        method: 'POST', 
        headers: { 'X-Authorization': `${sessionStorage.getItem('accessToken')}` } 
    }
    try {
        const data = await _internalFetch(`${url}/logout`, options)

        if (!sessionStorage.getItem('accessToken')) {
            throw new Error('You are not logged in');
        }
        sessionStorage.clear();
        return;
    }
    catch(error){
        console.log(error)
    }
}