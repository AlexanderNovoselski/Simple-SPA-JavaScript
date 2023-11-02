function calc() {
    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    let element = document.getElementById("sum");
    if(num1.value == ""){
        num1.value = 0;
    }
    if(num2.value == ""){
        num2.value = 0;
    }

    element.value = parseInt(num1.value) + parseInt(num2.value);
}
