// 类装饰器 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
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