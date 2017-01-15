// modules
const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked      = require('passmarked');
const testFunc    = require('../lib/rules/defer');

// handle the settings
describe('defer', function() {

  // handle the error output
  it('Should just run if page content was null', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      },
      {

        log: {

          entries: [

            {

              request:  {},
              response: {

                status: 200,
                headers: [

                  {

                    name: 'content-type',
                    value:  'text/html'

                  }

                ],
                content: {

                  text: null

                }

              }

            }

          ]

        }

      }, null);

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

      },
      {

        log: {

          entries: [

            {

              request:  {},
              response: {

                status: 200,
                headers: [

                  {

                    name: 'content-type',
                    value:  'text/html'

                  }

                ],
                content: {

                  text: ''

                }

              }

            }

          ]

        }

      }, '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if scripts are correctly defered', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/defer.good.html').toString();

      // handle the payload
      var payload = passmarked.createPayload({

        url: 'http://example.com'
        
      },
      {

        log: {

          entries: [

            {

              request:  {},
              response: {

                status: 200,
                headers: [

                  {

                    name: 'content-type',
                    value:  'text/html'

                  }

                ],
                content: {

                  text: content.toString()

                }

              }

            }

          ]

        }

      }, content.toString())

      // run the rules
      testFunc(payload, function(err) {

        // get the rules
        var rules = payload.getRules();

        // check
        var rule = _.find(rules, function(item) { return item.key == 'defer' });

        // should have a error
        if(rule)
          assert.fail('Was not expecting a error');

        // done
        done();

      });

  });

  // handle the error output
  it('Should return a problem if a script is used in the head', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/defer.head.bad.html').toString();

      // handle the payload
      var payload = passmarked.createPayload({

        url: 'http://example.com'
        
      },
      {

        log: {

          entries: [

            {

              request:  {},
              response: {

                status: 200,
                headers: [

                  {

                    name: 'content-type',
                    value:  'text/html'

                  }

                ],
                content: {

                  text: content.toString()

                }

              }

            }

          ]

        }

      }, content.toString())

      // run the rules
      testFunc(payload, function(err) {

        // get the rules
        var rules = payload.getRules();

        // check
        var rule = _.find(rules, function(item) { return item.key == 'defer' });

        // should have a error
        if(!rule)
          assert.fail('Was expecting a error');

        // done
        done();

      });

  });

  // handle the error output
  it('Should not return a problem if a script is used in the head but "async" is defined', function(done) {

    // read in the html sample
    var content = fs.readFileSync('./samples/defer.head.good.html').toString();

      // handle the payload
      var payload = passmarked.createPayload({

        url: 'http://example.com'
        
      },
      {

        log: {

          entries: [

            {

              request:  {},
              response: {

                status: 200,
                headers: [

                  {

                    name: 'content-type',
                    value:  'text/html'

                  }

                ],
                content: {

                  text: content.toString()

                }

              }

            }

          ]

        }

      }, content.toString())

      // run the rules
      testFunc(payload, function(err) {

        // get the rules
        var rules = payload.getRules();

        // check
        var rule = _.find(rules, function(item) { return item.key == 'defer' });

        // should have a error
        if(rule)
          assert.fail('Was not expecting a error');

        // done
        done();

      });

  });

});







