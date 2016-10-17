![stable 1.0.5](https://img.shields.io/badge/stable-1.0.5-brightgreen.svg "Stable!!")

Constellation js
================

By Michael Hemingway

![constellation demo](http://live.arthem.co/constellation.gif "constellation js")

Orignal design & legwork by [Victor Ivanov](https://github.com/Vi-Victor/).

Constellation.js features a responsive canvas in html, with a set of dot objects that bounce around with constrollable spawn parameters, and once in proximity to one another, these dots are connected by lines objects.

[LIVE DEMO](http://live.arthem.co/demos/constellation.html).

### Usage

Load `constellation.min.js` in your document and initialize constellation to your canvas.

```javascript
Constellation.setup({
  canvas: document.getElementById('canvas'),
  lineDistance: 100,
  dotnum: 160,
  interactive: true,
	strokeColor: 'rgb(120,120,120)',
	dotColor: 'rgb(220,220,220)'
});
Constellation.start();
```
The plugin will automatically size the canvas to it's parent size.


Changelog
================================================================

## Version 1.0.6

* Corrected misleading documentation. Thanks [@Ragekit](https://github.com/ragekit)!
* Added colors! One can now pass `dotColor` and `strokeColor` as parameters in rgb. Documentation has been updated to reflect this change.
* **This version does not work on mobile.**

### Version 1.0.5

* Made it into a neat little module! _Now with 100% more options._

### Version 1.0.3

* Fixed and perfected the mouse hover effect, added an logic to walk the mouse around when not active.

### Version 1.0.2

* added strict statement && encapsulated the entire code in dom listener event and closure.
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.


## TODO ##

* Refactor for modularity & add window resize detect that changes number of dots.
* Make Out-of-Bounds dots (after resize) return to bounds. 



Notes
-------------------------------------------------

Version 1.0.5

Last updated October 10th, 2016