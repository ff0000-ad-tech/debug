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

  context('enable namespace arguments ', function () {
    var logDefault,
      logModule1,
      logModule2;

    beforeEach(function () {
      logDefault = debug('test');
      logModule1 = debug('test:module1');
      logModule2 = debug('test:module2');
      debug.reset();
    });
    afterEach(function() {
      console.log('\t - includes:', debug.includes)
      console.log('\t - excludes:', debug.excludes)
    });

    // TODO, also test the instance.enabled values are expected

    it('can accept no arguments', function() {
      expect(debug.enable()).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/.*?/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be boolean true', function() {
      expect(debug.enable(true)).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/.*?/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be boolean false', function() {
      expect(debug.enable(false)).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/.*?/));
    });
    it('can be a RegExp', function() {
      expect(debug.enable(new RegExp('module1'))).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/module1/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be a string', function() {
      expect(debug.enable('test:module1')).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/test:module1/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be a string regex', function() {
      expect(debug.enable('/test:.*/')).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/test:.*/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be a string with wildcards "*"', function() {
      expect(debug.enable('test:*')).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/test:.*?/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be a string with exclusion character "-"', function() {
      expect(debug.enable('-test:module1')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
    });
    it('can be a comma/space separated string', function() {
      expect(debug.enable('test, test:module1')).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/test/));
      expect(String(debug.includes[1])).to.equal(String(/test:module1/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be a comma/space separated string with wildcards or exclusions', function() {
      expect(debug.enable('test, test:*, -test:module1')).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/test/));
      expect(String(debug.includes[1])).to.equal(String(/test:.*?/));
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
    });
    it('can be a list of mixed types', function() {
      expect(debug.enable(['module1', new RegExp('module2')])).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/module1/));
      expect(String(debug.includes[1])).to.equal(String(/module2/));
      expect(debug.excludes.length).to.equal(0);
    });
  });

  
  context('disable namespace arguments ', function () {
    var logDefault,
      logModule1,
      logModule2;

    beforeEach(function () {
      logDefault = debug('test');
      logModule1 = debug('test:module1');
      logModule2 = debug('test:module2');
      debug.reset();
    });
    afterEach(function() {
      console.log('\t - includes:', debug.includes)
      console.log('\t - excludes:', debug.excludes)
    })

    it('can accept no arguments', function() {
      expect(debug.disable()).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/.*?/));
    });
    it('can be boolean true', function() {
      expect(debug.disable(true)).to.not.throw;
      expect(String(debug.includes[0])).to.equal(String(/.*?/));
      expect(debug.excludes.length).to.equal(0);
    });
    it('can be boolean false', function() {
      expect(debug.disable(false)).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/.*?/));
    });
    it('can be a RegExp', function() {
      expect(debug.disable(new RegExp('module1'))).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/module1/));
    });
    it('can be a string', function() {
      expect(debug.disable('test:module1')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
    });
    it('can be a string regex', function() {
      expect(debug.disable('/test:.*/')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:.*/));
    });
    it('can be a string with wildcards "*"', function() {
      expect(debug.disable('test:*')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:.*?/));
    });
    it('can be a string with exclusion character "-"', function() {
      expect(debug.disable('-test:module1')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
    });
    it('can be a comma/space separated string', function() {
      expect(debug.disable('test, test:module1')).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test/));
      expect(String(debug.excludes[1])).to.equal(String(/test:module1/));
    });
    it('can be a comma/space separated string with wildcards or exclusions', function() {
      expect(debug.disable('test, test:*, -test:module1')).to.not.throw;
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
      expect(String(debug.excludes[1])).to.equal(String(/test/));
      expect(String(debug.excludes[2])).to.equal(String(/test:.*?/));
    });
    it('can be a list of mixed types', function() {
      expect(debug.disable(['module1', new RegExp('module2')])).to.not.throw;
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/module1/));
      expect(String(debug.excludes[1])).to.equal(String(/module2/));
    });

    it('can exclude an included namespace', function() {
      debug.enable('test:module1');
      debug.disable('test:module1');
      expect(debug.includes.length).to.equal(0);
      expect(String(debug.excludes[0])).to.equal(String(/test:module1/));
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
