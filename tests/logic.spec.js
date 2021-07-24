const Checker = require('../dist/build/index');

describe(`Test logic`, () => {

  test('logic check with and()', () => {
    const checkNum = Checker.number().create();
    const checkMax = Checker.number().max(10).create();
    const checkAnd = Checker.and(checkNum, checkMax).create();

    expect(checkAnd(1, 2, 3, 4, 5)).toBeTruthy();
    expect(checkAnd(1, 2, 3, 11, 5)).toBeFalsy();
  });

  test('logic check with or()', () => {
    const mustBeNum = Checker.number().create();
    const mustBeStr = Checker.string().create()
    const checkOr = Checker.or(mustBeNum, mustBeStr).create();
    const checkAnd = Checker.and(mustBeNum, mustBeStr).create();
    
    expect(checkOr(123)).toBeTruthy();
    expect(checkOr('greg')).toBeTruthy();
    expect(checkOr([1, 2, 3], {}, null)).toBeFalsy();
    expect(checkOr({}, {a: 1})).toBeFalsy();

    expect(checkAnd(123)).toBeFalsy();
    expect(checkAnd('greg')).toBeFalsy();
  });

});