const chai = require('chai');
let expect = chai.expect;
let mathEnforcer = require('../UnitTestingLabFunctions/Math-Enforcer/eath-enforcer');

describe('Testing the functions in the class mathEnforcer in the UnitTestingLabFunctions folder', function(){
    it('Addfive Expect to return undefined', function(){
        let result = mathEnforcer.addFive("string");
        let result2 = mathEnforcer.addFive({});
        expect(result).to.equal(undefined);
        expect(result2).to.equal(undefined);
    })

    it('Addfive Expect to return 10', function(){
        let result = mathEnforcer.addFive(5);
        expect(result).to.equal(10);
    })

    it('subtractTen Expect to return undefined', function(){
        let result = mathEnforcer.subtractTen("string");
        expect(result).to.equal(undefined);
    })

    it('subtractTen Expect to return 1', function(){
        let result = mathEnforcer.subtractTen(11);
        expect(result).to.equal(1);
    })

    it('sum Expect to return undefined', function(){
        let result1 = mathEnforcer.sum("string", 2);
        let result2 = mathEnforcer.sum(2, "string");
        let result3 = mathEnforcer.sum({}, "string");
        expect(result1).to.equal(undefined);
        expect(result2).to.equal(undefined);
        expect(result3).to.equal(undefined);
    })

    it('sum Expect to return 5', function(){
        let result = mathEnforcer.sum(2, 3);
        expect(result).to.equal(5);
    })

})