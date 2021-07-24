import Bool from "./boolean";
import { isArray, isFunction, getTypeOf } from '../utils/helper';

function _checkItem(item: any): boolean {
  if (isFunction(item)) {
    return item();
  }
  return !!item;
}
class Logic {
  private lgAnds: Array<Function>
  private lgOrs: Array<Function>

  constructor() {
    this.lgAnds = [];
    this.lgOrs = [];
  }

  protected is(value: any) {
    return true;
  }

  private addCheckFn(target: Array<Function>, fns: Array<Function>) {
    if (!fns || !fns.length) {
      target.push(new Bool().truthy().create());
      return target;
    }
    return target.concat(fns);
  }

  and(...args: Array<Function>) {
    this.lgAnds = this.addCheckFn(this.lgAnds, args);
    return this;
  }

  or(...args: Array<Function>) {
    this.lgOrs = this.addCheckFn(this.lgOrs, args);
    return this;
  }

  create() {
    const lgAnds = [...this.lgAnds];
    const lgOrs = [...this.lgOrs];
    const fn = (...args: any): boolean => {
      let result = true;
      lgAnds.length && (result = result && lgAnds.every(fn => fn(...args)));
      lgOrs.length && (result = result && lgOrs.some(fn => fn(...args)));
      return result;
    };
    this.lgAnds = [];
    this.lgOrs = [];
    return fn;
  }

}

export default Logic;