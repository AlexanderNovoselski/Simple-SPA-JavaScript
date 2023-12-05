class Textbox {
    constructor(selector, invalidSymbolsRegex) {
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = invalidSymbolsRegex;

        // Bind event listener to update values on input change
        this._elements.forEach(element => {
            element.addEventListener('input', () => this.updateValues());
        });
    }
    // Getter for elements
    get elements() {
        return this._elements;
    }

    // Getter and setter for value property
    get value() {
        return this._elements[0].value;
    }

    set value(newValue) {
        this._elements.forEach(element => {
            element.value = newValue;
        });
        this.updateValues();
    }

    // Method to check if the value is valid
    isValid() {
        return !this._invalidSymbols.test(this.value);
    }

    // Method to update values across all elements
    updateValues() {
        const newValue = this._elements[0].value;
        this._elements.forEach(element => {
            element.value = newValue;
        });
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let textbox2 = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('textbox');

// Loop through the collection and add an event listener to each element
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', function () {
        console.log(textbox.value);
    });
}
