function toggle() {
    let button = document.getElementsByClassName('button');
    let textToShow = document.getElementById('extra');
    if(textToShow.style.display == "none"){
        button[0].innerText = "Less";
        textToShow.style.display = "block";
    }
    else{
        button[0].innerText = "More";
        textToShow.style.display = "none";
    }
}