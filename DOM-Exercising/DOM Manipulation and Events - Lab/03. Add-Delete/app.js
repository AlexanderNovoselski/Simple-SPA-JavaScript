function addItem() {
    let newItem = document.getElementById('newItemText');
    let items = document.getElementById('items');
    let li = document.createElement('li');
    if (newItem.value.length > 0 && newItem.value != " ") {
        li.textContent = newItem.value;
        items.appendChild(li);
    }

    let remove = document.createElement('a');
    remove.textContent = "[Delete]";
    remove.href = "#"
    li.appendChild(remove);

    remove.addEventListener('', deleteItem);

    function deleteItem(){
        li.remove();
    }

}