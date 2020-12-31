// 洋葱圈模式 从前往后开始执行 将第一个函数的返回值作为后一个函数的入参

const add = (x, y) => x + y;
const squre = z => z * z;

// const compoose = (fn1, fn2) => (...args) => fn1(fn2(...args));
// 等同于
const compoose = function (fn1, fn2) {
  return function (...args) {
    fn1(fn2(...args));
  }
}

const result = compoose(squre, add)(8, 2);
console.log('compoose', result);
