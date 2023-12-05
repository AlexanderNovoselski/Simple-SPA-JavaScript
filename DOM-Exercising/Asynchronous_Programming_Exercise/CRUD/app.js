let loadBtn = document.getElementById('load-btn');
loadBtn.addEventListener('click', loadData);

let tableBody = document.querySelector('#table tbody');
let form = document.getElementById('create-form');
form.addEventListener('submit', createData);

let editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', editData);

async function loadEditData(e) {
    let target = e.target;
    let id = target.dataset.id;
    let response = await fetch(`http://localhost:3030/jsonstore/landmarks/${id}`);
    let result = await response.json();

    let idInput = document.getElementById('edit-id');
    idInput.dataset.id = result._id
    document.getElementById('edit-name').value = result.name;
    document.getElementById('edit-area').value = result.area;
    document.getElementById('edit-year-date-start').value = result.yearStart;
    document.getElementById('edit-year-date-end').value = result.yearEnd;
}

async function editData(e) {
    e.preventDefault();
    let target = e.target;
    let data = new FormData(target);
    let idInput = document.getElementById('edit-id');

    let id = idInput.dataset.id;
    let name = data.get('name');
    let area = data.get('area');
    let yearStart = data.get('yearStart');
    let yearEnd = data.get('yearEnd');

    let formObj = {
        '_id': id,
        name,
        area,
        yearStart,
        yearEnd
    }
    try {
        if(!id) target.reset();
        
        if (name && area && yearStart && yearEnd) {
            let url = `http://localhost:3030/jsonstore/landmarks/${id}`;
            let options = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formObj) }
            let response = await fetch(url, options)
            let result = await response.json();
            target.reset();
        }

    } catch (error) {

    }

    loadData()
}

async function deleteData(e) {
    let target = e.target;
    let data = target.dataset
    let url = `http://localhost:3030/jsonstore/landmarks/${data.id}`;
    let result = await fetch(url, { method: 'DELETE' });
    loadData();
}
async function createData(e) {
    e.preventDefault()
    let target = e.target;
    let formData = new FormData(target);
    let name = formData.get('name');
    let area = formData.get('area');
    let yearStart = formData.get('yearStart');
    let yearEnd = formData.get('yearEnd');
    if (name && area && yearStart && yearEnd) {
        try {
            let result = await fetchData('POST', 'application/json', { name, area, yearStart, yearEnd });
            target.reset();
        } catch (error) {

        }
    }

    loadData();
}

async function loadData() {
    tableBody.innerHTML = '';
    let result = await fetchData();
    Object.values(result).forEach(x => {
        createTableBodyElements(x._id, x.name, x.area, x.yearStart, x.yearEnd);

    })
}

function createTableBodyElements(id, name, area, yearStart, yearEnd) {
    let tr = createTr();
    let thName = createTh(name);
    let thArea = createTh(area);
    let thYearStart = createTh(yearStart);
    let thYearEnd = createTh(yearEnd);
    let thOptions = createTh();

    let btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.classList.add('delete');
    btnDelete.dataset.id = id;
    btnDelete.addEventListener('click', deleteData);

    let btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.classList.add('edit');
    btnEdit.dataset.id = id;
    btnEdit.addEventListener('click', loadEditData);

    thOptions.append(btnDelete, btnEdit);

    tr.append(thName, thArea, thYearStart, thYearEnd, thOptions);

    tableBody.appendChild(tr);
}

function createTr() {
    let tr = document.createElement('tr');

    return tr;
}

function createTh(data) {
    let th = document.createElement('th');
    th.textContent = data;

    return th;
}

async function fetchData(methodName, headerContentType, bodyContent) {
    let url = 'http://localhost:3030/jsonstore/landmarks';
    let options;
    if (methodName != undefined) {
        options = {
            method: methodName,
            headers: {
                'Content-Type': headerContentType
            },
            body: JSON.stringify(bodyContent)
        }
    }

    let response = await fetch(url, options);
    let result = await response.json();

    return result;
}