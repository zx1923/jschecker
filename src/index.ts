import { Arr, ArrOrdered } from './modules/array';
import Num from './modules/number';
import Obj from './modules/object';
import Str from './modules/string';
import Func from './modules/function';
import Bool from './modules/boolean';
import Logic from './modules/logic';

const TypeLogic = new Logic();

class Checker {
  /**
   * check number
   * @returns Number
   */
  static number() {
    return new Num();
  }

  /**
   * check string
   * @returns String
   */
  static string() {
    return new Str();
  }

  /**
   * check array
   * @returns Array
   */
  static array() {
    return new Arr();
  }

  /**
   * check object
   * @returns Object
   */
  static object() {
    return new Obj();
  }

  static func() {
    return new Func();
  }

  static boolean() {
    return new Bool();
  }

  static and(...args: Array<Function>): typeof TypeLogic {
    return TypeLogic.and.apply(TypeLogic, args);
  }

  static or(...args: Array<Function>): typeof TypeLogic {
    return TypeLogic.or.apply(TypeLogic, args);
  }

  static ArrOrdered = ArrOrdered

}

export = Checker;