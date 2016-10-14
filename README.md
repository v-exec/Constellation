# Constellation-JS

Original design and development by [Victor Ivanov](https://github.com/Vi-Victor), with additional functionality and documentation by [Michael Hemingway](https://github.com/MichaelHemingway).

![constellation demo](http://live.arthem.co/constellation.gif "constellation js")

Constellation-JS features a responsive canvas in html, with a set of dot objects that bounce around with controllable spawn parameters. Once in proximity to one another, these dots are connected by line objects. With mouse interaction, the dots only connect through the lines when the mouse is near them.
[LIVE DEMO](http://live.arthem.co/demos/constellation.html).

## Installation

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
The canvas will be automatically sized to its parent size.

## Changelog

### Version 1.0.5

* Made it into a neat little module! _Now with 100% more options._

### Version 1.0.3

* Fixed and perfected the mouse hover effect, added in logic to walk the mouse around when not active.

### Version 1.0.2

* Added strict statement & encapsulated the entire code in dom listener event and closure.
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.

## Notes

Version 1.0.5

Last updated October 10th, 2016
