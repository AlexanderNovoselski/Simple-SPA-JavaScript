function solution() {
    class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = gasWeight;
        }

        toString() {
            return `Balloon {color: '${this.color}', gasWeight: ${this.gasWeight}}`;
        }
    }

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            this.ribbonColor = ribbonColor;
            this.ribbonLength = ribbonLength;
            this._ribbon = { color: this.ribbonColor, length: this.ribbonLength };
        }

        get ribbon() {
            return { color: this.ribbonColor, length: this.ribbonLength };
        }

        toString() {
            return `PartyBalloon {color: '${this.color}', gasWeight: ${this.gasWeight}, _ribbon: {color: '${this.ribbonColor}', length: ${this.ribbonLength}}}`;
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);
            this._text = text;
        }

        get text(){
            return this._text;
        }

    }

    return {
        Balloon: Balloon,
        PartyBalloon: PartyBalloon,
        BirthdayBalloon: BirthdayBalloon
    }
}

let classes = solution();
let testBalloon = new classes.Balloon("yellow", 20.5);
let testPartyBalloon = new classes.PartyBalloon("yellow", 20.5, "red", 10.25);
let testBirthdayBalloon = new classes.BirthdayBalloon("blue", 20.5, "red", 10.25, 'Happy Birthday');
let ribbon = testPartyBalloon.ribbon;
console.log(testBalloon.toString());
console.log(testPartyBalloon.toString());
console.log(testBirthdayBalloon.toString());
console.log(testBirthdayBalloon.text);
console.log(ribbon);
