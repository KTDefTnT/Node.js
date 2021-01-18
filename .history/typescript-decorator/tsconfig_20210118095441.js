{
  "compilerOptions": {
  "outDir": "./dist",
  "target": "es2017",
  "module": "commonjs",//组织代码方式
  "sourceMap": true,
  "moduleResolution": "node", // 模块解决策略
  "experimentalDecorators": true, // 开启装饰器定义
  "allowSyntheticDefaultImports": true, // 允许es6方式import
  "lib": ["es2015"],
  "typeRoots": ["./node_modules/@types"],
  },
  "include": ["src/**/*"]
  }