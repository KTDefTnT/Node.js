class EventEmitter {
  constructor () {
    this.listeners = {};
    this.maxListener = 10; // 而maxListener 是设置的某个事件能够添加的监听器的最大数量
  }

  /**
   * 	on(event, listener)为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
   * 
   * 判断该事件的监听器数量是否已超限，超限则报警告
   * 判断该事件监听器数组是否初始化，若未初始化，则将listeners[event]初始化为数组，并加入监听器cb
   * 若监听器数组已经被初始化，则判断数组中是否已存在cb,不存在则添加，已存在则不做操作。
   *  指定addListener等于on方法
   */
  on(event, callback) {
    var listeners = this.listeners;
    // 判断当前监听器数量是否已到达最大数量
    if (listeners[event] && listeners[event].length > this.maxListener) {
      throw(`当前监听器最大监听数量为${this.maxListener}个，您已超出限制`);
    }

    // 判断当前监听器中是否已存在当前监听事件
    if (listeners[event] instanceof Array) {
      // 如果当前监听器中已存在监听方法  则不再加入
      if (!listeners[event].includes(callback)) {
        listeners[event].push(callback);
      }
    } else {
      listeners[event] = [].concat(callback);
    }
  }

  /**
   * addListener(event, listener)为指定事件添加一个监听器到监听器数组的尾部。
   */
  addListener = this.on;
  /**
   * 	emit(event, [arg1], [arg2], [...]) 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。  触发某个方法名的执行
   * 通过Array.prototype.slice.call(arguments)取出方法的参数列表args，（因为考虑简单性和兼容性所以采用ES5的冗长编码方式）
   * 调用args.shift踢掉数组第一个参数即event，留下来的这些是要传给监听器的
   * 遍历监听器,通过apply方法把上面得到的args参数传进去
   */
  emit () {
    // 第一个参数为event，后续参数为 callback的入参
    const [ event, ...args ] = Array.prototype.slice.call(arguments);
    // 触发on对应事件的所有监听方法
    console.log('emit', event, this.listeners[event]);
    this.listeners[event].forEach(callback => {
      callback.call(null, args);
    });
  }
  /**
   * 	removeListener(event, listener)移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器; 它接受两个参数，第一个是事件名称，第二个是回调函数名称。
   * 通过indexOf确定监听器回调在数组listeners[event]中的位置  通过splice(i,1)删除该listener方法
   */
  removeListener (event, listener) {
    // 判断当前是否存在event事件的监听
    if (!this.listeners[event]) {
      throw(`当前不存在监听事件${event}, 请检查`);
    }
    console.log(event, listener, this.listeners[event].includes(listener));
    // if (!this.listeners[event].includes(listener)) {
    //   throw(`当前监听事件${event}中不存在${listener}, 请检查`);
    // }
    // 找出当前事件所在的序号 永远都不可能成立， 使用listens[event] = listener进行删除
    const index = this.listeners[event].indexOf(listener);
    console.log(index);
    this.listeners[event].splice(index, 1);
  }
  /**
   * 	once(event, listener) 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
   */
  once (event, listener) {
    // fn的this指向问题
    const self = this;
    // 不能直接执行 on 之后立马移除， 必须在on函数的callback中进行移除，等待emit的触发后再执行删除操作
    function fn() {
      // 执行当前callback函数
      listener.apply(null, Array.prototype.slice.call(arguments));
      console.log('listener', listener);
      self.removeListener(event, listener);
    }
    this.on(event, fn);
  }
  /**
   * removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
   */
  removeAllListeners (events) {
    if (events) {
      if (typeof events === 'string') {
        this.listeners[events] = [];
      } else {
        events.forEach(event => {
          this.listeners[event] = [];
        })
      }
    } else {
      this.listeners = [];
    }
  }
  /**
   *  setMaxListeners 函数用于提高监听器的默认限制的数量。 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。
   */
  setMaxListeners(num) {
    if (!Number.isInteger(num)) {
      throw('请您输入数字！');
    }
    this.maxListener = num;
  }

  /**
   * 返回指定事件的监听器数组。
   */
  listeners (event) {
    return this.listeners[event];
  }
}