const expect = require('chai').expect;
const Underscore = require('../src/underscorejs');
const underscore = new Underscore();
const obj = {a: 'a', b: 'b'};
describe('测试目标对象上是否有指定的key', function () {
  it('hasKey', function () {
    console.log('==========>>>>>>>>>>>>>>', underscore.hasKey(obj, 'a'));
    expect(underscore.hasKey(obj, 'a')).to.be.true;
  });
});

describe('测试目标对象有所有的keys', function () {
  it('keys', function () {
    expect(underscore.keys(obj)).to.be.an('array').to.include.members(['a', 'b']);
  })
})

describe('测试pairs方法: 传入一个对象，返回[key, value]对列表', function () {
  it('pairs', function () {
    const obj = {
      'name': 'srbtj',
      'age': 18
    }
    console.log(underscore.pairs(obj));
    expect(underscore.pairs(obj)).to.be.an('array');
  });
})

describe('测试property方法: 传入一个key， 获取指定obj 中对应的key的值', function () {
  it('property', function () {
    const obj = {
      'name': 'srbtj',
      'age': 18
    };
    expect(underscore.property('age')(obj)).to.be.equal(18);
  });
});

describe('测试matches方法: 传入attrs， 判断key是否在obj中存在', function () {
  it('matches', function () {
    const value = {age: 18, name: 'srbtj'};
    const obj = {
      'name': 'srbtj',
      'age': 18
    };
    console.log(underscore.matches(value)(obj));
    expect(underscore.matches(value)(obj)).to.be.equal(true);
  });
});

describe('测试map方法: 传入数组或类数组， 返回处理的结果', function () {
  it('map', function () {
    const obj = {0: 1, 1: 2, 2: 3, length: 3};
    console.log(obj, 'map: ->: ' + underscore.map(obj, function (item, i, obj) { console.log(item, i, obj); return item * 2; }, []));
    expect(underscore.map(obj, (item) => item * 2)).to.be.an('array');
  });
});

