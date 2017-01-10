Inlined Stylesheets and Javascript are a great way to reduce the amount of requests that needs to be opened for a page to render. The drawback is that they increase the size of the page that will need to be returned from the server everytime.

Keeping the inlined blocks are important to avoid sending data on each request. If the block is too big a external file that could take advantage of caching by the browsers would allow for quick lookups on subsequent page requests.

# How do I fix this ?

Move large inlined blocks to a seperate external file that can be cached by browsers.

# Resources

* [External CSS vs inline style performance difference?](http://stackoverflow.com/questions/8284365/external-css-vs-inline-style-performance-difference)
* [PageSpeed: Inline small CSS](https://gtmetrix.com/inline-small-css.html)
