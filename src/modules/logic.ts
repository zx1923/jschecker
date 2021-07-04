import { isArray, isString, isFunction, getTypeOf } from '../utils/helper';

function _checkItem(item: any): boolean {
  if (isFunction(item)) {
    return item();
  }
  return Boolean(item);
}

function and(args: Array<any> = []): boolean {
  if (!isArray(args)) {
    args = Array.from(arguments);
  }
  return args.every(el => {
    return _checkItem(el);
  });
}

function or(args: Array<any> = []): boolean {
  if (!isArray(args)) {
    args = Array.from(arguments);
  }
  return args.some(el => {
    return _checkItem(el);
  });
}

function not(expression: any | Function): boolean {
  if (isFunction(expression)) {
    return !expression();
  }
  return !(Boolean(expression));
}

export {
  and,
  or,
  not,
};