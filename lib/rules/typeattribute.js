// load in the required modules
const cheerio = require('cheerio');
const url     = require('url');
const async   = require('async');
const S       = require('string');

// expose the items
module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData();

  // local var
  var last_current_line = -1;

  // get the content
  payload.getResponse(function(err, response) {

    // check for errors
    if(err) {

      // output the error
      payload.error('inline', 'Something went wrong while retrieving the page content', err);

      // done
      return fn(err);

    }

    // the content to use
    var content = null;

    // get the content
    if(response && 
        response.content) {

      // set the content
      content = response.content.text || response.content.body || '';

    }

    // sanity check for content
    if(S(content || '').isEmpty() === true) {

      // debugging
      payload.debug('inline', 'Skipping as content was empty');

      // finish the callback
      return fn(null);

    }

    // did we find content ?
    if(S(content || '').isEmpty() === true) return fn(null);

    // load up cheerio
    var $ = cheerio.load(content);

    // parse the lines
    var lines = content.split('\n');

    // loop all the matches
    $('style,script').each(function(index, item) {

      // loop it
      var type = $(item).attr('type') || '';

      // get the mime
      var mime = type.replace(/\s+/gi, '').split(',')[0];

      // should be defined
      if([

          'text/javascript', 'text/css'

        ].indexOf(mime) === -1) return;

      // get the lines to display
      var build = payload.getSnippetManager().build(lines, last_current_line, function(line) {

        return (line.toLowerCase().indexOf('<style') != -1 ||
                  line.toLowerCase().indexOf('<script') != -1) &&
                    line.toLowerCase().indexOf(mime) != -1;

      });

      // did we find this ?
      if(!build) return;

      // set the last found
      last_current_line = build.subject;

      // add to the rules
      payload.addRule({

          type:     'notice',
          key:      'type.attribute',
          message:  'Omit type attributes for style sheets and scripts'

        }, {

            code:         build,
            display:      'code',
            message:      'Block of Javascript/CSS configured with the type $',
            identifiers:  [ mime ]

          });

    });

    // done ... ?
    fn(null)

  });

};
