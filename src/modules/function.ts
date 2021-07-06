import CheckBase from "./types/base";
import { isFunction } from '../utils/helper'

class Func extends CheckBase {
  
  constructor() {
    super();
  }

  protected is(value: any) {
    return isFunction(value);
  }

}

export default Func;