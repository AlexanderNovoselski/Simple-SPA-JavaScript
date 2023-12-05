function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let info = document.querySelector('div#info span.info');
    let nextStopId = 'depot';
    let stopName = '';
    async function depart() {
        try {
            let url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
            let response = await fetch(url);
            let data = await response.json();
            stopName = data.name;
            nextStopId = data.next;

            info.innerText = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;

        } catch (error) {
            info.innerText = "Error";
        }

    }

    function arrive() {
        info.innerText = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();