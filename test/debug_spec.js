/* global describe, it, context, beforeEach */
'use strict';

var chai
  , expect
  , debug
  , sinon
  , sinonChai;

if (typeof module !== 'undefined') {
  chai = require('chai');
  expect = chai.expect;

  debug = require('../src/index');
  sinon = require('sinon');
  sinonChai = require("sinon-chai");
  chai.use(sinonChai);
}


describe('debug', function () {
  var log = debug('test');

  log.log = sinon.stub();

  it('passes a basic sanity check', function () {
    expect(log('hello world')).to.not.throw;
  });

  context('enable/disable namespace arguments ', function () {
    var logDefault,
      logModule1,
      logModule2;

    beforeEach(function () {
      logDefault = debug('test');
      logModule1 = debug('test:module1');
      logModule2 = debug('test:module2');
    });

    it('can be excluded', function() {
      expect(debug.enable()).to.not.throw;
      expect(debug.disable()).to.not.throw;
    });
    it('can be boolean true', function() {
      expect(debug.enable(true)).to.not.throw;
      expect(debug.disable(true)).to.not.throw;
    });
    it('can be boolean false', function() {
      expect(debug.enable(false)).to.not.throw;
      expect(debug.disable(false)).to.not.throw;
    });
    it('can be a RegExp', function() {
      expect(debug.enable(new RegExp('module1'))).to.not.throw;
      expect(debug.disable(new RegExp('module1'))).to.not.throw;
    });
    it('can be a string', function() {
      expect(debug.enable('test:module1')).to.not.throw;
      expect(debug.disable('test:module1')).to.not.throw;
    });
    it('can be a string regex', function() {
      expect(debug.enable('/test:.*/')).to.not.throw;
      expect(debug.disable('/test:.*/')).to.not.throw;
    });
    it('can be a string with wildcards "*"', function() {
      expect(debug.enable('test:*')).to.not.throw;
      expect(debug.disable('test:*')).to.not.throw;
    });
    it('can be a string with exclusion character "-"', function() {
      expect(debug.enable('-test:module1')).to.not.throw;
      expect(debug.disable('-test:module1')).to.not.throw;
    });
    it('can be a comma/space separated string', function() {
      expect(debug.enable('test, test:module1')).to.not.throw;
      expect(debug.disable('test, test:module1')).to.not.throw;
    });
    it('can be a comma/space separated string with wildcards or exclusions', function() {
      expect(debug.enable('test, test:*, -test.module1')).to.not.throw;
      expect(debug.disable('test, test:*, -test.module1')).to.not.throw;
    });
    it('can be a list of mixed types', function() {
      expect(debug.enable(['module1', new RegExp('module2')])).to.not.throw;
      expect(debug.disable(['module1', new RegExp('module2')])).to.not.throw;
    });
  });

  // context('with log function', function () {

  //   beforeEach(function () {
  //     debug.enable('test');
  //     log = debug('test');
  //   });

  //   it('uses it', function () {
  //     log.log = sinon.stub();
  //     log('using custom log function');

  //     expect(log.log).to.have.been.calledOnce;
  //   });
  // });

  // describe('custom functions', function () {
  //   var log;

  //   beforeEach(function () {
  //     debug.enable('test');
  //     log = debug('test');
  //   });

  //   context('with log function', function () {
  //     it('uses it', function () {
  //       log.log = sinon.spy();
  //       log('using custom log function');

  //       expect(log.log).to.have.been.calledOnce;
  //     });
  //   });
  // });

});
