import CheckBase from "./base/check";

class Bool extends CheckBase {
  
  constructor() {
    super();
  }

  protected is() {
    return true;
  }

  isTrue() {
    return this.set('isTrue', (inpdata: boolean) => {
      return inpdata === true;
    });
  }

  isFalse() {
    return this.set('isFalse', (inpdata: boolean) => {
      return inpdata === false;
    });
  }

  truthy() {
    return this.set('truthy', (inpdata: boolean) => {
      return (!!inpdata) === true;
    });
  }

  falsy() {
    return this.set('falsy', (inpdata: boolean) => {
      return (!!inpdata) === false;
    });
  }

}

export default Bool;