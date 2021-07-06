import CheckBase from "./base/check";
import { isArray, isString, isFunction, getTypeOf, isObject } from '../utils/helper';

class Obj extends CheckBase {
  private forbiddenValues: Array<any>

  constructor() {
    super();
    this.forbiddenValues = [];
  }

  protected is(inpdata: any) {
    if (!isObject(inpdata)) {
      return false;
    }
    // forbidden check
    for (let key in inpdata) {
      if (this.forbiddenValues.includes(inpdata[key])) {
        return false;
      }
      // TODO: deep check
    }
    return true;
  }

  equal(value: object) {
    this.set('equal', (inpdata: object): boolean => {
      if (inpdata === value) {
        return true;
      }
      return JSON.stringify(inpdata) === JSON.stringify(value);
    });
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata: object): boolean => {
      return (inpdata && Object.keys(inpdata).length) ? true : enabled;
    });
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
    });
    return this;
  }

  forbiddenKeys(keys: Array<string>) {
    this.set('forbiddenKeys', (inpdata: object): boolean => {
      for (let i = 0, len = keys.length; i < len; i++) {
        if (typeof inpdata[keys[i]] !== 'undefined') {
          return false;
        }
      }
      return true;
    });
    return this;
  }

  forbidden(value: any | Array<string>) {
    if (isArray(value)) {
      this.forbiddenValues = this.forbiddenValues.concat(value);
    } else {
      this.forbiddenValues.push(value);
    }
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata: object): boolean => {
      return Object.keys(inpdata).length === value;
    });
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
    });
    return this;
  }

}

export default Obj;