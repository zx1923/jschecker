const Checker = require('../dist/node/jschecker');

function getTypeOf(obj) {
  let type = Object.prototype.toString.call(obj);
  return type.replace(/\[object\s|\]/g, '');
}

describe(`Test object`, () => {

  test('object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: [1, 2, 3],
      d: false
    };
    const checkResult = Checker.object().create(obj);
    expect(checkResult).toBeTruthy();

    const objErr = [1, 2];
    const checkObj = Checker.object().create();
    expect(checkObj(objErr)).toBeFalsy();
  });

  test('object check with equal()', () => {
    const obj1 = {a: 1, b: 2};
    const obj2 = obj1;
    const obj3 = {a: 1, b: 2};
    const obj4 = {...obj1, c: 3};
    const check = Checker.object().equal(obj1).create();

    expect(check(obj2)).toBeTruthy();
    expect(check(obj3)).toBeTruthy();
    expect(check(obj4)).toBeFalsy();
  });

  test('object check width empty()', () => {
    const obj = {a: 1, b: 2};
    const emptyObj = {};
    const check1 = Checker.object().empty().create();
    const check2 = Checker.object().empty(true).create();

    expect(check1(obj)).toBeTruthy();
    expect(check1(emptyObj)).toBeFalsy();
    expect(check2(emptyObj)).toBeTruthy();
  });

  test('object check width invalidValues()', () => {
    const obj = {a: 1, b: 2};
    const objRight = {name: 'Sean', list: [ 1, 2, 3 ]};
    const forbiddenArr = [1, 5];
    const check1 = Checker.object().invalidValues(1).create();
    const check2 = Checker.object().invalidValues(forbiddenArr).create();

    expect(check1(obj)).toBeFalsy();
    expect(check2(obj)).toBeFalsy();
    expect(check1(objRight)).toBeTruthy();
    expect(check2(objRight)).toBeTruthy();
  });

  test('object check width invalidKeys()', () => {
    const keys = ['name', 'age'];
    const objRight = { a: 1, b: 2, c: 3 };
    const objErr = { name: 'Sean', age: 20, c: 3 };
    const checkNoForbidden = Checker.object().create();
    const checkUseForbidden = Checker.object().invalidKeys(keys).create();

    expect(checkNoForbidden(objRight)).toBeTruthy();
    expect(checkNoForbidden(objErr)).toBeTruthy();

    expect(checkUseForbidden(objRight)).toBeTruthy();
    expect(checkUseForbidden(objErr)).toBeFalsy();
  });

  test('object check width includeKeys', () => {
    const keys = ['name', 'age'];
    const objErr = { a: 1, b: 2, c: 3 };
    const objRight = { name: 'Sean', age: 20, c: 3 };
    const checkNoInclude = Checker.object().create();
    const checkUseInclude = Checker.object().includeKeys(keys).create();

    expect(checkNoInclude(objRight)).toBeTruthy();
    expect(checkUseInclude(objRight)).toBeTruthy();

    expect(checkNoInclude(objErr)).toBeTruthy();
    expect(checkUseInclude(objErr)).toBeFalsy();
  });

  test('object check width len()', () => {
    const len = 3;
    const objRight = {a: 1, b: 2, c: 3};
    const objErr = {...objRight, d: 4};
    const check = Checker.object().len(3).create();

    expect(check(objRight)).toBeTruthy();
    expect(check(objErr)).toBeFalsy();

  });

  test('object check width items()', () => {
    const objNumber = {a: 1, b: 2, c: 3};
    const objMixed = {...objNumber, d: [1, 2], e: null};
    const checkByType = Checker.object().items('Number').create();

    expect(checkByType(objNumber)).toBeTruthy();
    expect(checkByType(objMixed)).toBeFalsy();

    const fn = (itvalue) => {
      return ['Number', 'String', 'Array', 'Null'].includes(getTypeOf(itvalue));
    }
    const checkByFn = Checker.object().items(fn).create();
    expect(checkByFn(objNumber)).toBeTruthy();
    expect(checkByFn(objMixed)).toBeTruthy();

    const by = {type: 'any'};
    const checkWillBeErr = Checker.object().items(by).create();
    try {
      expect(checkWillBeErr(objNumber)).toThrow(`type must be a string or a function`);
    } catch (e) {}
  });
  
  test('object check width required()', () => {
    const checkRequired = Checker.object().require(true).create();
    const checkNotRequired = Checker.object().require(false).create();

    expect(checkRequired()).toBeFalsy();
    expect(checkNotRequired()).toBeTruthy();
  });

});