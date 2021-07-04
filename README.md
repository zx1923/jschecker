# jschecker

**jschecker** 是一个数据校验辅助工具，可以快速构建一套数据校验规则。

- [jschecker](#jschecker)
  - [Features](#features)
  - [编译/打包](#编译打包)
    - [node环境](#node环境)
    - [浏览器环境](#浏览器环境)
  - [单元测试](#单元测试)
  - [APIs](#apis)
    - [公共处理](#公共处理)
      - [create()](#create)
      - [is(input)](#isinput)
    - [逻辑处理](#逻辑处理)
      - [and(arg1, arg2)](#andarg1-arg2)
      - [or(arg1, arg2)](#orarg1-arg2)
      - [not(expression)](#notexpression)
    - [number](#number)
      - [number.equal(value)](#numberequalvalue)
      - [number.min(value)](#numberminvalue)
      - [number.max(value)](#numbermaxvalue)
      - [number.odd(value)](#numberoddvalue)
      - [number.even(value)](#numberevenvalue)
      - [number.integer(value)](#numberintegervalue)
      - [number.positive(value)](#numberpositivevalue)
      - [number.negative(value)](#numbernegativevalue)
      - [number.oneOf(value)](#numberoneofvalue)
      - [number.less(value)](#numberlessvalue)
      - [number.greater(value)](#numbergreatervalue)
    - [string](#string)
      - [string.equal(value)](#stringequalvalue)
      - [string.min(value)](#stringminvalue)
      - [string.max(value)](#stringmaxvalue)
      - [string.len(value)](#stringlenvalue)
      - [string.empty(enabled)](#stringemptyenabled)
      - [string.email()](#stringemail)
      - [string.ip()](#stringip)
      - [string.uri()](#stringuri)
      - [string.lowercase()](#stringlowercase)
      - [string.uppercase()](#stringuppercase)
      - [string.match(RegExp)](#stringmatchregexp)
      - [string.startWidth(value)](#stringstartwidthvalue)
      - [string.endWidth(value)](#stringendwidthvalue)
    - [array](#array)
      - [array.equal(value)](#arrayequalvalue)
      - [array.len(value)](#arraylenvalue)
      - [array.empty(enabled)](#arrayemptyenabled)
      - [array.forbidden(value)](#arrayforbiddenvalue)
      - [array.every(fn)](#arrayeveryfn)
      - [array.some(fn)](#arraysomefn)
      - [array.minLen(value)](#arrayminlenvalue)
      - [array.maxLen(value)](#arraymaxlenvalue)
      - [array.min(value)](#arrayminvalue)
      - [array.max(value)](#arraymaxvalue)
      - [array.items(type)](#arrayitemstype)
      - [array.ordered(by)](#arrayorderedby)
## Features

- 轻量，没有任何依赖；
- 支持链式调用；
- 语法清晰，使用非常简单；

## 编译/打包

首先运行下面命令安装依赖：

```shell
npm i
# or
npm install
```

以上命令执行完成后会在项目目录下安装开发依赖。

### node环境

运行：

```shell
npm run build:node
```

打包完成后的输出目录为 `dist/node` 。

### 浏览器环境

运行：

```shell
npm run build:brow
```

打包完成后的输出目录为 `dist/brow` 。

## 单元测试

进行单元测试，可以在项目目录下运行：

```shell
npm run test
```

## APIs

**jschecker** 支持对普通类型和引用类型进行校验定义，可以使用的模块包括：

- **number()**
- **string()**
- **array()**
- **object()**
- **and(arg1, arg2)**
- **or(arg1, arg2)**
- **not(expression)**

### 公共处理

#### create()

该方法用于生成一个校验函数的引用。

```js
// 下方代码用于生成一个判断输入值是否为整数的校验函数 check
const check = Checker.number().integer().create();
// 调用 check 函数进行校验
check(12);	// true
check(-1);	// true
check(3.14);// false
```

#### is(input)

**is** 方法用于对输入值进行前置判断，开发者一般无需调用。

```js
const check = Checker.number().create();
check(true);	// false, true 不是 Number 类型
```

对输入值的初次判断时隐式的，在调用 check 方法时就已经完成，开发者无需单独调用。

### 逻辑处理

#### and(arg1, arg2)

**and** 方法用于实现逻辑与判断，支持数组参数，或不定长参数，其实现逻辑类似于 `Array.every` ，当所传入的参数全部校验为 true 时则返回 true ，只要有一个判断为 false 则返回 false。

#### or(arg1, arg2)

**or** 方法与 **and** 方法类似，也接受传入数组或不定长参数，其实现逻辑与 `Array.some` 类似，当传入的参数至少有一个校验为 true 时返回 true ，否则返回 false 。

#### not(expression)

**not** 方法用于对给定的参数取逻辑非的值，等价于 `!` 运算符。

下面看一个示例，使用 **jschecker** 将一个复杂的逻辑判断表达出来。

```js
// 校验密码，需要最新8个字符，最大20个字符，必须包含小写字母，大写字母和数字
const checkPwd = Checker.string().min(8).max(20).match(/[a-z0-9A-Z]+/g).create();
// 校验账户，必须是邮箱，且最小8个字符长度，最大20个字符长度
const checkEmail = Checker.string().min(8).max(20).email().create();
// 用户输入的账号和密码
const username = 'ghj432h5@gds.com';
const password = 'fdsFS321gdsGHuo4n';
// 账户和密码必须同时满足校验规则
const result = Checker.and(checkPwd(password), checkEmail(username));
```

### number

**number** 模块主要处理 number 类型相关的校验。

#### number.equal(value)

判断输入值是否与定义值相等。

```js
const check = Checker.number().equal(10).create();
check(10); // true
```

#### number.min(value)

判断输入值是否大于等于所设置的最小值；

```js
const check = Checker.number().min(10).create();
check(5); 	// true
check(1); 	// false
```

#### number.max(value)

判断输入值是否小于等于所设置的最大值。

```js
const check = Checker.number().max(10).create();
check(5); 	// true
check(15); 	// false
```

#### number.odd(value)

判断输入值是否为奇数。

```js
const check = Checker.number().odd().create();
check(5); 	// true
check(6); 	// false
```

#### number.even(value)

判断输入值是否为偶数。

```js
const check = Checker.number().even().create();
check(5); 	// false
check(6); 	// true
```

#### number.integer(value)

判断输入值是否在整数。

```js
const check = Checker.number().integer().create();
check(5); 	// true
check(-5); 	// true
check(5.5); // false
```

#### number.positive(value)

判断输入值是否为正数，即大于0，不包括0。

```js
// 结合 integer ，校验输入值是否为正整数
const check = Checker.number().integer().positive().create();
check(5); 	// true
check(-5); 	// false
```

#### number.negative(value)

判断输入值是否在负数，即小于0，不包括0。

```js
const check = Checker.number().positive().create();
check(5); 	// false
check(-5); 	// true
check(-1.5);// true
```

#### number.oneOf(value)

判断输入值是否为给定数组中的一个元素。

```js
const datalist = [1, 2, 3, 4, 5];
const check = Checker.number().min(5).max(10).oneOf(datalist).create();
check(2);	// false, 2 < min(5)
check(5);	// true, 5 >= min(5) and 5 in datalist
```

#### number.less(value)

判断输入值是否小于所设置的值，不包括等于的情况，使用与 `min` 和 `max` 类似。

#### number.greater(value)

判断输入值是否大于所设置的值，不包括等于的情况。

```js
const check = Checker.number().greater(0).less(10);
check(1);	// true, 0 < 1 < 10 is true
check(10);	// false, 0 < 10 < 10 is false
```

### string

**string** 模块主要处理字符串类型相关的校验。

#### string.equal(value)

判断输入值与所设置的值是否相等。

```js
const check = Checker.string().len(10).equal('abc').create();
check('abc');	// true
check('cba');	// false
```

#### string.min(value)

判断输入字符串的长度是否大于等于所设置的最小长度。

#### string.max(value)

判断输入字符串的长度是否小于等于所设置的最大长度。

```js
const check = Checker.string().min(10).max(20).create();
check('hello world'); 	// true
check('hi');			// false
```

#### string.len(value)

判断输入字符串的长度是否等于所设置的值。

```js
const check = Checker.string().len(10).create();
check('hello world'); 	// false
check('helloworld');	// true
```

#### string.empty(enabled)

是否开启字空字符串判断，enabled 取值：

- `false`，**默认值**，表示禁用空字符串，当传入空字符串时校验结果为 false ；
- `true`，表示使用空对象，允许传入空字符串；

#### string.email()

判断输入的字符串是否为邮箱地址。

```js
const check = Checker.string().email().create();
check('123@abc.com');	// true
check('123:abc.com');	// false
```

#### string.ip()

判断输入的字符串是否为 ip 地址。

```js
const check = Checker.string().ip().create();
check('127.0.0.1'); 	// true
check('localhost'); 	// false
```

#### string.uri()

判断输入的字符串是否为 uri 地址。

```js
const check = Checker.string().uri().create();
check('http://localhost'); 	// true
check('127.0.0.1:80'); 		// false
```

#### string.lowercase()

判断输入的字符串是否是由小写字母组成（除了字母外的字符不在校验范围内）。

```js
const check = Checker.string().lowercase().create();
check('csfedcagdacf69');	// true
check('678Ggi^&^(giHJ');	// false
```

#### string.uppercase()

判断输入字符串是否由大写字母组成（除了字母外的字符不在校验范围内）。

```js
const check = Checker.string().uppercase().create();
check('RYUGUIYIPJIOP65342');	// true
check('hkYUIgh^&*ohoHO698');	// false
```

#### string.match(RegExp)

判断输入字符串是否能匹配给定的正则表达式，需要注意，该匹配指一次性全量匹配。

```js
const matchReg = /^[a-zA-Z0-9]+$/g;
const check = Checker.string().match(matchReg).create();
check('342jhggjGHJG');	// true
check('54gkkgh^&*hg');	// false
```

#### string.startWidth(value)

判断输入的字符串是否由指定的字符串开头。

#### string.endWidth(value)

判断输入的字符串是否有指定的字符串结尾。

```js
// 判断字符串是否由 abc 开头，并由 123 结尾，且字符串中包含的字母全部为小写
const check = Checker.string().startWidth('abc').endWidth('123').lowercase().create();
check('abc-ghgjoh67^&*123');	// true
check('abcHuGHIoh67^&*123');	// false，包含了大写字母
check('abchijHIoh67^&*012');	// false，不是 123 结尾
```

### array

**array** 模块用于处理与数组有关的校验。

#### array.equal(value)

判断输入的数组是否与给定的数组相等。相等有两种情况：

- 数组所指向的地址相等，则判断这两个数组相等；
- 数组地址不等，但数组每一项的值相等，则判断这两个数组相等；

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [ ...arr1 ];
const check = Checker.array().equal(arr1).create();
check(arr1);	// true, 指向的内存地址相同
check(arr2);	// true, 每一项的值相等
```

#### array.len(value)

判断输入的数组长度是否与预设值相等。

#### array.empty(enabled)

是否开启字空数组判断，enabled 取值：

- `false`，**默认值**，表示禁用空数组，当传入空数组时校验结果为 false ；
- `true`，表示使用空数组，允许传入空数组；

#### array.forbidden(value)

判断数组是否包含了被禁止的元素，如果数组包含了被禁止元素，将直接返回 false 。

```js
const arrdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// 设置数组元素不能包含 0 值
const check = Checker.array().forbidden(0).create();
check(arrdata);	// false
```

#### array.every(fn)

类似于 `Array.every` ，对输入数值的每一项进行逻辑判断，当所有项都为 true 时返回 true 。`fn` 是非必须参数，当没有传入 `fn` 时，将会自动对数组的每一项转布尔类型。

```js
// 检查给定数组是否全部由偶数组成
const arrEven = [0, 2, 4, 6, 8, 10];
const arrMixed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const isEven = Checker.number().even().create();
const checkEven = Checker.array().every(isEven).create();
checkEven(arrEven);		// true
checkEven(arrMixed);	// true
```

#### array.some(fn)

与上文的 `array.every` 类似，对输入数组的每一项做逻辑判断，当至少有一项判断为 true 时返回 true ，否则返回 false ，`fn` 不传时将自动对数组的每一项做布尔判断。

```js
// 检查给定数组是否包含奇数元素
const arrEven = [0, 2, 4, 6, 8, 10];
const arrMixed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const isOdd = Checker.number().odd().create();
const checkOdd = Checker.array().some(isOdd).create();
checkOdd(arrEven);	// false
checkOdd(arrMixed);	// true
```

#### array.minLen(value)

判断输入数组的长度是否大于等于所设置的最小长度。

#### array.maxLen(value)

判断输入的数组的长度是否小于等于所设置的最大长度。

#### array.min(value)

判断输入数组的元素最小值是否大于等于所设置的最小值。

#### array.max(value)

判断数组数组的元素最大值是否小于等于所设置的最大值。

#### array.items(type)

判断输入数组的每一项是否由指定的 `type` 类型组成，`type` 可以是一个函数。

```js
const arr1 = [1, 2, 3, 4, 5, 0];
const arr2 = ['a', 'b', 'c', '4', '5', '0'];
const checkNumber = Checker.array().items('Number').create();
const checkString = Checker.array().items('String').create();
checkNumber(arr1); 	// true
checkString(arr1);	// false
checkNumber(arr2); 	// false
checkString(arr2); 	// true
```

#### array.ordered(by)

判断输入的数组知否符合指定的排序规则，目前 `by` 支持的取值有：

- `Up` 升序排列；
- `Down` 降序排序；

```js
const arrData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const checkUp = Checker.array().ordered('Up').create();
const checkDown = Checker.array().ordered('Down').create();

checkUp(arrData);	// true
checkDown(arrData);	// false
```

### object

**object** 模块主要用于处理 `object` 类型相关的校验

#### object.equal(value)

判断输入的对象与预设对象是否相等，判断相等的原则：

- 如果两个对象都指向同一个内存地址，则判断为相等；
- 如果两个对象没有指向同一个地址，但是两个对象的每一个字段及其字段值都相等，则判断为相等；

```js
const obj1 = {a: 1, b: 2};
const obj2 = obj1;
const obj3 = {a: 1, b: 2};
const obj4 = {...obj1, c: 3};
const check = Checker.object().equal(obj1).create();

check(obj2);	// true
check(obj3);	// true
check(obj4);	// false
```

#### object.empty(enabled)

是否开启字空对象判断，enabled 取值：

- `false`，**默认值**，表示禁用空对象，当传入空对象时校验结果为 false ；
- `true`，表示使用空对象，允许传入空对象；

#### object.includeKeys(keys)

判断输入对象是否包含了所以指定的字段 。

```js
const keys = ['name', 'age'];
const objErr = { a: 1, b: 2, c: 3 };
const objRight = { name: 'Sean', age: 20, c: 3 };
const checkNoInclude = Checker.object().create();
const checkUseInclude = Checker.object().includeKeys(keys).create();
checkNoInclude(objRight);	// true
checkUseInclude(objRight);	// true
checkNoInclude(objErr);		// true
checkUseInclude(objErr);	// false
```

#### object.forbiddenKeys(keys)

判断输入的对象是否包含了被禁用的字段，示例代码参考 `object.includeKeys` 即可。

#### object.forbidden(value)

判断输入的对象中的字段是否存在禁用的值。

```js
// 对象的值不能包含数字 1
const obj = {a: 1, b: 2};
const check = Checker.object().forbidden(1).create();
check(obj);	// false
```

#### object.len(value)

判断输入的对象的是否满足指定长度，长度的意思为 `Object.keys(inputObj).length` 。

#### object.items(type)

判断输入对象的每一字段的值的是否符合指定的类型，`type` 可以取值 `String` 、`Number` 等值，也可以是一个函数。

```js
const objNumber = {a: 1, b: 2, c: 3};
const objMixed = {...objNumber, d: [1, 2], e: null};
const checkByType = Checker.object().items('Number').create();
checkByType(objNumber);	// true
checkByType(objMixed);	// false
```

当 `type` 为一个 `Function` 时：

```js
const fn = (itvalue) => {
  return ['Number', 'String', 'Array', 'Null'].includes(getTypeOf(itvalue));
}
const checkByFn = Checker.object().items(fn).create();
checkByFn(objNumber);	// true
checkByFn(objMixed);	// false
```

