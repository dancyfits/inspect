// modules
const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked      = require('passmarked');

// handle the settings
describe('order', function() {

  // handle the error output
  it('Should not return a error if CSS is already defined in head', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/order.good.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, null, content.toString())

    // run the rules
    require('../lib/rules/order')(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(rule) { return rule.key == 'order' });

      // fail if not found
      if(rule)
        assert.fail();

      // done
      done()

    });

  });

  // handle the error output
  it('Should retur a error if CSS is not specified in head', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/order.bad.html').toString();

    // handle the payload
    var payload = passmarked.createPayload({

      url: 'http://example.com'
      
    }, null, content.toString());

    // run the rules
    require('../lib/rules/order')(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(rule) { return rule.key == 'order' });

      // fail if not found
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done()

    });

  });

});