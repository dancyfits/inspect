// load modules
const _             = require('underscore');
const url           = require('url');
const zlib          = require('zlib');
const async         = require('async');
const request       = require('request');
const S             = require('string');

/**
* As per https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index,
* if the speedindex is higher than the average that they found we can consider it based ...
**/ 
const SPEEDINDEX_AVERAGE = 5408;

// handle checking for the cache
module.exports = exports = function(payload, fn) {

  // get the data
  var data = payload.getData()

  // check the speedindex
  if(!data || 
     !data.speedindex || 
      data.speedindex === undefined ||
      data.speedindex === null ||
      data.speedindex === NaN) {

    // debugging
    payload.debug('speedindex', 'No speedindex was given, so skipping check');

    // nope out of here
    return setImmediate(fn, null);

  }

  // try to parse
  var speedindex = null;

  // handle errors
  try {

    // parse the number
    speedindex = Math.floor(parseInt(data.speedindex))

  } catch(err) {}

  /**
  * As per https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index,
  * if the speedindex is higher than the average that they found we can consider it based ...
  **/ 
  if(speedindex >= SPEEDINDEX_AVERAGE) {

    // add the rule
    payload.addRule({

      message:      'Above the fold content renders slower than average',
      key:          'speedindex',
      type:         'warning'

    }, {

      message:      'The speedindex of $ should be lower than the average of $',
      idenfifiers:  [ speedindex, SPEEDINDEX_AVERAGE ]

    });

  }

  // done
  setImmediate(fn, null);

};
