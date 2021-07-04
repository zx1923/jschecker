const Checker = require('../dist/index').default

describe(`Test logic`, () => {

  test('logic check with and()', () => {
    const andCheck1 = Checker.and(true, true, false);
    expect(andCheck1).toBeFalsy();

    const andCheck2 = Checker.and(true, true, true);
    expect(andCheck2).toBeTruthy();

    const andCheck3 = Checker.and([undefined, null, true]);
    expect(andCheck3).toBeFalsy();

    const checkNumber = Checker.number().min(0).max(10).odd().create();
    const checkArray = Checker.array().min(0).max(10).maxLen(10).ordered('Up').create();
    const checkAndWithFns = Checker.and(checkNumber(7), checkArray([1, 2, 3, 4, 5]));
    expect(checkAndWithFns).toBeTruthy();
  });

  test('logic check with or()', () => {
    const orCheck1 = Checker.or(true, true, false);
    expect(orCheck1).toBeTruthy();

    const orCheck2 = Checker.or(false, false, false);
    expect(orCheck2).toBeFalsy();

    const orCheck3 = Checker.or([undefined, null, true]);
    expect(orCheck3).toBeTruthy();
  });

  test('logic check with not()', () => {
    const notCheck1 = Checker.not(null);
    expect(notCheck1).toBeTruthy();
    const notCheck2 = Checker.not({a: 1, b: 2});
    expect(notCheck2).toBeFalsy();
  });

});