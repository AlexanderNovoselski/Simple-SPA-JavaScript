let url = 'http://localhost:3030/jsonstore/collections/students';

document.addEventListener('DOMContentLoaded', () => {
    // Call the function to fetch and display data when the page loads
    fetchAndDisplayData();
    
    // Add the submit event listener to the form
    let form = document.getElementById('form');
    form.addEventListener('submit', createStudent);
});

async function fetchAndDisplayData() {
    try {
        // Fetch data from the API
        let response = await fetch(url);
        let data = await response.json();

        // Update the table body with the received data
        updateTableBody(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function createStudent(e) {
    let target = e.target;
    let data = new FormData(target);
    let name = data.get('firstName');
    let lastName = data.get('lastName');
    let facultyNumber = data.get('facultyNumber');
    let grade = data.get('grade');

    if (name && lastName && facultyNumber && grade) {
        try {
            let obj = {
                'firstName': name,
                'lastName': lastName,
                'facultyNumber': facultyNumber,
                'grade': grade,
            };

            let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
            let response = await fetch(url, options);

            // After successfully adding a new student, fetch and display updated data
            await fetchAndDisplayData();
        } catch (error) {
            console.error('Error creating student:', error);
        }
    }
}

function updateTableBody(data) {
    let tableBody = document.querySelector('#results tbody');
    // Clear existing rows
    tableBody.innerHTML = '';

    // Check if data is an array
    Object.values(data).forEach(student => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${student.grade}</td>
        `;
        tableBody.appendChild(row);
    })
}
