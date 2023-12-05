function addItem() {
    let newItem = document.getElementById('newItemText').value;
    let li = document.createElement('li');
    li.textContent = newItem;
    let itemList = document.getElementById('items');
    itemList.appendChild(li);
}