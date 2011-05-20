var assert = require('assert');

var log = require('../logger.js');

assert.equal((typeof log.weblog), "function");
assert.equal((typeof log.applog), "function");
assert.equal((typeof log.debug), "function");
assert.equal((typeof log.info), "function");
assert.equal((typeof log.warn), "function");

assert.equal(log.WARN, 2);