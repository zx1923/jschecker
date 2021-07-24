const Checker = require('../dist/build/index');

describe(`Test array`, () => {

  test('array', () => {
    const arrtest = [12, 34, 56, 78, 90];
    const checkRes = Checker.array().min(10).max(100).len(5).minLen(1).maxLen(10).create(arrtest);
    expect(checkRes).toBeTruthy();

    const checkBase = Checker.array().create();
    expect(checkBase({ length: 3 })).toBeFalsy();
  });

  test('array check width equal()', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [ ...arr1 ];
    const check = Checker.array().equal(arr1).create();
    expect(check(arr1)).toBeTruthy();
    expect(check(arr2)).toBeTruthy();
    expect(check([0, ...arr1])).toBeFalsy();

    const obj = { a: 1, b: 2 };
    const arrObj1 = [1, 2, 3, obj];
    const arrObj2 = [1, 2, 3, { a: 1, b: 2 }];
    const arrObj3 = [ ...arrObj1 ];
    const check2 = Checker.array().equal(arrObj1).create();
    expect(check2(arrObj2)).toBeFalsy();
    expect(check2(arrObj3)).toBeTruthy();
  });

  test('array check width items()', () => {
    const arr1 = [1, 2, 3, 4, 5, 0];
    const arr2 = ['a', 'b', 'c', '4', '5', '0'];
    const mustBeNum = Checker.number().create();
    const mustBeStr = Checker.string().create();

    const checkNumber = Checker.array().items(mustBeNum).create();
    const checkString = Checker.array().items(mustBeStr).create();

    expect(checkNumber(arr1)).toBeTruthy();
    expect(checkString(arr1)).toBeFalsy();
    expect(checkNumber(arr2)).toBeFalsy();
    expect(checkString(arr2)).toBeTruthy();

    const itemCheckFn = (it) => {
      return typeof it === 'number';
    }
    const checkNumberFn = Checker.array().items(itemCheckFn).create();
    expect(checkNumberFn(arr1)).toBeTruthy();

    const checkErr = Checker.array().items({ type: 'String' }).create();
    try {
      expect(checkErr(arr1)).toThrow(`type must be a string or a function`);
    } catch (e) {}
  });

  test('array check with ordered()', () => {
    const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const checkUp = Checker.array().ordered(Checker.ArrOrdered.Up).create();
    const checkDown = Checker.array().ordered(Checker.ArrOrdered.Down).create();

    expect(checkUp(arrData)).toBeFalsy();
    expect(checkDown(arrData)).toBeFalsy();
    expect(checkUp(arrData.sort())).toBeTruthy();

    const checkErr = Checker.array().ordered('ABC').create();
    try {
      expect(checkErr(arrData)).toThrow(`type must be obe of 'Up' or 'Down'`);
    } catch (e) {}
  });

  test('array check width min() and max()', () => {
    const arr1 = [12, 34, 56, 78, 90];
    const check = Checker.array().min(10).max(100).create();
    expect(check(arr1)).toBeTruthy();

    const arr2 = [1, ...arr1];
    expect(check(arr2)).toBeFalsy();

    const arr3 = [...arr1, 123];
    expect(check(arr3)).toBeFalsy();
  });

  test('array check width invalid()', () => {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const check1 = Checker.array().invalid(0).create();
    expect(check1(arr1)).toBeFalsy();

    const check2 = Checker.array().invalid([1, 2, 3]).create();
    expect(check2(arr1)).toBeFalsy();
  });

  test('array check width valid()', () => {
    const arr1 = [1, 2, 3, 4, 5, 5, 1, 3, 4, 2];

    const check1 = Checker.array().valid(0).create();
    expect(check1(arr1)).toBeFalsy();

    const check2 = Checker.array().valid(1).create();
    expect(check2(arr1)).toBeFalsy();

    const check4 = Checker.array().valid([1, 6, 9]).create();
    expect(check4(arr1)).toBeFalsy();

    const check3 = Checker.array().valid([1, 2, 3, 4, 5]).create();
    expect(check3(arr1)).toBeTruthy();

  });

  test('array check width empty()', () => {
    const arr = [];
    const check1 = Checker.array().empty().create();
    const check2 = Checker.array().empty(true).create();

    expect(check1(arr)).toBeFalsy();
    expect(check2(arr)).toBeTruthy();
    expect(check2([1, 2, 3])).toBeTruthy();
  });

  test('array check width every()', () => {
    const arrEven = [0, 2, 4, 6, 8, 10];
    const arrMixed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const isEven = Checker.number().even().create();
    const checkEven = Checker.array().every(isEven).create();

    expect(checkEven(arrEven)).toBeTruthy();
    expect(checkEven(arrMixed)).toBeFalsy();
  });

  test('array check width some()', () => {
    const arrEven = [0, 2, 4, 6, 8, 10];
    const arrMixed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const isOdd = Checker.number().odd().create();
    const checkOdd = Checker.array().some(isOdd).create();

    expect(checkOdd(arrEven)).toBeFalsy();
    expect(checkOdd(arrMixed)).toBeTruthy();
  });

  test('array check width required()', () => {
    const checkRequired = Checker.array().require(true).create();
    const checkNotRequired = Checker.array().require(false).create();

    expect(checkRequired()).toBeFalsy();
    expect(checkNotRequired()).toBeTruthy();
  });

});