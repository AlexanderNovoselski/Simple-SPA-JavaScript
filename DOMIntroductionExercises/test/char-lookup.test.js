const chai = require('chai');
let expect = chai.expect;
let lookupChar = require('../UnitTestingLabFunctions/Char-Lookup/char-lookup');

describe('Testing the function lookupChar in the UnitTestingLabFunctions folder', function(){
    it('Expect to return undefined if string is undefined or char is not a number', function(){
        let invalidStr = undefined;
        let validStr = "String";
        let invalidIndex = "d"
        let validIndex = "d"
        let result1 = lookupChar(invalidStr , invalidIndex);
        let result2 = lookupChar(validStr , invalidIndex);
        let result3 = lookupChar(invalidStr , validIndex);
        expect(result1).to.equal(undefined);
        expect(result2).to.equal(undefined);
        expect(result3).to.equal(undefined);
    })

    it('Expect to return Incorrect index if index is outside lenghth', function(){
        let validStr = "String";
        let invalidIndex = -1;
        let invalidIndex2 = 6;
        let result1 = lookupChar(validStr , invalidIndex);
        let result2 = lookupChar(validStr , invalidIndex2);
        expect(result1).to.equal("Incorrect index");
        expect(result2).to.equal("Incorrect index");
    })

    it('Expect to return Correct Char at the given index of the string', function(){
        let validStr = "String";
        let validIndex = 0;
        let validIndex2 = 5;
        let result = lookupChar(validStr , validIndex);
        let result2 = lookupChar(validStr , validIndex2);
        expect(result).to.equal("S");
        expect(result2).to.equal("g");
    })

})