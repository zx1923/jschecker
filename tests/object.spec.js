const Checker = require('../dist/build/index');

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
  
  test('object check width validValues()', () => {
    const objErr1 = {a: 1, b: 2};
    const objErr2 = {name: 'Sean', list: [ 1, 2, 3 ]};
    const objRight = {a: 1, b: 1, c: 1, d: 5};
    const validArr = [1, 5];
    const check1 = Checker.object().validValues(1).create();
    const check2 = Checker.object().validValues(validArr).create();

    expect(check1(objErr1)).toBeFalsy();
    expect(check2(objErr1)).toBeFalsy();
    expect(check1(objErr1)).toBeFalsy();
    expect(check2(objErr2)).toBeFalsy();

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

  test('object check width validKeys()', () => {
    const keys = ['name', 'age'];
    const objErr1 = { a: 1, b: 2, c: 3 };
    const objErr2 = { name: 'Sean', age: 20, c: 3 };
    const objRight = { name: 'Sean', age: 20};
    const checkNoForbidden = Checker.object().create();
    const checkUseForbidden = Checker.object().validKeys(keys).create();

    expect(checkNoForbidden(objErr1)).toBeTruthy();
    expect(checkNoForbidden(objErr2)).toBeTruthy();

    expect(checkUseForbidden(objErr1)).toBeFalsy();
    expect(checkUseForbidden(objErr2)).toBeFalsy();
    expect(checkUseForbidden(objRight)).toBeTruthy();
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

  test('object check width verify()', () => {
    const rule = {
      name: Checker.string().min(1).max(10).require().create(),
      age: Checker.number().min(1).max(100).require().create(),
      nick: Checker.string().require(false).create(),
      email: Checker.string().email().require(false).create(),
    };
    const objErr1 = {
      name: 'Tom',
      age: 200,
      nick: 'azqwxs',
    };
    const objErr2 = {
      age: 20,
      nick: 'azqwxs',
      email: '123@qq.com',
    };
    const objRight = {
      name: 'Tom',
      age: 20,
      nick: 'azqwxs',
    };
    const verify = Checker.object().verify(rule).create();

    expect(verify(objErr1)).toBeFalsy();
    expect(verify(objErr2)).toBeFalsy();
    expect(verify(objRight)).toBeTruthy();
  });

  test('object check width every()', () => {
    const len = 3;
    const objRight = {a: 1, b: 2, c: 3, d: 'hello'};
    const objErr = {...objRight, e: [1, 2, 3]};
    
    const everyFn = (key, value) => {
      const mustBeNum = Checker.number().create();
      const mustBeStr = Checker.string().create()
      return Checker.or(mustBeNum, mustBeStr).create()(value);
    }
    const check = Checker.object().every(everyFn).create();

    expect(check(objRight)).toBeTruthy();
    expect(check(objErr)).toBeFalsy();

  });

});