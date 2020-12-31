// 洋葱圈模式 从前往后开始执行 将第一个函数的返回值作为后一个函数的入参

const { resolve } = require("path");

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
// const compoose = (...[first, ...others]) => (...args) => {
//   let result = first(...args);
//   others.map(fn => {
//     result = fn(result);
//   });
//   return result;
// }
// const result = compoose(add, squre)(8, 12);

// 中间件有异步操作
function delay() {
  return new Promise((reslove, reject) => {
      setTimeout(() => {
      reslove();
    }, 2000);
  });
}
async function fn1 (ctx, next) {
  console.log('satrt fn1');
  await next();
  console.log('end fn1');
}

async function fn2 (ctx, next) {
  console.log('start fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3 (ctx) {
  console.log('fn3');
}

// 中间件存在异步操作 compoose需要有promise函数去支持： 等上一个异步中间件操作完成之后再去执行下一个中间件
const compoose = middlewares => {
  // 首先执行第一个
  return function (ctx) {
    return dispatch(ctx, 0);
    // 需要遍历
    function dispatch (context, i) {
      let fn = middlewares[i];
      return Promise.resolve(
      fn(context, function next () {
          return dispatch(context, i + 1)
        })
      );
    }
  }
}

compoose([fn1, fn2, fn3])();

// console.log('compoose', result);
