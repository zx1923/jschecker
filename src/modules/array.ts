import CheckBase from "./base/check";
import { isArray, isString, isFunction, getTypeOf } from '../utils/helper';

enum ArrOrderType {
  Up = 'Up',
  Down = 'Down',
};

declare function ItemFunc(item: any): boolean;

class Arr extends CheckBase {

  private forbiddenValues: Array<any>
  
  constructor() {
    super();
    this.forbiddenValues = [];
  }

  protected is(inpdata: Array<any>) {
    if ((!arguments.length || typeof inpdata === 'undefined') && !this.required) {
      return true;
    }
    if (!isArray(inpdata)) {
      return false;
    }
    // forbidden check
    for (let i = 0, len = this.forbiddenValues.length; i < len; i++) {
      if (inpdata.includes(this.forbiddenValues[i])) {
        return false;
      }
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
    });
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata: Array<any>): boolean => {
      return inpdata.length === value;
    });
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata: Array<any>): boolean => {
      return (inpdata && inpdata.length) ? true : enabled;
    });
    return this;
  }

  forbidden(value: any) {
    if (isArray(value)) {
      this.forbiddenValues = this.forbiddenValues.concat(value);
    } else {
      this.forbiddenValues.push(value);
    }
    return this;
  }

  every(fn: typeof ItemFunc | any) {
    let checkFn = (it) => {
      return Boolean(it);
    }
    if (isFunction(fn)) {
      checkFn = fn;
    }
    this.set('every', (inpdata: Array<any>): boolean => {
      for (let i = 0, len = inpdata.length; i < len; i++) {
        if (!checkFn(inpdata[i])) {
          return false;
        }
      }
      return true;
    });
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
      for (let i = 0, len = inpdata.length; i < len; i++) {
        if (checkFn(inpdata[i])) {
          return true;
        }
      }
      return false;
    });
    return this;
  }

  minLen(value: number) {
    this.set('minLen', (inpdata: Array<any>): boolean => {
      return inpdata.length >= value;
    });
    return this;
  }

  maxLen(value: number) {
    this.set('maxLen', (inpdata: Array<any>): boolean => {
      return inpdata.length <= value;
    });
    return this;
  }

  min(value: number) {
    this.set('min', (inpdata: Array<any>): boolean => {
      for (let i = 0; i < inpdata.length; i++) {
        if (inpdata[i] < value) {
          return false;
        }
      }
      return true;
    });
    return this;
  }

  max(value: number) {
    this.set('max', (inpdata: Array<any>): boolean => {
      for (let i = 0; i < inpdata.length; i++) {
        if (inpdata[i] > value) {
          return false;
        }
      }
      return true;
    });
    return this;
  }

  items(type: string | Function) {
    this.set('items', (inpdata: Array<any>): boolean => {
      let checkTypeFn = null;
      if (isString(type)) {
        checkTypeFn = (it) => {
          return getTypeOf(it) === type;
        }
      }
      else if (isFunction(type)) {
        checkTypeFn = type;
      }
      else {
        throw `type must be a string or a function`;
      }
      for (let i = 0; i < inpdata.length; i++) {
        if (!checkTypeFn(inpdata[i])) {
          return false;
        }
      }
      return true;
    });
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
        throw `type must be obe of 'Up' or 'Down'`;
      }
      for (let i = 0; i < inpdata.length - 1; i++) {
        if (!orderFn(inpdata[i], inpdata[i + 1])) {
          return false;
        }
      }
      return true;
    });
    return this;
  }

}

export default Arr;