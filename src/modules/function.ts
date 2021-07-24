import CheckBase from "./base/check";
import { isFunction, isAsyncFunction, getTypeOf } from '../utils/helper'

class Func extends CheckBase {
  
  constructor() {
    super();
  }

  protected is(value: any) {
    return isFunction(value) || isAsyncFunction(value);
  }

  oneOf(enumsets: Array<Function>) {
    this.set('oneOf', (inpdata: Function): boolean => {
      return enumsets.includes(inpdata);
    }, enumsets);
    return this;
  }

  asynchronous() {
    this.set('asynchronous', (inpdata: Function): boolean => {
      return isAsyncFunction(inpdata);
    });
    return this;
  }

  synchronous() {
    this.set('synchronous', (inpdata: Function): boolean => {
      return getTypeOf(inpdata) === 'Function';
    });
    return this;
  }

}

export default Func;