async function getInfo() {

    let busUl = document.getElementById('buses');
    busUl.innerHTML = '';
    let stopId = document.getElementById('stopId').value;

    try {
        if(stopId === '') throw new Error;

        let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
        let response = await fetch(url);
        let data = await response.json();
        document.getElementById('stopName').textContent = data.name;
        for (const bus in data.buses) {
            let busTime = data.buses[bus];

            busUl.appendChild(createLiElement(bus, busTime))
        }
    } catch (error) {
        document.getElementById('stopName').textContent = "Error";
    }
}

function createLiElement(busId, busTime) {
    let li = document.createElement('li');
    li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;

    return li;
}