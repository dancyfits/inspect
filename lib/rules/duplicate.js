// load modules
const _             = require('underscore');
const url           = require('url');
const zlib          = require('zlib');
const async         = require('async');
const request       = require('request');
const crypto        = require('crypto');

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // last indexed line
  var last_current_line   = -1;

  // get the data
  var data                = payload.getData();

  // hashes of the url content
  var hashes              = {};

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
    async.eachLimit(har.log.entries || [], 10, function(entry, cb) {

      // get the content type
      var contentType = _.find(entry.response.headers || [], function(item) {

        // returns the item
        return item.name.toLowerCase() == 'content-type';

      });

      // check content type
      if(!contentType) return cb(null);

      // get the cleaned content type
      var contentTypeValue = (contentType.value || '')
                                .replace(/\s+/gi, '')
                                  .toLowerCase()
                                    .split(',')[0] || '';

      // right check if this one of our allowed types
      if([

        'javascript', 
        'text/css'

      ].indexOf(contentTypeValue) == -1) return cb(null);

      // create the generator
      var shasum     = crypto.createHash('sha1');
      shasum.update('' + (entry.response.content.text || entry.response.content.body || '').toString());
      var hash       = shasum.digest('hex');

      // set the hash
      if(hashes[hash])
        hashes[hash].push(entry);
      else
        hashes[hash] = [ entry ];

      // done
      cb(null);

    }, function() {

      // get the keys
      var keys = _.keys(hashes);

      // loop the list
      for(var i = 0; i < keys.length; i++) {

        // get the key
        var key = keys[i];

        // check if we found the hashes for this key
        if(!hashes[key]) continue;

        // only if more than 1
        if(hashes[key].length > 1) {

          // loop the hashes
          for(var a = 0; a < hashes[key].length; a++) {

            // get the url
            var entryUrl = hashes[key][a].request.url;

            // add the rule
            payload.addRule({

              message:      'Remove duplicate Javascript and CSS',
              key:          'duplicate',
              type:         'warning'

            }, {

              message:      '$ contained duplicate content',
              idenfifiers:  [ entryUrl ]

            });

          }

        }

      }

      // done
      fn(null);

    });

  });

};
