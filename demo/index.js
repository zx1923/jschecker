import Checker from '../dist/brow/lib/jschecker';

const checkNum = Checker.number().min(10).max(100).create();
console.log(checkNum(20));
console.log(checkNum(120));