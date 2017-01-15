// required modules
const url               = require('url');
const S                 = require('string');
const cheerio           = require('cheerio');

module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData();

  // parse our payload url
  var uri = url.parse(data.url);

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
    var $ = cheerio.load(content || '');

    // parse the lines
    var lines = content.split('\n')

    // local line count
    var last_current_line = -1;

    // check for title tags
    $('head > script').each(function(i, elem) {

      // get the url
      var elementType       = ($(elem).attr('type') || 'text/javascript').toLowerCase();
      var scriptAsync       = $(elem).attr('async') || '';
      var scriptUrl         = $(elem).attr('src') || $(elem).attr('href') || '';

      // check the url
      if(S(scriptUrl).isEmpty() === false) return;
      if(scriptAsync == 'async') return;

      // if the type is defined and not javascript, skip ...
      if(S(elementType).isEmpty() === false && 
          S(scriptUrl).isEmpty() === true && 
            elementType.indexOf('text/javascript') == -1)
              return;

      // get the html
      var elementHTML = $.html(elem);

      // build out the occurrence we will be adding
      var occurrence = {

        url:      scriptUrl,
        display:  'url',
        message:  S( elementHTML ).truncate(100, ' ...').s

      }

      // build up code block
      var build = payload.getSnippetManager().build( lines, last_current_line, elementHTML )

      // check if we found a build
      if(build) {

        // add to list
        occurrence.display      = 'code';
        occurrence.code         = build;

        // set last line
        last_current_line       = build.subject;

      }

      // add the rule
      payload.addRule({

          type:     'warning',
          message:  'Defer loading/parsing of Javascript',
          key:      'defer'

        }, occurrence)

    });

    // output
    fn(null);

  });

};
