// 类装饰器
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
  }
  sayHi() {
    return "Hello, " + this.hello;
  }
}