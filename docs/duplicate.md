Avoiding duplicate requests for Javascript or stylesheet is important as these create additional network requests which increase the wait time for users to start using your site.

With the caching enabled in most browsers today the effect of this issue is less likely to be noticed. That being said duplicates scripts are unnecessary data that does not have to be sent, and in the case of Javascript can be disastrous as the script is cached but then executed each time it in referenced.

# How do I fix this ?

Look at removing all duplicates scripts found on your pages.

# Resources

* [The Pain of Duplicate Scripts](http://calendar.perfplanet.com/2014/the-pain-of-duplicate-scripts/)
* [YSlow: Remove duplicate JavaScript and CSS](https://gtmetrix.com/remove-duplicate-javascript-and-css.html)
