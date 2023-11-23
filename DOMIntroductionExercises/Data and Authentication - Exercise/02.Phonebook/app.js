let url = 'http://localhost:3030/jsonstore/phonebook';

let phonebookUl = document.getElementById('phonebook');

let person = document.getElementById('person');
let phone = document.getElementById('phone');
function attachEvents() {
    let btnLoad = document.getElementById('btnLoad');
    let btnCreate = document.getElementById('btnCreate');

    btnLoad.addEventListener('click', loadData);
    btnCreate.addEventListener('click', createData);
}

async function loadData() {
    

    phonebookUl.innerHTML = '';

    let response = await fetch(url);
    let result = await response.json();

    Object.values(result).forEach(x => {
        createUlBody(phonebookUl, `${x.person}: ${x.phone}`, 'Delete', x._id);
    })
}

async function createData() {
    try {
        if(person.value && phone.value){
            let obj = {person:person.value, phone:phone.value}
            let options = {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(obj)};
            let response = await fetch(url, options);
            if(response.ok){
                person.value = '';
                phone.value = '';
            }
        }
    } catch (error){

    }
}

async function deletePhone(e) {
    let target = e.target;
    let id = target.dataset.id;
    try {
        let options = { method: "DELETE" };
        let response = await fetch(url+`/${id}`, options);
        loadData()

    } catch (error) {

    }

}

function createUlBody(ul, liText, btnText, id) {
    let li = createLi(liText, btnText, id);
    ul.appendChild(li);
}


function createLi(text, btnText, phoneId) {
    let li = document.createElement('li');
    li.textContent = text;

    let deleteBtn = createBtn(btnText);
    deleteBtn.dataset.id = phoneId;
    deleteBtn.addEventListener('click', deletePhone);
    li.appendChild(deleteBtn);

    return li;
}


function createBtn(text) {
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = text;

    return deleteBtn;
}

attachEvents();