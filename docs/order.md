Any stylesheets required to render a page must be included in the HTML response from the server. These files are expected to appear in the `<head>` element. 

This ensures when users are rendering your web page the styles will be present when the page first loads. It is important to keep these files down to the required styles.

# How do I fix this ?

Move all references to stylesheets under the `<head>` element of the page.

# Resources

* [PageSpeed: Optimize the order of styles and scripts](https://gtmetrix.com/optimize-the-order-of-styles-and-scripts.html)
