const Checker = require('./dist/node/index').default;

const checkPassword = Checker.string().min(1).max(20).match(/[a-z0-9A-Z]+/g).create();

console.log(checkPassword('321gdsGHuo'));
// const inpdata = '123fdsaYUIY%&^%HI6979';
// const reg = /123[a-zA-Z0-9]+/g;
// res = inpdata.match(reg);
// console.log(res.join());

// const matchReg = /^[a-zA-Z0-9]+$/g;
// const check = Checker.string().match(matchReg).create();
// console.log(check('342jhggjGHJG'));	// true
// console.log(check('54gkkgh^&*hg'));	// false