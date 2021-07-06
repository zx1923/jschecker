import CheckBase from "./base/check";
import { isNumber } from '../utils/helper';

class Num extends CheckBase {

  constructor() {
    super();
  }

  protected is(inpdata: any) {
    if ((!arguments.length || typeof inpdata === 'undefined') && !this.required) {
      return true;
    }
    return !isNaN(inpdata) && isNumber(inpdata);
  }

  equal(value: number) {
    this.set('equal', (inpdata: number): boolean => {
      return inpdata === value;
    });
    return this;
  }
  
  min(value: number) {
    this.set('min', (inpdata: number): boolean => {
      return inpdata >= value;
    });
    return this;
  }

  max(value: number) {
    this.set('max', (inpdata: number): boolean => {
      return inpdata <= value;
    });
    return this;
  }

  odd() {
    this.set('odd', (inpdata: number): boolean => {
      return inpdata % 2 === 1;
    });
    return this;
  }

  even() {
    this.set('odd', (inpdata: number): boolean => {
      return inpdata % 2 === 0;
    });
    return this;
  }

  integer() {
    this.set('integer', (inpdata: number): boolean => {
      return !(/\./g.test(inpdata.toString()));
    });
    return this;
  }

  positive() {
    this.set('positive', (inpdata: number): boolean => {
      return inpdata > 0;
    });
    return this;
  }

  negative() {
    this.set('negative', (inpdata: number): boolean => {
      return inpdata < 0;
    });
    return this;
  }

  oneOf(nums: Array<number>) {
    this.set('in', (inpdata: number): boolean => {
      return nums.indexOf(inpdata) >= 0;
    });
    return this;
  }

  less(value: number) {
    this.set('less', (inpdata: number): boolean => {
      return inpdata < value;
    });
    return this;
  }

  greater(value: number) {
    this.set('greater', (inpdata: number): boolean => {
      return inpdata > value;
    });
    return this;
  }

}

export default Num;