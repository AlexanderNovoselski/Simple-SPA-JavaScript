function calculator() {
  let selector1, selector2, resultSelector;

  function init(selector1, selector2, resultSelector) {
    this.selector1 = document.querySelector(selector1);
    this.selector2 = document.querySelector(selector2);
    this.resultSelector = document.querySelector(resultSelector);
  }

  function add() {
    const num1 = parseFloat(this.selector1.value) || 0;
    const num2 = parseFloat(this.selector2.value) || 0;
    this.resultSelector.value = num1 + num2;
  }

  function subtract() {
    const num1 = parseFloat(this.selector1.value) || 0;
    const num2 = parseFloat(this.selector2.value) || 0;
    this.resultSelector.value = num1 - num2;
  }

  return {
    init,
    add,
    subtract,
  };
}

const calculate = calculator();
calculate.init('#num1', '#num2', '#result');
