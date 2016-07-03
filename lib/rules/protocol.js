// load in the required modules
const cheerio   = require('cheerio');
const url       = require('url');
const S         = require('string');
const async     = require('async');

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
    if(S(content || '').isEmpty() === true) return fn(null);

    // load up cheerio
    var $ = cheerio.load(content)

    // parse the lines
    var lines = content.split('\n');

    // url payload
    var uri = url.parse(data.url);

    // loop the items
    $('a,link,img,script').each(function(index, item) {

      // loop it
      var link      = $(item).attr('src') || $(item).attr('href') || $(item).attr('target') || '';

      // clean the url
      var clean     = link.toLowerCase();

      // check it
      if(link.indexOf('http:') === -1 && 
          link.indexOf('https:') === -1) return;

      // parse the url
      var entryUri  = url.parse(link)

      // check if same host
      if(uri.hostname != entryUri.hostname) return;

      // get the lines to display
      build = payload.getSnippetManager().build(lines, last_current_line, link)

      // only if we found it ?
      if(!build) return;

      // set the last found
      last_current_line = build.subject;

      // add to the rules
      payload.addRule({

          type: 'notice',
          key:  'protocol',
          message: 'Omit the protocol from embedded resources'

        }, {

            code: build,
            display: 'code',
            message: link.replace('http://', '').replace('https://', '')

          });

    });

    // done ... ?
    fn(null)

  });

};
