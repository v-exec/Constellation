![stable 1.0.6](https://img.shields.io/badge/stable-1.0.6-brightgreen.svg "Stable!!")

Constellation js
================

Original design and development by [Victor Ivanov](https://github.com/Vi-Victor), with additional functionality and documentation by [Michael Hemingway](https://github.com/MichaelHemingway).

![constellation demo](http://live.arthem.co/constellation.gif "constellation js")

Constellation.js features a responsive canvas in html, with a set of dot objects that bounce around with constrollable spawn parameters, and once in proximity to one another, these dots are connected by lines.

[LIVE DEMO](http://live.arthem.co/demos/constellation.html).

## Usage

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
The canvas will be automatically sized to its parent size.

## Changelog

## Version 1.0.6

* Corrected misleading documentation. Thanks [@Ragekit](https://github.com/ragekit)!
* Added colors! One can now pass `dotColor` and `strokeColor` as parameters in rgb. Documentation has been updated to reflect this change.
* **This version does not work on mobile.**

### Version 1.0.5

* Made it into a neat little module! _Now with 100% more options._

### Version 1.0.3

* Fixed and perfected the mouse hover effect, added in logic to walk the mouse around when not active.

### Version 1.0.2

* Added strict statement & encapsulated the entire code in dom listener event and closure.
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.

#### Notes

Version 1.0.6

Last updated October 17th, 2016
