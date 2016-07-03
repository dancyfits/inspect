// load modules
const _             = require('underscore');
const S             = require('string');
const url           = require('url');
const zlib          = require('zlib');
const async         = require('async');
const cheerio       = require ("cheerio");

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // get the data
  var data      = payload.getData();

  // get the content
  payload.getPageContent(function(err, content) {

    // check for errors
    if(err) {

      // output the error
      payload.error('Something went wrong while retrieving the page content', err);

      // done
      return fn(err);

    }

    // sanity check for content
    if(S(content || '').isEmpty() === true) return fn(null);

    // get the lines of the code block
    var lines = content.split('\n');

    // load a context for cheerio
    var $ = cheerio.load(content);

    // check all the inline styles blocks
    $('img,a,link,script').each(function(index, elm) {

      // get the body
      var dataUrl   = $(this).attr('src') ||  
                        $(this).attr('href') || '';

      // sanity check
      if(S(dataUrl || '').isEmpty() === true) 
        return;

      // get the length of the block
      var len = Buffer.byteLength(dataUrl, 'utf8');

      // check if the length is defined
      if(len > 2 * 1024) {

        // get the length of code
        var blockLines  = body.split('\n');
        var maxLength   = 5;

        // get the current line
        var current     = lines.indexOf();

        // add the payload
        payload.addRule({

          message:      'Inline small ' + tag,
          key:          'inline.' + tagname,
          type:         'warning'

        }, {

          message:      'Inline ' + tagname + ' block was $',
          identifiers:  [ len + 'kb' ],
          code:         {

            start:    current,
            end:      current + blockLines.slice(0, 5).length,
            subject:  current,
            text:     blockLines.slice(0, 5)

          }

        })

      }

    });

    // done
    fn(null);

  });

};
