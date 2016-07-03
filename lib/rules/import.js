// load modules
const _             = require('underscore');
const url           = require('url');
const zlib          = require('zlib');
const async         = require('async');
const request       = require('request');

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // last indexed line
  var last_current_line = -1;

  // get the data
  var data = payload.getData();

  // get the page content
  payload.getHAR(function(err, har) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the HAR', err);

      // done
      return fn(null);

    }

    // check if we got it
    if(!har) return fn(null);
    if(!har.log) return fn(null);
    if(!har.log.entries) return fn(null);

    // parse the url
    var uri = url.parse(data.url);

    // loop the entries
    async.each(har.log.entries || [], function(entry, cb) {

      // get the content type
      var contentType = _.find(entry.response.headers || [], function(item) {

        // returns the item
        return item.name.toLowerCase() == 'content-type';

      });

      // check content type
      if(!contentType) return cb(null);

      // right check if this one of our allowed types
      if(['text/css'].indexOf(contentType.value.toLowerCase()) == -1)
        return cb(null);

      // ok so now we check if the url that was contained a query string
      var entryUri = url.parse( entry.request.url );

      // check if there is actually content ... ?
      if(!entry.response.content.body) return cb(null);

      // right see how big this is
      if(entry.response.content.body.toLowerCase().indexOf('@import') != -1) {

        // add the rule
        payload.addRule({

          message:  'Avoid CSS @import',
          key:      'import',
          type:     'warning'

        }, {

          message: 'Imports found in $',
          identifiers: [ entry.request.url ],
          url: entry.request.url,
          type: 'url'

        });

      }

      // done
      cb(null);

    }, function() {

      // done
      fn(null);

    });

  });

};
