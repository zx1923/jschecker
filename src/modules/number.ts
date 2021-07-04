import CheckBase from "./types/base";
import { isNumber } from '../utils/helper';

class Num extends CheckBase {

  constructor() {
    super();
  }

  is(inpdata: any) {
    return !isNaN(inpdata) && isNumber(inpdata);
  }

  equal(value: number) {
    this.checkList['equal'] = (inpdata: number): boolean => {
      return inpdata === value;
    }
    return this;
  }
  
  min(value: number) {
    this.checkList['min'] = (inpdata: number): boolean => {
      return inpdata >= value;
    }
    return this;
  }

  max(value: number) {
    this.checkList['max'] = (inpdata: number): boolean => {
      return inpdata <= value;
    }
    return this;
  }

  odd() {
    this.checkList['odd'] = (inpdata: number): boolean => {
      return inpdata % 2 === 1;
    }
    return this;
  }

  even() {
    this.checkList['odd'] = (inpdata: number): boolean => {
      return inpdata % 2 === 0;
    }
    return this;
  }

  integer() {
    this.checkList['integer'] = (inpdata: number): boolean => {
      return !(/\./g.test(inpdata.toString()));
    }
    return this;
  }

  positive() {
    this.checkList['positive'] = (inpdata: number): boolean => {
      return inpdata > 0;
    }
    return this;
  }

  negative() {
    this.checkList['negative'] = (inpdata: number): boolean => {
      return inpdata < 0;
    }
    return this;
  }

  oneOf(nums: Array<number>) {
    this.checkList['in'] = (inpdata: number): boolean => {
      return nums.indexOf(inpdata) >= 0;
    }
    return this;
  }

  less(value: number) {
    this.checkList['less'] = (inpdata: number): boolean => {
      return inpdata < value;
    }
    return this;
  }

  greater(value: number) {
    this.checkList['greater'] = (inpdata: number): boolean => {
      return inpdata > value;
    }
    return this;
  }

}

export default Num;