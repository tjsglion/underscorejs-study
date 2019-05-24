/**
 * @description Underscore 类
 * @class Underscore
 */
class Underscore {
  /**
   * @description 构造函数, 返回 Underscore实例
   * @memberof Underscore
   * @example const _ = new Underscore()
   */
  constructor () {
    /** @description 获取实例属性方法别名 */
    this._hasOwnProperty = Object.hasOwnProperty;
    /** @description 获取实例属性 */
    this._keys = Object.keys;
  }

  /**
   *
   * @description 元素非空判断
   * @param {*} obj
   * @returns
   * @memberof Underscore
   */
  isNull (obj) {
    return [undefined, null, ''].indexOf(obj) > -1;
  }
  /**
   * @description 判断传入的参数是否是对象
   * @param {Object | Function} obj - 对象或函数
   * @returns Boolean: true || false
   * @memberof Underscore
   */
  isObject (obj) {
    const type = typeof obj;
    return Object.is(type, 'function') || Object.is(type, 'object') && !!obj;
  }

  /**
   *
   * @description 验证传入的对象是否是函数
   * @param {*} obj
   * @returns
   * @memberof Underscore
   */
  isFunction (obj) {
    return typeof obj === 'function' || false;
  }
  /**
   *
   * @description 获取目标对象中是否包含指定的key
   * @param {*} object
   * @param {*} key
   * @memberof Underscore
   */
  hasKey (object, key) {
    return object && this.hasOwnProperty.call(object, key);
  }
  /**
   * @description 获取传入的对象的实例属性，不包括继承属性
   * @param {Object} object
   * @memberof Underscore
   */
  keys (object) {
    if (this._keys) return this._keys(object);
    const fields = [];
    for (let key in object) {
      if (this.hasKey(object, key)) fields.push(key);
    }
    return fields;
  }
  
  /**
   * @description 获取对象中指定key的值
   * @param {*} key
   * @returns
   * @memberof Underscore
   */
  property (key) {
    return function (obj) {
      return obj[key];
    }
  }
  /**
   * @description 将传入的对象转换成 [key, value] 对列表
   * @param {*} obj
   * @returns
   * @memberof Underscore
   */
  pairs(obj) {
    // 获取传入对象的属性
    const _keys = this.keys(obj);
    const len = _keys.length;
    const pairs = Array(len);
    for (let i = 0; i < len; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }
  identity (value) {
    return value;
  }

  /**
   *
   * 匹配两个对象的键及对应的值是否相同
   * @param {*} attrs
   * @returns
   * @memberof Underscore
   */
  matches (attrs) {
    const pairs = this.pairs(attrs);
    const len = pairs.length;
    const root = this;
    return function (obj) {
      if (root.isNull(obj)) return !len;
      obj = new Object(obj);
      for (var i = 0; i < len; i++) {
        const pair = pairs[i], key = pair[0];
        if (!(key in obj) || (pair[1] !== obj[key])) return false;
      }
      return true;
    }
  }
  /**
   *
   * @description 获取传入的对象的数据类型
   * @param {*} obj
   * @memberof Underscore
   */
  toType (obj) {
    const toString = Object.prototype.toString;
    const maps = {
      '[object Boolean]'  : 'boolean',
      '[object Number]'   : 'number',
      '[object String]'   : 'string',
      '[object Function]' : 'function',
      '[object Array]'    : 'array',
      '[object Date]'     : 'date',
      '[object RegExp]'   : 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]'     : 'null',
      '[object Object]'   : 'object'
    }
    return maps[toString.call(obj)];
  }

  /**
   *
   * @description 判断obj对象是否是类数组(定义: 通过索引访问元素 并且拥有 length 属性)
   * @param {*} obj
   * @returns
   * @memberof Underscore
   */
  isArrayLike (obj) {
    const length = !!obj && 'length' in obj && obj.length;
    const type = this.toType(obj);
    return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
  }

  /**
   *
   * @description 内部函数， 传入一个函数并对该函数进行处理再返回传入的这个函数(高阶函数)
   * @param {*} func
   * @param {*} context 执行上下文
   * @param {*} argsCount 传入的参数个数, 默认3
   * @returns 返回传入的函数
   * @memberof Underscore
   */
  createCallback (func, context, argsCount) {
    if (!context) return func;
    switch (!argsCount ? 3 : argsCount) {
      case 1: return function (value) {
        return func.call(context, value);
      }
      case 2: return function (value, arrs) {
        return func.call(context, value, arrs);
      }
      case 3: return function (value, i, arrs) {
        return func.call(context, value, i, arrs);
      }
    }
    return function () {
      return func.apply(context, arguments);
    }
  }

  iteratee (value, context, argsCount) {
    if (this.isNull(value)) return this.identity;
    if (this.isFunction(value)) return createCallback(value, context, argsCount);
    if (this.isObject(value)) return this.matches(value);
    return this.property(value);
  }
  /**
   *
   * @description 循环数组中的每一项
   * @param {Array} arrs - 要循环的数据或者类数组
   * @param {function} iteratee - 回调函数
   * @param {*} context - 执行上下文
   * @memberof Underscore
   */
  each (obj, iteratee, context) {
    if (this.isNull(obj)) return obj;

    iteratee = this.createCallback(iteratee, context);
    if (this.isArrayLike(obj)) { // [{}, {}] or {0: {}, 1: {}, length: 2}
      const length = obj.length;
      for (let i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      const _keys = this.keys(obj);
      for (let i = 0; i < _keys.length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  /**
   *
   * @description 返回数组中每个元素的处理结果
   * @param {*} obj
   * @param {*} iteratee
   * @param {*} context
   * @returns
   * @memberof Underscore
   */
  map (obj, iteratee, context) {
    if (this.isNull(obj)) return [];
    console.log('context: =>>>>>>>>>>>', context);
    iteratee = this.createCallback(iteratee, context);
    let keys = obj.length !== +obj.length && this.keys(obj),
      len = (keys || obj).length,
      results = Array(len),
      currentKey;
    for (let i = 0; i < len; i++) {
      currentKey = keys ? keys[i] : i;
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }
}

module.exports = Underscore;
