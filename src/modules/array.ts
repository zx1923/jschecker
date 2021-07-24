import CheckBase from "./base/check";
import { isArray, isString, isFunction, getTypeOf } from '../utils/helper';
import { arrCheckRules } from './base/verify';
import { typeError } from '../utils/error';

enum ArrOrderType {
  Up = 'Up',
  Down = 'Down',
};

declare function ItemFunc(item: any): boolean;

class Arr extends CheckBase {
  
  constructor() {
    super();
  }

  private _isAllInclude(srcVal: Array<any>, beCheck: Array<any>) {
    for (let i = 0, len = beCheck.length; i < len; i++) {
      if (!srcVal.includes(beCheck[i])) {
        return false;
      }
    }
    return true;
  }

  protected is(inpdata: Array<any>) {
    if (!isArray(inpdata)) {
      return false;
    }
    return true;
  }

  equal(value: Array<any>) {
    // TODO: deep equal
    this.set('equal', (inpdata: Array<any>): boolean => {
      if (inpdata === value) {
        return true;
      }
      if (inpdata.length !== value.length) {
        return false;
      }
      for (let i = 0; i < inpdata.length; i++) {
        if (inpdata[i] !== value[i]) {
          return false;
        }
      }
      return true;
    }, value);
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata: Array<any>): boolean => {
      return inpdata.length === value;
    }, value);
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata: Array<any>): boolean => {
      return (inpdata && inpdata.length) ? true : enabled;
    }, enabled);
    return this;
  }

  invalid(valsets: any | Array<any>) {
    const type = getTypeOf(valsets);
    if (!arrCheckRules.itemValTypeVerify(type)) {
      throw typeError(type);
    }
    const check = (inpdata: Array<any>) => {
      const vals = isArray(valsets) ? valsets : [valsets];
      return !this._isAllInclude(inpdata, vals);
    }
    return this.set('invalid', check, valsets);
  }

  valid(valsets: any | Array<any>) {
    const type = getTypeOf(valsets);
    if (!arrCheckRules.itemValTypeVerify(type)) {
      throw typeError(type);
    }
    const check = (inpdata: Array<any>) => {
      const vals = isArray(valsets) ? valsets : [valsets];
      return this._isAllInclude(vals, inpdata);
    }
    return this.set('valid', check, valsets);
  }

  every(fn: typeof ItemFunc | any) {
    let checkFn = (it) => {
      return Boolean(it);
    }
    if (isFunction(fn)) {
      checkFn = fn;
    }
    this.set('every', (inpdata: Array<any>): boolean => {
      return inpdata.every(el => {
        return checkFn(el);
      });
    }, fn);
    return this;
  }

  some(fn: typeof ItemFunc | any) {
    let checkFn = (it) => {
      return Boolean(it);
    }
    if (isFunction(fn)) {
      checkFn = fn;
    }
    this.set('some', (inpdata: Array<any>): boolean => {
      return inpdata.some(el => {
        return checkFn(el);
      });
    }, fn);
    return this;
  }

  minLen(value: number) {
    this.set('minLen', (inpdata: Array<any>): boolean => {
      return inpdata.length >= value;
    }, value);
    return this;
  }

  maxLen(value: number) {
    this.set('maxLen', (inpdata: Array<any>): boolean => {
      return inpdata.length <= value;
    }, value);
    return this;
  }

  min(value: number) {
    this.set('min', (inpdata: Array<any>): boolean => {
      return inpdata.every(el => {
        return el >= value;
      });
    }, value);
    return this;
  }

  max(value: number) {
    this.set('max', (inpdata: Array<any>): boolean => {
      return inpdata.every(el => {
        return el <= value;
      });
    }, value);
    return this;
  }

  items(typeFn: Function) {
    this.set('items', (inpdata: Array<any>): boolean => {
      if (!isFunction(typeFn)) {
        throw `type must be a string or a function`;
      }
      return inpdata.every(el => {
        return typeFn(el);
      });
    }, typeFn);
    return this;
  }

  ordered(type: ArrOrderType) {
    this.set('ordered', (inpdata: Array<any>): boolean => {
      let orderFn = null;
      if (type === ArrOrderType.Up) {
        orderFn = (a, b): boolean => { return a <= b };
      }
      else if (type === ArrOrderType.Down) {
        orderFn = (a, b): boolean => { return a >= b };
      }
      else {
        throw `type must be one of 'Up' or 'Down'`;
      }
      for (let i = 0; i < inpdata.length - 1; i++) {
        if (!orderFn(inpdata[i], inpdata[i + 1])) {
          return false;
        }
      }
      return true;
    }, type);
    return this;
  }

}

export default Arr;