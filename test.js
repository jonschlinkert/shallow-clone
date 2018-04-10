'use strict';

require('mocha');
var assert = require('assert');
var clone = require('./');

describe('clone()', function() {
  describe('objects', function() {
    it('should shallow clone an array of primitives', function() {
      assert.deepEqual(clone(['alpha', 'beta', 'gamma']), ['alpha', 'beta', 'gamma']);
    });

    it('should shallow clone an array with varied elements', function() {
      var val = [0, 'a', {}, [{}], [function() {}], function() {}];
      assert.deepEqual(clone(val), val);
    });

    it('should clone Map', function() {
      var a = new Map([[1, 5]]);
      var b = clone(a);
      a.set(2, 4);
      assert.notDeepEqual(a, b);
    });

    it('should clone Set', function() {
      var a = new Set([2, 1, 3]);
      var b = clone(a);
      a.add(8);
      assert.notDeepEqual(a, b);
    });

    it('should shallow clone arrays', function() {
      assert(clone([1, 2, 3]) !== [1, 2, 3]);
      assert.deepEqual(clone([1, 2, 3]), [1, 2, 3]);
    });

    it('should shallow clone a regex', function() {
      assert(clone(/foo/g) !== /foo/g);
      assert.deepEqual(clone(/foo/g), /foo/g);
    });

    it('should shallow clone a date', function() {
      const date = new Date();
      assert(clone(date) !== date);
      assert.deepEqual(clone(date), date);
    });

    it('should shallow clone objects', function() {
      assert.deepEqual(clone({ a: 1, b: 2, c: 3 }), { a: 1, b: 2, c: 3 });
    });

    it('should shallow clone an array of objects.', function() {
      var expected = [{ a: 0 }, { b: 1 }];
      var actual = clone(expected);

      assert(actual !== expected);
      assert.deepEqual(actual, expected);
      assert.deepEqual(actual[0], expected[0]);
    });
  });

  describe('primitives', function() {
    it('should return primitives', function() {
      assert.equal(clone(0), 0);
      assert.equal(clone(1), 1);
      assert.equal(clone('foo'), 'foo');
    });

    it('should clone symbols', function() {
      const val = { prop: Symbol() };
      const cloned = clone(val);
      assert.notEqual(cloned, val);
      assert.equal(cloned.prop, val.prop);
    });
  });
});
