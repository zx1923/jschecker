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

});