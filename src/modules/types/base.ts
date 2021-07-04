interface InputCheck {
  is(data: any): any
  equal(data: any): any
};

class CheckBase implements InputCheck {
  checkList: object
  constructor() {
    this.checkList = {};
  }

  is(data: any): boolean {
    throw `Subclasses must implement this method`;
  }

  equal(data: any) {
    throw `Subclasses must implement this method`;
  }

  create(value: any) {
    const fn = (data): boolean => {
      if (!this.is(data)) {
        return false;
      }

      for (let func in this.checkList) {
        if (!this.checkList[func](data)) {
          return false;
        }
      }
      return true;
    }
    if (!arguments.length) {
      return fn;
    }

    return fn(value);
  }
}

export default CheckBase;