'use strict';

require('mocha');
const assert = require('assert').strict;
const clone = require('./');

describe('clone()', () => {
  describe('objects', () => {
    it('should shallow clone an array of primitives', () => {
      assert.deepEqual(clone(['alpha', 'beta', 'gamma']), ['alpha', 'beta', 'gamma']);
    });

    it('should shallow clone an array with varied elements', () => {
      const val = [0, 'a', {}, [{}], [function() {}], function() {}];
      assert.deepEqual(clone(val), val);
    });

    it('should clone Map', () => {
      const a = new Map([[1, 5]]);
      const b = clone(a);
      a.set(2, 4);
      assert.notDeepEqual(a, b);
    });

    it('should clone Set', () => {
      const a = new Set([2, 1, 3]);
      const b = clone(a);
      a.add(8);
      assert.notDeepEqual(a, b);
    });

    it('should shallow clone arrays', () => {
      assert(clone([1, 2, 3]) !== [1, 2, 3]);
      assert.deepEqual(clone([1, 2, 3]), [1, 2, 3]);
    });

    it('should shallow clone a regex with flags', () => {
      assert(clone(/foo/g) !== /foo/g);
      assert.deepEqual(clone(/foo/g), /foo/g);
    });

    it('should shallow clone a regex without any flags', () => {
      assert(clone(/foo/) !== /foo/);
      assert.deepEqual(clone(/foo/), /foo/);
    });

    it('should shallow clone a date', () => {
      const date = new Date();
      assert(clone(date) !== date);
      assert.deepEqual(clone(date), date);
    });

    it('should shallow clone objects', () => {
      assert.deepEqual(clone({ a: 1, b: 2, c: 3 }), { a: 1, b: 2, c: 3 });
    });

    it('should shallow clone an array of objects.', () => {
      const expected = [{ a: 0 }, { b: 1 }];
      const actual = clone(expected);

      assert(actual !== expected);
      assert.deepEqual(actual, expected);
      assert.deepEqual(actual[0], expected[0]);
    });
  });

  describe('primitives', () => {
    it('should return primitives', () => {
      assert.equal(clone(0), 0);
      assert.equal(clone(1), 1);
      assert.equal(clone('foo'), 'foo');
    });

    it('should clone symbols', () => {
      const val = { prop: Symbol() };
      const cloned = clone(val);
      assert.equal(typeof cloned.prop, 'symbol');
      assert.notEqual(cloned, val);
      assert.equal(cloned.prop, val.prop);
    });
  });
});
