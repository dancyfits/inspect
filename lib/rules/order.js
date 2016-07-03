// load in the required modules
const cheerio = require('cheerio');
const url     = require('url');
const S       = require('string');
const async   = require('async');

// expose the items
module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData();

  // local var
  var last_current_line = -1;

  // get the page content
  payload.getPageContent(function(err, content) {

    // did we get a error ?
    if(err) {

      // debug
      payload.error('Got a error trying to get the page content', err);

      // done
      return fn(null);

    }

    // did we find content ?
    if(S(content || '').isEmpty() === true) 
      return fn(null);

    // load up cheerio
    var $ = cheerio.load(content);

    // parse the lines
    var lines = content.split('\n')

    // set the last line
    var last_current_line = -1;

    // loop the items
    $('link').each(function(index, item) {

      // so this is a link, if the type is blank we assume text/css
      var type    = ( $(item).attr('type') || 'text/css' ).toLowerCase();
      var href    = $(item).attr('href') || null;
      var rel     = $(item).attr('rel') || 'stylesheet';

      // sanity checks
      if(!href) return;
      if(type != 'text/css') return;
      if(S(href.toLowerCase()).endsWith('.css') === false) return;

      // right so check if this in the header,
      // if not this is a error
      var parent = null;

      // parse the tag
      try {
        // set the tagname
        parent = $(item).parent().get(0).tagName.toLowerCase()
      } catch(err) {}

      // did we find a parent ?
      if(parent === null) return;
      if(parent === 'head') return;

      // build out the occurrence we will be adding
      occurrence = {

        url: href,
        display: 'url',
        message: '$ was referenced outside of $',
        identifiers: [ href, 'head' ]

      }

      // build up code block
      var build = payload.getSnippetManager().build( lines, last_current_line, href );

      // check if we found a build
      if(build) {

        // add to list
        occurrence.display    = 'code';
        occurrence.code       = build;

        // set last line
        last_current_line     = build.subject;

      }

      // add the rule
      payload.addRule({

          type:     'warning',
          message:  'CSS files must be referenced in <head>',
          key:      'order'

        }, occurrence);

    });

    // done ... ?
    fn(null)

  });

};
