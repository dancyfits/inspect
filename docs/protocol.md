Omitting the protocol from embedded resources makes the URL relative and avoids mixed content issues and results in minor file size savings. Omit the protocol portion (`http:`, `https:`) from URLs pointing to images and other media files, style sheets, and scripts **unless the respective files are not available over both protocols**.

```
<img src="//www.example.com/logo.png" />
```
_instead of:_

```
<img src="http://www.example.com/logo.png" />
```

# How do I fix this ?

Remove the `http:` or `https:` portion from resource urls (while keeping `//`).

# Resources

* [http://www.searchenginepeople.com/blog/web-code-tips.html](Web code tips)
