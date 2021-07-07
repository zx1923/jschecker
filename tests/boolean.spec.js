const Checker = require('../dist/node/index').default

describe(`Test boolean`, () => {

  test('boolean', () => {
    const check = Checker.boolean().isTrue().create();
    expect(check(true)).toBeTruthy();
    expect(check(false)).toBeFalsy();
    expect(check(0)).toBeFalsy();
    expect(check(1)).toBeFalsy();
    expect(check([])).toBeFalsy();
    expect(check({})).toBeFalsy();
    expect(check('')).toBeFalsy();
    expect(check(null)).toBeFalsy();
    expect(check(undefined)).toBeFalsy();
  });

  test('boolean', () => {
    const check = Checker.boolean().isFalse().create();
    expect(check(false)).toBeTruthy();
    expect(check(true)).toBeFalsy();
    expect(check(0)).toBeFalsy();
    expect(check(1)).toBeFalsy();
    expect(check([])).toBeFalsy();
    expect(check({})).toBeFalsy();
    expect(check('')).toBeFalsy();
    expect(check(null)).toBeFalsy();
    expect(check(undefined)).toBeFalsy();
  });

  test('boolean', () => {
    const check = Checker.boolean().truthy().create();
    expect(check(true)).toBeTruthy();
    expect(check(false)).toBeFalsy();
    expect(check(0)).toBeFalsy();
    expect(check(1)).toBeTruthy();
    expect(check([])).toBeTruthy();
    expect(check({})).toBeTruthy();
    expect(check('')).toBeFalsy();
    expect(check(null)).toBeFalsy();
    expect(check(undefined)).toBeFalsy();
  });
  
  test('boolean', () => {
    const check = Checker.boolean().falsy().create();
    expect(check(false)).toBeTruthy();
    expect(check(true)).toBeFalsy();
    expect(check(0)).toBeTruthy();
    expect(check(1)).toBeFalsy();
    expect(check([])).toBeFalsy();
    expect(check({})).toBeFalsy();
    expect(check('')).toBeTruthy();
    expect(check(null)).toBeTruthy();
    expect(check(undefined)).toBeTruthy();
  });
  
  test('boolean check width required()', () => {
    const checkRequired = Checker.boolean().require(true).create();
    const checkNotRequired = Checker.boolean().require(false).create();

    expect(checkRequired()).toBeFalsy();
    expect(checkNotRequired()).toBeTruthy();
  });

});