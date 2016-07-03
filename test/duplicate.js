// modules
const assert        = require('assert');
const _             = require('underscore');
const path          = require('path');
const passmarked        = require('passmarked');
const fs            = require('fs');
const testFunc      = require('../lib/rules/duplicate');

// checks warnings that we check for
describe('duplicate', function() {

  // handle the error output
  it('Should just run if page content was null', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // done
      done();

    });

  });

  // handle the error output
  it('Should just run if page content was blank', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if HAR is blank', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // check the item
      if(rules.length > 0)
        assert.fail('Did not expect any rules coming back');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if items do not have the same content', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, require('../samples/duplicate.ok.json'), '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) { return item.key == 'duplicate' });

      // should have a error
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if items do have the same content', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, require('../samples/duplicate.bad.json'), '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) { return item.key == 'duplicate' });

      // should have a error
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done();

    });

  });

});
