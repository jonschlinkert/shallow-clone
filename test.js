'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var clone = require('./');

describe('clone()', function() {
  it('should shallow clone an of primitives', function() {
    assert.deepEqual(clone(['alpha', 'beta', 'gamma']), ['alpha', 'beta', 'gamma']);
  });
  it('should shallow clone an array with varied elements', function() {
    var val = [0, 'a', {}, [{}], [function() {}], function() {}];
    assert.deepEqual(clone(val), val);
  });
  it('should return primitives', function() {
    assert.equal(clone(0), 0);
    assert.equal(clone('foo'), 'foo');
  });
  it('should shallow clone arrays', function() {
    assert.deepEqual(clone([1, 2, 3]), [1, 2, 3]);
  });
  it('should shallow clone a regex', function() {
    assert.deepEqual(clone(/foo/g), /foo/g);
  });
  it('should shallow clone objects', function() {
    assert.deepEqual(clone({a: 1, b: 2, c: 3 }), {a: 1, b: 2, c: 3 });
  });
  it('should shallow clone an array of objects.', function() {
    var expected = [{ 'a': 0 }, { 'b': 1 }];
    var actual = clone(expected);

    assert.equal(actual !== expected, true);
    assert.deepEqual(actual, expected);
    assert.deepEqual(actual[0], expected[0]);
  });
});
