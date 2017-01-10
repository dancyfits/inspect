// load modules
const _             = require('underscore');
const url           = require('url');
const zlib          = require('zlib');
const async         = require('async');
const request       = require('request');
const S             = require('string');

/**
* Content type we should check
**/
var allowedContentTypes = [ 

  'application/javascript', 
  'text/javascript',
  'text/css',
  'image/png', 
  'image/jpeg', 
  'image/jpg', 
  'image/gif' 

];

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData()

  // get the page content
  payload.getHAR(function(err, har) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the HAR', err);

      // done
      return fn(null);

    }

    // HAR should not be empty
    if(!har) return fn(null);
    if(!har.log) return fn(null);
    if(!har.log.entries) return fn(null);

    // parse the url
    var uri = url.parse(data.url)

    // loop the entries 
    async.eachLimit(har.log.entries || [], 10, function(entry, cb) {

      // get the content type
      var contentType = _.find(entry.response.headers || [], function(item_entry) {

        // returns the item
        return item_entry.name.toLowerCase() == 'content-type'

      });

      // check content type
      if(!contentType) return cb(null);

      // right check if this one of our allowed types
      if(allowedContentTypes.indexOf(contentType.value.toLowerCase()) == -1)
        return cb(null);

      // ok so now we check if the url that was contained a query string
      var entryUri = url.parse( entry.request.url );

      // sanity check
      if(!entryUri) 
        return cb(null);

      // handle the search
      if(S(entryUri.search || '').chompLeft('?').isEmpty() === true) 
        return cb(null);

      // according to if domain matches
      if(entryUri.hostname.indexOf(uri.hostname) === -1) 
        return cb(null);

      // add the rule
      payload.addRule({

        message: 'Remove query strings from static resources',
        key: 'querystring',
        type: 'warning'

      }, {

        message: 'Remove the querystring from $ to ensure caching even by proxy servers',
        identifiers: [ entry.request.url ],
        url: entry.request.url,
        type: 'url'

      });

      // done
      cb(null);

    }, function() {

      // done
      fn(null);

    });

  });

};
