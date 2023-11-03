function subtract() {
    let num1 = document.getElementById('firstNumber').value;
    let num2 = document.getElementById('secondNumber').value;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let substraction = num1 - num2;
    let result = document.getElementById('result');
    result.innerText = substraction;
}