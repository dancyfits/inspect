// required modules
const url               = require('url');
const S                 = require('string');
const cheerio           = require('cheerio');

module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData();

  // parse our payload url
  var uri = url.parse(data.url);

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the Page Content', err);

      // done
      return fn(null);

    }

    // did we find content ?
    if(S(content || '').isEmpty() === true) return cb(null);

    // load up cheerio
    var $ = cheerio.load(content || '');

    // parse the lines
    var lines = content.split('\n')

    // local line count
    var last_current_line = -1;

    // check for title tags
    $('img').each(function(i, elem) {

      // get the url
      var url_str = $(elem).attr('src') || $(elem).attr('href') || '';

      // check the url
      if(S(url_str).isEmpty() === false) return;

      // get the element html
      var elementHTML = $.html(elem);

      // build out the occurrence we will be adding
      var occurrence = {

        url: url_str,
        display: 'url',
        message: S( elementHTML ).truncate(100, ' ...').s

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

          type:     'error',
          message:  'Avoid empty src on image tags',
          key:      'emptysrc'

        }, occurrence)

    });

    // output
    fn(null);

  });

};
