Blank `src` attributes on images (`<img ... />`) are extremely bad for performance. Certain browsers actually reload the current page, making multiple requests to your website by rendering only a single page.

# How do I fix this ?

Define actual image urls for any `<img .. />` tags. If the intention is to later define a image, look into creating a small 1px default image.

# Resources

* [Empty image src can destroy your site](https://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/)
* [YSlow: Avoid empty src or href](https://gtmetrix.com/avoid-empty-src-or-href.html)
