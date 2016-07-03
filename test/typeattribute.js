// modules
const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked      = require('passmarked');
const testFunc    = require('../lib/rules/typeattribute');

// handle the settings
describe('typeattribute', function() {

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
  it('Should have the type attribute rule present, even if uppercased', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/typeattribute.bad.html');

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'
      
    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(
        rules, 
        function(item) { return item.key == 'type.attribute'; }
      );

      // check if we found it
      if(!rule)
        assert.fail('Type attributes should be shown for the sample')

      // done
      done();

    });

  });

  // handle the error output
  it('Should have the type attribute rule present', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/typeattribute.bad.html');

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'
      
    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(
        rules, 
        function(item) { return item.key == 'type.attribute'; }
      );

      // check if we found it
      if(!rule)
        assert.fail('Type attributes should be shown for the sample')

      // done
      done();

    });

  });
  
  // handle the error output
  it('Should not have the type attribute rule present', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/typeattribute.ok.html');

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'
        
    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(
        rules, 
        function(item) { return item.key == 'type.attribute' }
      );

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule');

      // done
      done();

    });

  });
  
  // handle the error output
  it('Should give a error on a page with no such tags', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/typeattribute.missing.html');

    // handle the payload
    payload = passmarked.createPayload({

      url: 'http://example.com'
        
    }, null, content.toString())

    // run the rules
    testFunc(payload, function(err) {

      // get the rules
      var rules = payload.getRules();

      // check
      var rule = _.find(
        rules, 
        function(item) { return item.key == 'type.attribute' }
      );

      // check if we found it
      if(rule)
        assert.fail('Was not expecting a rule');

      // done
      done();

    });

  });

});







