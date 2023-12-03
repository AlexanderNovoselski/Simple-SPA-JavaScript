import { createEditForm } from "./editUtilities/utils.js";
import { showHome } from "./homeLogic.js";

let _body = document.body;
export function showEditMovie(e, mainDomElement, title, description, image){
    e.preventDefault();
    _body.innerHTML = '';
    let section = createEditForm(title, description, image)
    let form = section.querySelector('form');
    let backBtn = section.querySelector('#backBtn');
    form.addEventListener('submit', (e) => editMovie(e));
    backBtn.addEventListener('click', () => showHome(_body));

    mainDomElement.appendChild(section);
}

export async function editMovie(e){
    e.preventDefault();
    let target = e.target;

}