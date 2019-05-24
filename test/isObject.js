const Underscore = require('../src/underscorejs');
const expect = require('chai').expect;

describe('测试isObject方法', function () {
  it('判断传入的参数是否是对象并返回执行结果：true / false', done => {
    const obj = {a: 1};
    const underscore = new Underscore();
    expect(underscore.isObject(obj)).to.be.true;
    done();
  })
});

describe('测试isArrayLike方法', function () {
  it('判断传入的对象是否是数组或类数组', function () {
    const arrs = [1,2,3,4,5];
    const t1 = {length: 0};
    const t2 = {'a': 1, 'b': '2', length: 2};
    const t3 = { 0: 0, 1: 1, 2: 2, length: 3};
    const underscore = new Underscore();
    // expect(underscore.isArrayLike(arrs)).to.be.true; 
    // expect(underscore.isArrayLike(t1)).to.be.true;
    expect(underscore.isArrayLike(t2)).to.be.true;
    // expect(underscore.isArrayLike(t3)).to.be.true;
  })
});