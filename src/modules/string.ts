import CheckBase from "./types/base";
import { isRegExp, isString } from '../utils/helper'

class Str extends CheckBase {
  
  constructor() {
    super();
  }

  is(value: any) {
    return isString(value);
  }

  equal(value: string) {
    this.checkList['equal'] = (inpdata): boolean => {
      return inpdata === value;
    }
    return this;
  }

  min(value: number) {
    this.checkList['min'] = (inpdata): boolean => {
      return inpdata.length >= value;
    }
    return this;
  }

  max(value: number) {
    this.checkList['max'] = (inpdata): boolean => {
      return inpdata.length <= value;
    }
    return this;
  }

  len(value: number) {
    this.checkList['len'] = (inpdata): boolean => {
      return inpdata.length === value;
    }
    return this;
  }

  empty(enabled: boolean = false) {
    this.checkList['empty'] = (inpdata): boolean => {
      return (inpdata && inpdata.length) ? true : enabled;
    }
    return this;
  }

  email() {
    this.checkList['email'] = (inpdata: string): boolean => {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(inpdata);
    }
    return this;
  }

  ip() {
    this.checkList['ip'] = (inpdata: string): boolean => {
      return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(inpdata);
    }
    return this;
  }

  uri() {
    this.checkList['uri'] = (inpdata: string): boolean => {
      return /^(\w+:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(inpdata);
    }
    return this;
  }

  lowercase() {
    this.checkList['lowercase'] = (inpdata: string): boolean => {
      return !(/[A-Z]/g.test(inpdata));
    }
    return this;
  }

  uppercase() {
    this.checkList['uppercase'] = (inpdata: string): boolean => {
      return !(/[a-z]/g.test(inpdata));
    }
    return this;
  }

  match(reg: RegExp) {
    this.checkList['match'] = (inpdata: string): boolean => {
      const mathRes = inpdata.match(reg) || [];
      return mathRes.join() === inpdata;
    }
    return this;
  }

  startWidth(value: string) {
    this.checkList['startWidth'] = (inpdata: string): boolean => {
      return inpdata.indexOf(value) === 0;
    }
    return this;
  }

  endWidth(value: string) {
    this.checkList['endWidth'] = (inpdata: string): boolean => {
      return inpdata.lastIndexOf(value) === inpdata.length - value.length;
    }
    return this;
  }
}

export default Str;