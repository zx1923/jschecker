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

class CheckBase implements InputCheck {
  protected checkList: object
  protected required: boolean

  constructor() {
    this.checkList = {};
    this.required = true;
  }

  protected is(data: any): boolean {
    throw `Subclasses must implement this method`;
  }

  equal(data: any) {
    throw `Subclasses must implement this method`;
  }

  set(item: string, method: Function) {
    this.checkList[item] = method;
  }

  require(value: boolean) {
    this.required = value;
    return this;
  }

  create(...value: any) {
    const fn = (...args: any): boolean => {
      for (let i = 0, len = args.length; i < len; i++) {
        if (!this.is(args[i]) || !checkInputData(this.checkList, args[i])) {
          return false;
        }
      }
      return true;
    }
    if (!arguments.length) {
      return fn;
    }
    return fn(...value);
  }
}

export default CheckBase;