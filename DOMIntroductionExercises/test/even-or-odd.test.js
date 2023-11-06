const chai = require('chai');
let expect = chai.expect;
let isOddOrEven = require('../UnitTestingLabFunctions/Even-or-Odd/even-or-odd');

describe('Testing the function isOddorEven in the UnitTestingLabFunctions folder', function(){
    it('Expect to return undefined', function(){
        let result = isOddOrEven(2);
        expect(result).to.equal(undefined);
    })
    it('Expect to return even', function(){
        let result = isOddOrEven("abcd");
        expect(result).to.equal("even");
    })
    it('Expect to return odd', function(){
        let result = isOddOrEven("abc");
        expect(result).to.equal("odd");
    })
})