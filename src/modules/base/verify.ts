import Str from "../string";
import Func from "../function";

const objCheckRules = {
  validKeysTypeVerify: (new Str()).oneOf(['String', 'Array']).create(),
  validValsTypeVerify: (new Str()).oneOf(['String', 'Number', 'Boolean', 'Null', 'Undefined', 'Array']).create(),
  funcTypeVerify: (new Func()).create(),
  itemsTypeVerify: (new Str()).oneOf(['String', 'Function']).create()
};

const arrCheckRules = {
  itemValTypeVerify: (new Str()).oneOf(['String', 'Number', 'Boolean', 'Null', 'Undefined', 'Array']).create(),
}

export {
  objCheckRules,
  arrCheckRules,
};