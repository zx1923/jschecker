const Checker = require("js-checker");

const arrtest = [12, 34, 56, 78, 90];
const checkRes = Checker.array().min(10).max(100).len(5).minLen(1).maxLen(10).create();
console.log(checkRes(arrtest));

const checkBase = Checker.array().create();
console.log(checkBase({ length: 3 }));