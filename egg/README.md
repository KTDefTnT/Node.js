## egg中一切皆插件
## 实现的功能
- [x] 基于插件的[Swagger-doc](https://github.com/DG-Wangtao/egg-swagger-doc#readme)接⼝定义
  * @Controller {ControllerName}
  ```
    a.如果文件第一个注释块中存在标签@Controller，应用会扫描当前文件下的所有注释块，否则扫描将会跳过该文件。　　
    b.如果不标示ControllerName，程序会将当前文件的文件名作为ControllerName。
  ```
  * @Summary {Summary} 接口信息小标题
  * @Description {Description} 接口具体描述,字段功能等
  * @Router {Mothod} {Path}
  ```
    a.Mothod,请求的方法(post/get/put/delete等)，不区分大小写。
    b.Path,请求的路由。
  ```
  * @Request {Position} {Type} {Name} {Description}
  ```
    a.position.参数的位置,该值可以是body/path/query/header/formData.
    b.Type.参数类型，body之外位置目前只支持基础类型,integer/string/boolean/number，及基础类型构成的数组，body中则支持contract中定义的类型。如果position是formData还将支持 file 类型
    c.Name.参数名称.如果参数名称以*开头则表示必要，否则非必要。
    d.Description.参数描述
    c.如果你想给query或者path的参数设置example，你可以在Description前添加以'eg:'开头的参数，实例如下
    @Request query string contactId eg:200032234567 顾问ID
  ```
  * @Response {HttpStatus} {Type} 
  ```
    a.HttpStatus.Http状态码。
    b.Type.同Request中body位置的参数类型。
    c.Description.响应描述。
  ```
  * @Deprecated 接口未完成或不可使用
    > 其中type的自定义类型需要再  contract文件夹中进行声明，contract中可以直接使用其他定义好的数据类型; 对每一条数据的校验 format字段支持正则判断

- [x] 统一异常处理([异常处理](https://eggjs.org/zh-cn/core/error-handling.html))
  * 异常处理中间件(error_handler)
  * 框架自带的 onerror 插件支持自定义配置错误处理方法(在// config/config.default.js中配置 onerror)
```
// 框架通过 onerror 插件提供了统一的错误处理机制。对一个请求的所有处理方法
（Middleware、Controller、Service）中抛出的任何异常都会被它捕获，并自动根据请求想要获取的类型返回不同类型的错误
```
- [x] 基于扩展的helper响应统⼀处理
> 在extend扩展中进行扩展： `exports.success = ctx => ctx.body = '统一处理方式' `
- [x] Validate接⼝格式检查 [egg-validate](https://github.com/eggjs/egg-validate#readme) 使用`egg-swagger-doc-feat`配合`egg-validate` 
```
  /**
  * ctx.validate 为egg-validate插件挂载在ctx中的数据
  * ctx.rule.createResource 为egg-swagger-doc-feat自定义的contract数据格式，支持传入数据进行正则校验 format字段支持正则判断
  */
  ctx.validate(ctx.rule.createResource, ctx.request.body);
```
- [ ] 三层结构： controller、service、model(控制层、服务层、数据层)
- [ ] jwt统一鉴权
- [ ] 文件上传

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org