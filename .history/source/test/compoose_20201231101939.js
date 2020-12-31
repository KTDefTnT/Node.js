// 洋葱圈模式 从前往后开始执行 将第一个函数的返回值作为后一个函数的入参

// const add = (x, y) => x + y;
// const squre = z => z * z;

// 指定为两个中间件入参 高阶函数
// const compoose = (fn1, fn2) => (...args) => fn2(fn1(...args));
// 等同于
// const compoose = function (fn1, fn2) {
//   return function (...args) {
//     return fn2(fn1(...args));
//   }
// }

// 多个中间件 使用数组进行模拟
const compoose = (...[first, ...others]) => (...args) => {
  let result = first(...args);
  others.map(fn => {
    result = fn(result);
  });
  return result;
}

// 中间件有异步操作
function delay() {
  return new Promise((reslove, reject) => {
      setTimeout(() => {
      reslove();
    }, 2000);
  });
}
async function fn1 (next) {
  console.log('satrt fn1');
  await next();
  console.log('end fn1');
}

async function fn2 (next) {
  console.log('start fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3 (next) {
  console.log('fn3');
}

const result = compoose(add, squre)(8, 12);

console.log('compoose', result);
