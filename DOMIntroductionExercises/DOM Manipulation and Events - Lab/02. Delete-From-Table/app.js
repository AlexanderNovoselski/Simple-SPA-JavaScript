function deleteByEmail() {
    let input = document.getElementsByName('email')[0];
    let email = input.value;
    let output = document.getElementById('result');
    let table = document.getElementById('customers');
    let rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        if(cells[1].innerText == email){
            rows[i].parentElement.removeChild(rows[i]);
            output.innerText = "Deleted.";
            break;
        }
        else{
            output.innerText = "Not found."
        }
    }
}