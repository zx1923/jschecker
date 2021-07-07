import CheckBase from "./base/check";
import { isFunction } from '../utils/helper'

class Func extends CheckBase {
  
  constructor() {
    super();
  }

  protected is(value: any) {
    return isFunction(value);
  }

  oneOf(enumsets: Array<Function>) {
    this.set('oneOf', (inpdata: Function): boolean => {
      return enumsets.includes(inpdata);
    }, enumsets);
    return this;
  }

}

export default Func;