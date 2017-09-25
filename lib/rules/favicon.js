// load modules
const _           = require('underscore');
const S           = require('string');
const async       = require('async');
const url         = require('url');
const request     = require('request');
const cheerio     = require ("cheerio");

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData();

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // low out the error
      payload.error('favicon', 'Got a error trying to get the content', err);

      // done
      return setImmediate(fn, null);

    }

    // sanity check for content
    if(S(content || '').isEmpty() === true) return fn(null);

    // load up cheerio
    var $ = cheerio.load(content || '');

    // parse the lines
    var lines = content.split('\n')

    // the defined hrefs
    var hrefs = [];

    // local line count
    var last_current_line = -1;

    // check for title tags
    $('link').each(function(i, elem) {

      // get the url
      var rel         = $(elem).attr('rel') || '';
      var href        = $(elem).attr('href') || '';

      // get the sections
      var sections    = S(rel || '').trim().s.toLowerCase().split(' ');

      // check if icon
      if(sections.indexOf('icon') === -1) return;

      // check the url
      if(S(href).isEmpty() === true) return;

      if(href.toLowerCase().indexOf('//') === 0 || 
                  href.toLowerCase().indexOf('http://') === 0 || 
                    href.toLowerCase().indexOf('https://') === 0) {

        // add to the list
        hrefs.push(data.url);

      } else {

        // go get the robots file
        var uri = url.parse(data.url);

        // update path
        uri.search = '';
        uri.pathname = href;

        // add to the list
        hrefs.push(url.format(uri));

      }

    });

    // check if defined 
    if(hrefs.length == 0) {

      // add the rule
      // add in the favicon item
      payload.addRule({

        message:  'Favicon not defined',
        key:      'favicon.missing',
        type:     'warning'

      })

      // done
      return fn(null);

    }

    // done
    async.each(hrefs || [], function(link, cb) {

      // check if more than 1 ...
      if(hrefs.length > 1) {

        // add in the favicon item
        payload.addRule({

          message:      'Mutiple Favicons defined',
          key:          'favicon.multiple',
          type:         'error'

        }, {

          message:      '$',
          identifiers:  [ link ],
          display:      'url',
          url:          link

        })

      }

      // request 
      payload.doRequest({

        url:      link,
        options:  {

          encoding: null

        }

      }, function(err, response, body) {

        // sanity checks
        if(err)       return setImmediate(fn, null);
        if(!response) return setImmediate(fn, null);

        // get the status code
        var statusCode = response.statusCode || 500;

        // was this a success ?
        if(statusCode == 200) {

          // only if we found it
          if(response.headers['content-length']) {

            // parse the item
            var parsedLength = parseInt('' + response.headers['content-length'], 10);

            // check it
            if(parsedLength !== NaN && 
                parsedLength !== null && 
                  parsedLength !== undefined) {

              // check if we can use it
              if(parsedLength > 1024 * 200) {

                // add in the favicon item
                /*payload.addRule({

                  message:  'Favicon should be small and cacheable',
                  key:      'favicon.size',
                  type:     'warning'

                }, {

                  message:      'The favicon at $ was $',
                  identifiers:  [

                    faviconPath,
                    (Math.round((parsedLength / 1024) * 100) / 100) + 'kb'

                  ]

                })*/

              }

            }

          }

        } else if(statusCode >= 300 && statusCode < 400) {

          // add in the favicon item
          payload.addRule({

            message:      'Favicon request redirected',
            key:          'favicon.redirect',
            type:         'warning'

          }, {

              message:      '$ was redirected',
              identifiers:  [ link ],
              display:      'url',
              url:          link

            });

        } else {

          // add in the favicon item
          payload.addRule({

            message:        'Favicon url was not found at the defined url',
            key:            'favicon.exists',
            type:           'warning'

          }, {

              message:      '$ returned status code of $',
              identifiers:  [ link, statusCode ],
              display:      'url',
              url:          link

            });

        }

        // send back all the rules
        setImmediate(cb, null)

      });

    }, function() {

      // send back all the rules
      setImmediate(fn, null)

    });

  });

};
