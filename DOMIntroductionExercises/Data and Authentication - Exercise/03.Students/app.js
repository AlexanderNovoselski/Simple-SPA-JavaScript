const url = 'http://localhost:3030/jsonstore/collections/students';

document.addEventListener('DOMContentLoaded', () => {
    // Call the function to fetch and display data when the page loads
    fetchAndDisplayData();

    // Add the submit event listener to the form
    const form = document.getElementById('form');
    form.addEventListener('submit', createStudent);
});

async function fetchAndDisplayData() {
    try {
        // Fetch data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Update the table body with the received data
        updateTableBody(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function createStudent(e) {
    e.preventDefault();
    const target = e.target;
    const data = new FormData(target);
    const name = data.get('firstName');
    const lastName = data.get('lastName');
    const facultyNumber = data.get('facultyNumber');
    const grade = data.get('grade');

    if (name && lastName && facultyNumber && grade) {
        try {
            const obj = {
                'firstName': name,
                'lastName': lastName,
                'facultyNumber': facultyNumber,
                'grade': grade,
            };

            const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
            const response = await fetch(url, options);

            // After successfully adding a new student, fetch and display updated data
            await fetchAndDisplayData();
        } catch (error) {
            console.error('Error creating student:', error);
        }
    }
}

function updateTableBody(data) {
    const tableBody = document.querySelector('#results tbody');
    
    // Batch DOM manipulation using DocumentFragment
    const fragment = document.createDocumentFragment();

    Object.values(data).forEach(student => {
        const row = tableBody.insertRow(-1); // -1 inserts at the end

        const cell1 = row.insertCell(0);
        cell1.textContent = student.firstName;

        const cell2 = row.insertCell(1);
        cell2.textContent = student.lastName;

        const cell3 = row.insertCell(2);
        cell3.textContent = student.facultyNumber;

        const cell4 = row.insertCell(3);
        cell4.textContent = student.grade;

        fragment.appendChild(row);
    });

    // Append the fragment to the table body
    tableBody.appendChild(fragment);
}
