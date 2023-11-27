import { showHome } from "./homeLogic.js";

let _body = document.body;
export async function logout(e) {
    let url = 'http://localhost:3030/users/logout';
    let options = { method: 'POST', headers: { 'X-Authorization': `${sessionStorage.getItem('accessToken')}` } }
    try {
        let response = await fetch(url, options);

        if (response.status != 204) {
            throw new Error('Response failed');
        }

        if (!sessionStorage.getItem('accessToken')) {
            throw new Error('You are not logged in');
        }

        sessionStorage.clear();

        showHome(_body);
    } catch (error) {
        alert(error.message);
    }
}