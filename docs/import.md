Browsers are built to download files in parallel, these files are downloaded as they are parsed from the HTML in the response. When using `@import` the requested `@import` files will only be downloaded after the requested css file is downloaded from the server making your users wait on a CSS file to finish downloading before starting the next.

# How do I fix this ?

Avoid using `@import` in your CSS files to `<link .. />` elements.

For example the following:

```
@import('/reset.css');

body { background-color: red; }
```

would be updated to the following instead:

```
<html>
  <head>
    <link href="/reset.css" />
  </head>
</html>
```

# Resources

* [How to avoid CSS @import](http://www.fastcomet.com/tutorials/gtmetrix/avoid-css-import)
* [PageSpeed: Avoid CSS @import](https://gtmetrix.com/avoid-css-import.html)
