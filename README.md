![stable 1.0.5](https://img.shields.io/badge/stable-1.0.5-brightgreen.svg "Stable!!")

Constellation js
================

Original design and development by [Victor Ivanov](https://github.com/Vi-Victor), with additional functionality and documentation by [Michael Hemingway](https://github.com/MichaelHemingway).

![constellation demo](http://live.arthem.co/constellation.gif "constellation js")

Constellation.js features a responsive canvas in html, with a set of dot objects that bounce around with constrollable spawn parameters, and once in proximity to one another, these dots are connected by lines objects. 
[LIVE DEMO](http://live.arthem.co/demos/constellation.html).

### Usage

Load `constellation.min.js` in your document and initialize constellation to your canvas.

```javascript
Constellation.setup({
  canvas: document.getElementById('canvas'),
  lineDistance: 100,
  dotnum: 160,
  interactive: true
});
Constellation.start();
```
The plugin will automatically size the canvas to it's parent size.

Changelog
================================================================

### Version 1.0.5

* Made it into a neat little module! _Now with 100% more options._

### Version 1.0.3

* Fixed and perfected the mouse hover effect, added in logic to walk the mouse around when not active.

### Version 1.0.2

* Added strict statement & encapsulated the entire code in dom listener event and closure.
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.

Notes
-------------------------------------------------

Version 1.0.5

Last updated October 10th, 2016
