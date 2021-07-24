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
    }, value);
    return this;
  }

  min(value: number) {
    this.set('min', (inpdata): boolean => {
      return inpdata.length >= value;
    }, value);
    return this;
  }

  max(value: number) {
    this.set('max', (inpdata): boolean => {
      return inpdata.length <= value;
    }, value);
    return this;
  }

  len(value: number) {
    this.set('len', (inpdata): boolean => {
      return inpdata.length === value;
    }, value);
    return this;
  }

  empty(enabled: boolean = false) {
    this.set('empty', (inpdata): boolean => {
      return (inpdata && inpdata.length) ? true : enabled;
    }, enabled);
    return this;
  }

  email() {
    this.set('email', (inpdata: string): boolean => {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/.test(inpdata);
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

  url() {
    this.set('url', (inpdata: string): boolean => {
      return /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(inpdata);
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
      return reg.test(inpdata.toString());
    }, reg);
    return this;
  }

  fullmatch(reg: RegExp) {
    this.set('fullmatch', (inpdata: string): boolean => {
      if (!isRegExp(reg)) {
        throw `Param of match must be type of RegExp`;
      }
      const mathRes = inpdata.match(reg) || [];
      return mathRes.join() === inpdata;
    }, reg);
    return this;
  }

  startWidth(value: string) {
    this.set('startWidth', (inpdata: string): boolean => {
      return inpdata.indexOf(value) === 0;
    }, value);
    return this;
  }

  endWidth(value: string) {
    this.set('endWidth', (inpdata: string): boolean => {
      return inpdata.lastIndexOf(value) === inpdata.length - value.length;
    }, value);
    return this;
  }

  oneOf(enumsets: Array<string>) {
    this.set('oneOf', (inpdata: string): boolean => {
      return enumsets.includes(inpdata);
    }, enumsets);
    return this;
  }

  numerical() {
    this.set('numerical', (inpdata: string): boolean => {
      const num = inpdata.replace(/\.0+$/g, '');
      return num === Number(num).toString();
    });
    return this;
  }

  hex() {
    this.set('hex', (inpdata: string) => {
      return /^(0x)?[0-9a-f]+$/gi.test(inpdata);
    });
    return this;
  }
}

export default Str;