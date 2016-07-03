// modules
const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked  = require('passmarked');
const testFunc    = require('../lib/rules/protocol');

// handle the settings
describe('protocol', function() {

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
  it('Should have the omit protocol rule present', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/protocol.bad.html').toString();

      // handle the payload
      var payload = passmarked.createPayload({

        url: 'http://example.com'
        
      }, null, content.toString())

      // run the rules
      testFunc(payload, function(err) {

        // get the rules
        var rules = payload.getRules();

        // check
        var rule = _.find(rules, function(item) { return item.key == 'protocol' });

        // should have a error
        if(!rule)
          assert.fail('Was expecting a error');

        // done
        done();

      });

  });

  // handle the error output
  it('Should not have the omit protocol rule present', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/protocol.good.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

        url: 'http://example.com'
        
    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) { return rule.key == 'protocol' });

      // should have a error
      if(rule)
        assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

});