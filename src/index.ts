import Arr from './modules/array';
import Num from './modules/number';
import Obj from './modules/object';
import Str from './modules/string';
import Func from './modules/function';
import Bool from './modules/boolean';
import { and, or, not } from './modules/logic';

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

  static and = and

  static or = or

  static not = not
}

export default Checker;