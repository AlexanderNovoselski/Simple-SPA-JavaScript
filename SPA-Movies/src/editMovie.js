import { createEditForm } from "./editUtilities/utils.js";
import { showHome } from "./homeLogic.js";

let _body = document.body;
export function showEditMovie(e, mainDomElement, title, description, img, movieId){
    e.preventDefault();
    _body.innerHTML = '';
    let section = createEditForm(title, description, img)
    let form = section.querySelector('form');
    let backBtn = section.querySelector('#backBtn');
    form.addEventListener('submit', (e) => editMovie(e, movieId));
    backBtn.addEventListener('click', () => showHome(_body));

    mainDomElement.appendChild(section);
}

export async function editMovie(e, id){
    e.preventDefault();
    let target = e.target;
    let formData = new FormData(target);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('image');
    let movie = {_id: id, title, description, img}

    let url = `http://localhost:3030/data/movies/${id}`;
    let options = {method: 'PUT', headers: {'X-Authorization': sessionStorage.getItem('accessToken'), 'Content-Type': 'application/json'}, body: JSON.stringify(movie)}
    let response = await fetch(url, options)
    let data = await response.json();

    console.log(data);
    showHome(_body)
}