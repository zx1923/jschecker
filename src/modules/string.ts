import CheckBase from "./base/check";
import { isRegExp, isString } from '../utils/helper'

class Str extends CheckBase {
  
  constructor() {
    super();
  }

  protected is(value: any) {
    return isString(value);
  }

  equal(value: string) {
    this.set('equal', (inpdata): boolean => {
      return inpdata === value;
    });
    return this;
  }

  min(value: number) {
    this.set('min', (inpdata): boolean => {
      return inpdata.length >= value;
    });
    return this;
  }

  max(value: number) {
    this.set('max', (inpdata): boolean => {
      return inpdata.length <= value;
    });
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata): boolean => {
      return inpdata.length === value;
    });
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata): boolean => {
      return (inpdata && inpdata.length) ? true : enabled;
    });
    return this;
  }

  email() {
    this.set('email', (inpdata: string): boolean => {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(inpdata);
    });
    return this;
  }

  ip() {
    this.set('ip', (inpdata: string): boolean => {
      return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(inpdata);
    });
    return this;
  }

  uri() {
    this.set('uri', (inpdata: string): boolean => {
      return /^(\w+:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(inpdata);
    });
    return this;
  }

  lowercase() {
    this.set('lowercase', (inpdata: string): boolean => {
      return !(/[A-Z]/g.test(inpdata));
    });
    return this;
  }

  uppercase() {
    this.set('uppercase', (inpdata: string): boolean => {
      return !(/[a-z]/g.test(inpdata));
    });
    return this;
  }

  match(reg: RegExp) {
    this.set('match', (inpdata: string): boolean => {
      if (!isRegExp(reg)) {
        throw `Param of match must be type of RegExp`;
      }
      const mathRes = inpdata.match(reg) || [];
      return mathRes.join() === inpdata;
    });
    return this;
  }

  startWidth(value: string) {
    this.set('startWidth', (inpdata: string): boolean => {
      return inpdata.indexOf(value) === 0;
    });
    return this;
  }

  endWidth(value: string) {
    this.set('endWidth', (inpdata: string): boolean => {
      return inpdata.lastIndexOf(value) === inpdata.length - value.length;
    });
    return this;
  }
}

export default Str;