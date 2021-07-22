interface InputCheck {
  set(item: string, method: Function)
  equal(data: any): any
};

/**
 * 检查输入的数据
 * 
 * @param checkList 检查定义
 * @param inpdata 被检查的输入数据
 * @returns 
 */
function checkInputData(checkList: object, inpdata: any) {
  for (let item in checkList) {
    if (!checkList[item](inpdata)) {
      return false;
    }
  }
  return true;
}

function isFilledUndefined(params: Array<any>) {
  return params.every(el => {
    return el === undefined;
  });
}

class CheckBase implements InputCheck {
  protected checkList: object
  protected descList: object
  protected required: boolean

  constructor() {
    this.checkList = {};
    this.descList = {};
    this.required = true;
  }

  protected is(data: any): boolean {
    throw `Subclasses must implement this method`;
  }

  equal(data: any) {
    throw `Subclasses must implement this method`;
  }

  set(item: string, method: Function, desc: any = null) {
    this.checkList[item] = method;
    this.descList[item] = desc;
    return this;
  }

  require(value: boolean = true) {
    this.required = value;
    return this;
  }

  summary() {
    for (let item in this.descList) {
      const desc = this.descList[item];
      console.log(desc);
    }
  }

  addRule(name: string, callback: Function, desc: string) {
    this.set(name, callback, desc);
    return this;
  }

  create() {
    const fn = (...args: any): boolean => {
      if (!this.required && (!args.length || isFilledUndefined(args))) {
        return true;
      }
      if (!args || !args.length) {
        return false;
      }
      for (let i = 0, len = args.length; i < len; i++) {
        if (!this.is(args[i]) || !checkInputData(this.checkList, args[i])) {
          return false;
        }
      }
      return true;
    };
    return fn;
  }
}

export default CheckBase;