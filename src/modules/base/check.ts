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
  protected descList: object
  protected required: boolean

  constructor() {
    this.checkList = {};
    this.descList = {};
    this.required = true;
  }

  private translateDesc(descItem: string, val: any) {

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

  require(value: boolean) {
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
    return (...args: any): boolean => {
      if (!args.length && this.required) {
        return false;
      }
      for (let i = 0, len = args.length; i < len; i++) {
        if (!this.is(args[i]) || !checkInputData(this.checkList, args[i])) {
          return false;
        }
      }
      return true;
    };
  }
}

export default CheckBase;