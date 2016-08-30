Type attributes (`type="text/css"` and `type="text/javascript"`) for style sheets and scripts aren't required in HTML5 (unless using something other than css or javascript).

Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. **This can be safely done even for older browsers.**

```css
<!-- Not recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css" type="text/css">
<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">
```

# How do I fix this ?

Remove type attributes from style sheets (when using CSS) and scripts (when using JavaScript).

# Resources

* [https://google.github.io/styleguide/htmlcssguide.xml](Google HTML/CSS Style Guide)
