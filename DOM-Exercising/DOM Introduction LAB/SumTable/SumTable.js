function sumTable() {
    let table = document.querySelector('table');
    let rows = table.querySelectorAll('tr');

    let sum = 0;
    for (let i = 1; i < rows.length - 1; i++) {
        let cells = rows[i].querySelectorAll('td');
        sum += parseFloat(cells[1].innerText);
        console.log(sum)
    }
    let total = rows[rows.length - 1].querySelector('td#sum');
    total.innerText = sum;
}