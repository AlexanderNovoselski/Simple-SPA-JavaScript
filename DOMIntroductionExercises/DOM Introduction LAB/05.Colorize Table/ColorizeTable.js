function colorize() {
    let table = document.getElementsByTagName('tr');
    let array = Array.from(table).map(x => x.textContent)
    for (let i = 0; i < array.length; i++) {
        if (i % 2 != 0) {
            table[i].style.backgroundColor = 'Teal';
        }
    }
}