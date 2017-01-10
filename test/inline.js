// modules
const assert        = require('assert');
const _             = require('underscore');
const path          = require('path');
const passmarked        = require('passmarked');
const fs            = require('fs');
const testFunc      = require('../lib/rules/inline');

// checks warnings that we check for
describe('inline', function() {

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

  /***
  * CSS CHECKS
  ***/

  // handle the error output
  it('Should return a error if the page content contains a style in the head that is too big', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.styles.head.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // check for a error
      if(!rule) assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the page content contains a style in the body that is too big', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.styles.body.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // check for a error
      if(!rule) assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return if inline style blocks are smaller than 24 kb', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.styles.ok.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // do not expect a error
      if(rule) assert.fail("Was not expecting a error");

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if no style tags are present', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.styles.missing.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // check for a error
      if(rules.length > 0) assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  /***
  * CSS CHECKS
  ***/

  /***
  * JAVASCRIPT CHECKS
  ***/

  // handle the error output
  it('Should return a error if the page content contains a script in the head that is too big', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.scripts.head.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // check for a error
      if(!rule) assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if the page content contains a script in the body that is too big', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.scripts.body.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // check for a error
      if(!rule) assert.fail('Was expecting a error');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return if inline script blocks are smaller than 2 kb', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.scripts.ok.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'inline'; });

      // do not expect a error
      if(rule) assert.fail("Was not expecting a error");

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if no script tags are present', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync(path.join(__dirname, '../samples/inline.scripts.missing.html')).toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // check for a error
      if(rules.length > 0) assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

  /***
  * JAVASCRIPT CHECKS
  ***/

});
