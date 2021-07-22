import CheckBase from "./base/check";
import { isArray, isString, isFunction, getTypeOf, isObject } from '../utils/helper';
import { objCheckRules } from './base/verify';

class Obj extends CheckBase {

  constructor() {
    super();
  }

  protected is(inpdata: any) {
    if (!isObject(inpdata)) {
      return false;
    }
    return true;
  }

  /**
   * 检测对象中是否包含指定数据
   * 
   * @param obj 被检测对象
   * @param checkFn 检测函数
   * @param deep 是否深度检测
   */
  private _objDeepCheck(obj: object, checkFn: Function, deep: boolean = false) {
    if (!Object.keys(obj).length) {
      return false;
    }
    for (let key in obj) {
      // 初次检测，obj[key] 可能为引用类型
      if (!checkFn(key, obj[key])) {
        return false;
      }
      // 深度检测
      if (deep) {
        return this._objDeepCheck(obj[key], checkFn, deep);
      }
    }
    return true;
  }

  equal(value: object) {
    this.set('equal', (inpdata: object): boolean => {
      if (inpdata === value) {
        return true;
      }
      return JSON.stringify(inpdata) === JSON.stringify(value);
    }, value);
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata: object): boolean => {
      return (inpdata && Object.keys(inpdata).length) ? true : enabled;
    }, enabled);
    return this;
  }

  includeKeys(keys: Array<string>) {
    this.set('includeKeys', (inpdata: object): boolean => {
      for (let i = 0, len = keys.length; i < len; i++) {
        if (typeof inpdata[keys[i]] === 'undefined') {
          return false;
        }
      }
      return true;
    }, keys);
    return this;
  }

  invalidKeys(keysets: string | Array<string>, deepCheck: boolean = false) {
    const type = getTypeOf(keysets);
    if (!objCheckRules.validKeysTypeVerify(type)) {
      throw `Type of keysets '${type}' is invalid`;
    }
    let keyscheck = isArray(keysets) ? keysets : [keysets];
    this.set('invalidKeys', (inpdata: object) => {
      const checkFn = (key: string, value: any) => {
        return !keyscheck.includes(key);
      }
      return this._objDeepCheck(inpdata, checkFn, deepCheck);
    }, keysets);
    return this;
  }

  validKeys(keysets: string | Array<string>, deepCheck: boolean = false) {
    const type = getTypeOf(keysets);
    if (!objCheckRules.validKeysTypeVerify(type)) {
      throw `Type of keysets '${type}' is invalid`;
    }
    let keyscheck = isArray(keysets) ? keysets : [keysets];
    this.set('validKeys', (inpdata: object) => {
      const checkFn = (key: string, value: any) => {
        return keyscheck.includes(key);
      }
      return this._objDeepCheck(inpdata, checkFn, deepCheck);
    }, keysets);
    return this;
  }

  invalidValues(valsets: any | Array<string>, deepCheck: boolean = false) {
    const type = getTypeOf(valsets);
    if (!objCheckRules.validValsTypeVerify(type)) {
      throw `Type of keysets '${type}' is invalid`;
    }
    let valscheck = isArray(valsets) ? valsets : [valsets];

    this.set('invalidValues', (inpdata: object) => {
      const checkFn = (key: string, value: any) => {
        return !valscheck.includes(value);
      }
      return this._objDeepCheck(inpdata, checkFn, deepCheck);
    }, valsets);
    return this;
  }

  validValues(keysets: string | Array<string>, deepCheck: boolean = false) {
    const type = getTypeOf(keysets);
    if (!objCheckRules.validValsTypeVerify(type)) {
      throw `Type of keysets '${type}' is invalid`;
    }
    let keyscheck = isArray(keysets) ? keysets : [keysets];
    this.set('validValues', (inpdata: object) => {
      const checkFn = (key: string, value: any) => {
        return keyscheck.includes(value);
      }
      return this._objDeepCheck(inpdata, checkFn, deepCheck);
    }, keysets);
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata: object): boolean => {
      return Object.keys(inpdata).length === value;
    }, value);
    return this;
  }

  items(type: string | Function) {
    this.set('items', (inpdata: Array<any>): boolean => {
      let checkTypeFn = null;
      if (isString(type)) {
        checkTypeFn = (itValue) => {
          return getTypeOf(itValue) === type;
        }
      }
      else if (isFunction(type)) {
        checkTypeFn = type;
      }
      else {
        throw `type must be a string or a function`;
      }
      for (let key in inpdata) {
        if (!checkTypeFn(inpdata[key])) {
          return false;
        }
      }
      return true;
    }, type);
    return this;
  }

  every(fn: Function, deep: boolean = false) {
    this.set('every', (inpdata: object) => {
      const vryFn = (key: string, value: any) => {
        return fn(key, value);
      };
      return this._objDeepCheck(inpdata, vryFn, deep);
    });
    return this;
  }

  verify(ruleObj: object) {
    this.set('verify', (inpdata: object) => {
      for (let key in ruleObj) {
        const checkFn = ruleObj[key];
        if (!checkFn(inpdata[key])) {
          return false;
        }
      }
      return true;
    });
    return this;
  }

}

export default Obj;