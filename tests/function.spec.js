const Checker = require('../dist/node/index').default

describe(`Test func`, () => {

  test('func', () => {
    const check = Checker.func().create();
    const fn = () => {};
    expect(check(fn)).toBeTruthy();
    expect(check(null)).toBeFalsy();
    expect(check()).toBeFalsy();
    expect(check([1, 2])).toBeFalsy();
  });

  test('func check width required()', () => {
    const checkRequired = Checker.func().require(true).create();
    const checkNotRequired = Checker.func().require(false).create();

    expect(checkRequired()).toBeFalsy();
    expect(checkNotRequired()).toBeTruthy();
  });

});