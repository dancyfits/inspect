By delaying when a Javascript file is loaded and parsed pages can be loaded and content shown, with the Javascript then following to provide extra functionality.

After loading, the parsing of Javascript is a heavy operation. Keeping the Javascript code of a web page small and only loading what's needed is a great way to reduce the performance hit browsers (and mostly mobile devices) take when hitting your page to render a basic layout.

# How do I fix this ?

Move Javascript files to the end of your `<body>` tag, just before closing it `</body>` or mark Javascript files (that are not needed immediately to show the content of the page) with the attribute `async` as such:

```
<script src="/app.js" async></script>
```

# Resources

* [Put Scripts at the Bottom](https://developer.yahoo.com/performance/rules.html)
* [High Performance Web Sites: Rule 6  Move Scripts to the Bottom](https://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html)
* [Put JavaScript at bottom](https://gtmetrix.com/put-javascript-at-bottom.html)
