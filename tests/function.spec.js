const Checker = require('../dist/build/index');

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

  test('func check width oneOf()', () => {
    const func1 = () => {};
    const func2 = () => {};
    const func3 = () => {};
    const fnEnums = [ func1, func2 ];
    const checkFnEnum = Checker.func().oneOf(fnEnums).create();

    expect(checkFnEnum(func1, func1)).toBeTruthy();
    expect(checkFnEnum(func3)).toBeFalsy();
  });

  test('func check width asynchronous()', () => {
    const checkAsyncFn = Checker.func().asynchronous().create();
    const syncfn = () => {};
    async function asyncfn() { };

    expect(checkAsyncFn(syncfn)).toBeFalsy();
    expect(checkAsyncFn(asyncfn)).toBeTruthy();
  });

  test('func check width synchronous()', () => {
    const checkAsyncFn = Checker.func().synchronous().create();
    const syncfn = () => {};
    async function asyncfn() { };

    expect(checkAsyncFn(syncfn)).toBeTruthy();
    expect(checkAsyncFn(asyncfn)).toBeFalsy();
  });

});