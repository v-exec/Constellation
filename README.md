![stable 1.0.5](https://img.shields.io/badge/stable-1.0.5-brightgreen.svg "Stable!!")

Constellation js
================

By Michael Hemingway

![constellation demo](http://live.arthem.co/constellation.gif "constellation js")

Orignal design by Victor Ivanov

The current version features a responsive canvas in html, with a set of dot objects that bounce around in said canvas with constrollable spawn parameters, and once in proximity to one another, these dots are connected by lines objects.

## Changelog ##

## Version 1.0.5

* Made it into a neat little module! _Now with 100% more options._

```javascript
var wew = new Constellation.setup({
  canvas: document.getElementById('canvas'),
  lineDistance: 100,
  dotnum: 160,
  interactive: true
});
Constellation.start();
```

## Version 1.0.3

* Fixed and perfected the mouse hover effect, added an logic to walk the mouse around when not active.

### Version 1.0.2

* added strict statement && encapsulated the entire code in dom listener event and closure.
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.


## TODO ##


* Refactor for modularity & add window resize detect that changes number of dots.
* Make Out-of-Bounds dots (after resize) return to bounds. 



Notes
================================================================

Version 1.0.5

Last updated October 9th, 2016