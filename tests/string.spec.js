const Checker = require('../dist/build/index');
const { Random } = require('mockjs');
const { truncateSync } = require('fs');

describe(`Test strings`, () => {

  test('string', () => {
    const rdmstr = 'abc' + Random.string(20) + 'def';
    const checkRes = Checker.string().min(10).max(100).startWidth('abc').endWidth('def').create(rdmstr);
    expect(checkRes).toBeTruthy();
  });

  test('string checklist should be different', () => {
    const check1 = Checker.string().max(100).min(0);
    const check2 = Checker.string().startWidth('abc').endWidth('def');

    const check1Keys = Object.keys(check1.checkList);
    const check2Keys = Object.keys(check2.checkList);

    expect(check1Keys.toString() === check2Keys.toString()).toBeFalsy();
  });

  test('string check width min() and max()', () => {
    const check = Checker.string().min(10).max(20).create();

    expect(check(Random.string(8))).toBeFalsy();
    expect(check(Random.string(18))).toBeTruthy();
  });

  test('string check width equal() and len()', () => {
    const strlen = 10;
    const testStr = Random.string(strlen);
    const check = Checker.string().len(strlen).equal(testStr).create();

    expect(check(Random.string(strlen + 1))).toBeFalsy();
    expect(check(testStr + ' ')).toBeFalsy();
    expect(check(testStr)).toBeTruthy();
  });

  test('string check width email(), ip() and uri()', () => {
    const rdmEmail = Random.email();
    const rdmIp = Random.ip();
    const rdmUri = Random.url();
    const rdmstr = Random.string();
    const checkIp = Checker.string().ip().create();
    const checkEmail = Checker.string().email().create();
    const checkUri = Checker.string().uri().create();

    expect(checkIp(rdmIp)).toBeTruthy();
    expect(checkIp(rdmIp + Random.string(3))).toBeFalsy();
    expect(checkIp(rdmIp + ' ')).toBeFalsy();
    expect(checkIp(rdmstr)).toBeFalsy();

    expect(checkEmail(rdmEmail)).toBeTruthy();
    expect(checkEmail(rdmEmail + ' ')).toBeFalsy();
    expect(checkEmail(rdmstr)).toBeFalsy();

    expect(checkUri(rdmUri)).toBeTruthy();
    expect(checkUri(rdmstr)).toBeFalsy();
  });

  test('string check width url()', () => {
    const urlRight = 'http://www.abcd.com';
    const urlErr = 'http:/www.abcd.com';
    const checkUrl = Checker.string().url().create();

    expect(checkUrl(urlRight)).toBeTruthy();
    expect(checkUrl(urlErr)).toBeFalsy();
  });

  test('string check width lowercase() and uppercase()', () => {
    const lowerStr = 'csfedcagdacf69';
    const upperStr = 'RYUGUIYIPJIOP65342';
    const mixStr = 'hkYUIghiGUOguohuiohoHO698';

    const lowercaseCheck = Checker.string().lowercase().create();
    const uppercaseCheck = Checker.string().uppercase().create();

    expect(lowercaseCheck(lowerStr)).toBeTruthy();
    expect(uppercaseCheck(upperStr)).toBeTruthy();

    expect(lowercaseCheck(mixStr)).toBeFalsy();
    expect(uppercaseCheck(mixStr)).toBeFalsy();
  });

  test('string check width startWidth() and endWith()', () => {
    const rdmstr = Random.string();
    const checkStartWidth = Checker.string().startWidth('abc').create();
    const checkEndWith = Checker.string().endWidth('def').create();
    const checkStartAndEnd = Checker.string().startWidth('abc').endWidth('def').create();

    expect(checkStartWidth('abc' + rdmstr)).toBeTruthy();
    expect(checkStartWidth('cba' + rdmstr)).toBeFalsy();

    expect(checkEndWith(rdmstr + 'def')).toBeTruthy();
    expect(checkEndWith(rdmstr + 'fed')).toBeFalsy();

    expect(checkStartAndEnd('abc' + rdmstr + 'def')).toBeTruthy();
    expect(checkStartAndEnd('def' + rdmstr + 'abc')).toBeFalsy();
  });

  test('string check width match()', () => {
    const matchReg = /[a-zA-Z0-9]+/g;
    const checkMatch = Checker.string().match(matchReg).create();

    const str1 = '342jhggjGHJG';
    const str2 = '54gkkgh^&*hghgGJKg';
    const str3 = '%&*)%)&)^&*';

    expect(checkMatch(str1)).toBeTruthy();
    expect(checkMatch(str2)).toBeTruthy();
    expect(checkMatch(str3)).toBeFalsy();
  });

  test('string check width fullmatch()', () => {
    const matchReg = /^[a-zA-Z0-9]+$/g;
    const checkFulmatch = Checker.string().fullmatch(matchReg).create();

    const str1 = '342jhggjGHJG';
    const str2 = '54gkkgh^&*hghgGJKg';

    expect(checkFulmatch(str1)).toBeTruthy();
    expect(checkFulmatch(str2)).toBeFalsy();
  });

  test('string check width empty()', () => {
    const check1 = Checker.string().empty().create();
    const check2 = Checker.string().empty(true).create();

    expect(check1('')).toBeFalsy();
    expect(check2('')).toBeTruthy();
    expect(check2(Random.string())).toBeTruthy();
  });

  test('string check mixed', () => {
    const check1 = Checker.string().min(1).max(100).startWidth('abc').endWidth('012').lowercase().create();
    const rdmstr = Random.string(94);
    const ckstr = `abc${rdmstr}012`.toLowerCase();

    expect(check1(rdmstr)).toBeFalsy();
    expect(check1(ckstr)).toBeTruthy();
  });
  
  test('string check width required()', () => {
    const checkRequired = Checker.string().require(true).create();
    const checkNotRequired = Checker.string().require(false).create();

    expect(checkRequired()).toBeFalsy();
    expect(checkNotRequired()).toBeTruthy();
  });
  
  test('string check width batch()', () => {
    const check = Checker.string().lowercase().min(1).max(5).create();

    expect(check('12', '34', '56')).toBeTruthy();
    expect(check('12', '34', '5TT6', '41fgdg')).toBeFalsy();
    expect(check(['12', '5TT6', '41fgdg'])).toBeFalsy();
  });

  test('string check width numerical()', () => {
    const check = Checker.string().numerical().create();

    expect(check('12')).toBeTruthy();
    expect(check('12.0')).toBeTruthy();
    expect(check('1abc')).toBeFalsy();
    expect(check('0xaa')).toBeFalsy();
  });

  test('string check width hex()', () => {
    const check = Checker.string().hex().create();

    expect(check('12')).toBeTruthy();
    expect(check('0.123')).toBeFalsy();
    expect(check('123.0')).toBeFalsy();
    expect(check('1abc')).toBeTruthy();
    expect(check('0xaa')).toBeTruthy();
    expect(check('0xaBc0')).toBeTruthy();
    expect(check('0xaaGh')).toBeFalsy();
    expect(check('puL02')).toBeFalsy();
  });

});