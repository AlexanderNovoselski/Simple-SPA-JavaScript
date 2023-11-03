function attachGradientEvents() {
    let box = document.getElementById('gradient');
    let output = document.getElementById('result');
    box.addEventListener('mousemove', mouseMove);
    box.addEventListener('mouseout', mouseLeave);

    function mouseMove(e){
        let power = e.offsetX / (e.target.clientWidth - 1);
        let percent = Math.trunc(power * 100);
        output.innerText = `${percent}%`;
    }

    function mouseLeave(){
        output.innerText = '';
    }
}