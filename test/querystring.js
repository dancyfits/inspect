// modules
const assert        = require('assert');
const _             = require('underscore');
const path          = require('path');
const passmarked        = require('passmarked');
const fs            = require('fs');
const testFunc      = require('../lib/rules/querystring');

// checks warnings that we check for
describe('querystring', function() {

  // handle the error output
  it('Should just run if HAR is not given', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // double check rules
      var rules = payload.getRules();

      // should not have any errors
      if(rules.length > 0) assert.fail('Was not expecting any errors');

      // done
      done();

    });

  });

  // handle the error output
  it('Should just run if page content was null', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // double check rules
      var rules = payload.getRules();

      // should not have any errors
      if(rules.length > 0) assert.fail('Was not expecting any errors');

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

      // double check rules
      var rules = payload.getRules();

      // should not have any errors
      if(rules.length > 0) assert.fail('Was not expecting any errors');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if no querystring is used', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, require('../samples/querystring.ok.json'), '<p>blank</p>');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'querystring'; });

      // check for a error
      if(rule) assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if no assets are found', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, require('../samples/querystring.missing.json'), '<p>blank</p>');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'querystring'; });

      // check for a error
      if(rule) assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if query string was used on static resource', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, require('../samples/querystring.bad.json'), '<p>blank</p>');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'querystring'; });

      // check for a error
      if(!rule) assert.fail('Was expecting a error');

      // done
      done();

    });

  });

});