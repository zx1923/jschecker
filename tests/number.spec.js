const Checker = require('../dist/index').default

describe(`Test numbers`, () => {

  test('number', () => {
    const checkRes = Checker.number().min(10).max(100).integer().odd().create(87);
    expect(checkRes).toBeTruthy();
  });

  test('number checklist should be different', () => {
    const check1 = Checker.number().max(100).min(0);
    const check2 = Checker.number().greater(0).less(100);

    const check1Keys = Object.keys(check1.checkList);
    const check2Keys = Object.keys(check2.checkList);

    expect(check1Keys.toString() === check2Keys.toString()).toBeFalsy();
  });

  test('number check width min() and max()', () => {
    const check = Checker.number().max(100).min(0).create();
    
    expect(check(10)).toBeTruthy();
    expect(check(0)).toBeTruthy();
    expect(check(100)).toBeTruthy();
    
    expect(check(-10)).toBeFalsy();
    expect(check(200)).toBeFalsy();
  });

  test('number check width greater() and less()', () => {
    const check = Checker.number().greater(0).less(100).create();

    expect(check(10)).toBeTruthy();
    expect(check(0)).toBeFalsy();
    expect(check(100)).toBeFalsy();
  });

  test('number check width equal()', () => {
    const check = Checker.number().equal(10).create();

    expect(check(10)).toBeTruthy();
    expect(check(10.23)).toBeFalsy();
  });

  test('number check width integer()', () => {
    const check = Checker.number().integer().create();

    expect(check(10)).toBeTruthy();
    expect(check(10.23)).toBeFalsy();
  });

  test('number check width odd() and even()', () => {
    const oddCheck = Checker.number().odd().create();
    const evenCheck = Checker.number().even().create();

    expect(oddCheck(11)).toBeTruthy();
    expect(oddCheck(10)).toBeFalsy();

    expect(evenCheck(11)).toBeFalsy();
    expect(evenCheck(10)).toBeTruthy();
  });

  test('number check width positive() and negative()', () => {
    const positiveCheck = Checker.number().positive().create();
    const negativeCheck = Checker.number().negative().create();

    expect(positiveCheck(0)).toBeFalsy();
    expect(negativeCheck(0)).toBeFalsy();

    expect(positiveCheck(10)).toBeTruthy();
    expect(negativeCheck(-10)).toBeTruthy();
  });

  test('number check width oneOf()', () => {
    const arr = [1, 2, 3, 4, 5, 10];
    const inCheck = Checker.number().oneOf(arr).create();

    expect(inCheck(5)).toBeTruthy();
    expect(inCheck(100)).toBeFalsy();
  });

});