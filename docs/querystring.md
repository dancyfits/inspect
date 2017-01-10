Quick ways to cache bust normally include adding a querystring with a version or timestamp to the static resource. 

The default configuration on proxy severs like [SQUID](http://www.squid-cache.org/) are to not cache resources using a querystring.

# How do I fix this ?

Remove any querystrings from static resources and move build/timestamps to the filename.

For example:

```
/app.js?ts=20160606
```

could be renamed to:

```
/app.20160606.js
```

# Resources

* [Squid: Optimising Web Delivery](http://www.squid-cache.org/)
* [Revving Filenames: don’t use querystring](https://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/)
* [Squid cannot cache static files with query string](http://serverfault.com/questions/401201/squid-cannot-cache-static-files-with-query-string)
