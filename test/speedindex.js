// modules
const assert        = require('assert');
const _             = require('underscore');
const path          = require('path');
const passmarked    = require('passmarked');
const fs            = require('fs');
const testFunc      = require('../lib/rules/speedindex');

// checks warnings that we check for
describe('speedindex', function() {

  // handle the error output
  it('Should just run if the speedindex was undefined', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(rule) assert.fail('Should not return a rule');

      // done
      done();

    });

  });

  // handle the error output
  it('Should just run if the speedindex was null', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com',
        speedindex: null

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(rule) assert.fail('Should not return a rule');

      // done
      done();

    });

  });

  // handle the error output
  it('Should just run if the speedindex was undefined', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(rule) assert.fail('Should not return a rule');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if the speedindex is lower than the average of 5408', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com',
        speedindex: 4000

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(rule) assert.fail('Should not return a rule');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the speedindex is precisely than the average of 5408', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com',
        speedindex: 5408

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(!rule) assert.fail('Should return a rule');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the speedindex is higher than the average of 5408', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com',
        speedindex: 6000

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'speedindex'; });

      // check for a error
      if(!rule) assert.fail('Should return a rule');

      // done
      done();

    });

  });

});
