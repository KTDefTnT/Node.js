function EventEmitter () {
  // {
  //   "event1": [f1,f2,f3]，
  //   "event2": [f4,f5]，
  // }
  this.listeners = {};
  // 而maxListener 是设置的某个事件能够添加的监听器的最大数量
  this.maxListener = 10;
}
/**
 * 	on(event, listener)为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
 * 
 * 判断该事件的监听器数量是否已超限，超限则报警告
 * 判断该事件监听器数组是否初始化，若未初始化，则将listeners[event]初始化为数组，并加入监听器cb
 * 若监听器数组已经被初始化，则判断数组中是否已存在cb,不存在则添加，已存在则不做操作。
 *  指定addListener等于on方法
 */
EventEmitter.prototype.on = function(event, callback) {
  var listeners = this.listeners;
  if (listeners[event] && listeners[event].length > this.maxListener) {
    throw console.error('监听器的最大数量是%d,您已超出限制', this.maxListener);
  }
  // 判断当前监听方法中 是否已有处理函数
  if (listeners[event] instanceof Array) {
    // 判断是否已存在当前监听方法
    if (!listeners[event].includes(callback)) {
      listeners[event].push(callback);
    }
  } else {
    // 初始化当前监听函数
    listeners[event] = [].concat(callback);
  }
}

/**
 * addListener(event, listener)为指定事件添加一个监听器到监听器数组的尾部。
 */
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

/**
 * 	emit(event, [arg1], [arg2], [...]) 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。  触发某个方法名的执行
 * 通过Array.prototype.slice.call(arguments)取出方法的参数列表args，（因为考虑简单性和兼容性所以采用ES5的冗长编码方式）
 * 调用args.shift踢掉数组第一个参数即event，留下来的这些是要传给监听器的
 * 遍历监听器,通过apply方法把上面得到的args参数传进去
 */
EventEmitter.prototype.emit = function (event) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();
  this.listeners[event].forEach(callback => {
    console.log('args', args);
    // 执行所有当前时间的监听函数
    callback.apply(null, args);
  });
}

/**
 * 	removeListener(event, listener)移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器; 它接受两个参数，第一个是事件名称，第二个是回调函数名称。
 * 通过indexOf确定监听器回调在数组listeners[event]中的位置  通过splice(i,1)删除该listener方法
 */
EventEmitter.prototype.removeListener = function (event, listener) {
  // 判断当前是否存在当前监听器
  var listeners = this.listeners;
  var eventList = listeners[event] || [];
  var index = eventList.indexOf(listener);
  if (index > -1) {
    eventList.splice(index, 1);
  }
}

/**
 * 	once(event, listener) 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
 */
EventEmitter.prototype.once = function (event, listener) {
  function fn () {
    var args = Array.prototype.slice.call(arguments);
    listener.apply(null, args); // ????
    self.removeListener(event, fn);
  }
  this.on(event, fn);
}

/**
 * removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
 */
EventEmitter.prototype.removeAllListener = function (event) {
  if (event) {
    this.listeners[event] = [];
  } else {
    this.listeners = []
  }
}

/**
 *  setMaxListeners 函数用于提高监听器的默认限制的数量。 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。
 */
EventEmitter.prototype.setMaxListeners = function (num) {
  this.maxListener = num;
}

/**
 * 返回指定事件的监听器数组。
 */
EventEmitter.prototype.listeners = function (event) {
  return this.listeners[event];
}

// modexports = EventEmitter;
