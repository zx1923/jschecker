import CheckBase from "./base/check";

class Bool extends CheckBase {
  
  constructor() {
    super();
  }

  protected is(value: any) {
    return true;
  }

  isTrue() {
    this.set('isTrue', (inpdata: boolean) => {
      return inpdata === true;
    });
  }

  isFalse() {
    this.set('isFalse', (inpdata: boolean) => {
      return inpdata === false;
    });
  }

  truthy() {
    this.set('truthy', (inpdata: boolean) => {
      return Boolean(inpdata) === true;
    });
  }

  falsy() {
    this.set('falsy', (inpdata: boolean) => {
      return Boolean(inpdata) === false;
    });
  }

}

export default Bool;