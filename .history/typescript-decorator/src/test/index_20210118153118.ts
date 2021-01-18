// 类装饰器 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
// 类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
function classDecorator <T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
export default class Greeter {
  property = "property";
  hello: string;
  constructor(message: string) {
    this.hello = message;
    console.log('default', this);
  }
  sayHi() {
    console.log( "Hello, " + this.hello);
  }
}