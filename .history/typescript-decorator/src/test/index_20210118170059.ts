// 类装饰器 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
// 类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
function classDecorator <T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

/**
 * 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。
 * 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。

  方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    成员的名字。
    成员的属性描述符。
  如果方法装饰器返回一个值，它会被用作方法的属性描述符。
    存在的问题，方法装饰器的this指向问题？，  执行一次装饰器后再执行本地
 */
 // 装饰器工厂
function functionDecorator() {
  // console.log('functionDecorator', this);
  // 装饰器函数
  return function (target: any, property: string, descriptor) {
    // console.log('function', target);
    // 对sayHi进行加工
    // let originFunc = target[property]; // 原始函数
    console.log('我是一个装饰器工厂，我在你方法之前进行一顿修饰咯');
    // target[property]();
    console.log('enddddddddddddddddd');
  }
}

/**
 * 访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义
 */
function configurableDecrator () {
  return function (target: any, property: string, descriptor) {
    console.log('访问器装饰器configurableDecrator', target, property);
  }
}
/**
 * 属性装饰器声明在一个属性声明之前（紧靠着属性声明)
  属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

    对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    成员的名字。
 */
 function propertyDecorator (value) {
   return function (target, property) {
    message = `${value}${target[property]}`;
    console.log('message', message);
    // return message;
   }
 }


@classDecorator
export default class Greeter {
  @propertyDecorator('Nickloas')
  property = "property";
  hello: string;
  constructor(message: string) {
    this.hello = message;
  }

  @functionDecorator()
  sayHi() {
    console.log( "Hello, " + this.hello);
  }

  @configurableDecrator()
  get getHello() {
    return this.hello;
  }

  get getProperty() {
    return this.property;
  }
}