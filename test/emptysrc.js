// modules
const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked      = require('passmarked');

// handle the settings
describe('emptysrc', function() {

  // handle the error output
  it('Should not break any of the empty src rules', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/emptysrc.good.html').toString();

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'

    }, null, content.toString())

    // run the rules
    require('../lib/rules/emptysrc')(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) { return item.key == 'emptysrc'; });

      // fail if not found
      if(rule)
        assert.fail('Was not expecting a error')

      // done
      done()

    });

  });

  // handle the error output
  it('Should have the empty src rule present', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/emptysrc.bad.html').toString();

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'
      
    }, null, content.toString())

    // run the rules
    require('../lib/rules/emptysrc')(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(rules, function(item) { return item.key == 'emptysrc'; })

      // fail if not found
      if(!rule)
        assert.fail('Was expecting a error');

      // done
      done()

    });

  });
  
});
