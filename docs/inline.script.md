Inline javascript is when small bits of javascript are written directly into the HTML document.

This reduces the number of external javascript files called in a webpage. These inline resources are great for small amounts of javascript as they remove the reason for yet another request that will return only a small amount of information.

# How to Fix

Take the content of the script file and move it to a script tag in your page like the following:

```
<html>
  <head>
  </head>
  <body>
    <div class="blue yellow big bold">
      Hello, world!
    </div>
    <script>
      /* contents of a small JavaScript file */
    </script>
  </body>
</html>
```

# Resources

* [Google Developers - Inline Small Resources](https://developers.google.com/speed/pagespeed/service/InlineSmallResources)