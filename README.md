Constellation js
================

By Victor Ivanov

The current version features a responsive canvas in html, with a set of dot objects that bounce around in said canvas with random spawn parameters, and once in proximity to one another, these dots are connected by lines objects.

## Changelog ##

### Version 1.0.2

* added strict statement && encapsulated the entire code in dom listener event and (func(){}());
* Fixed fitToContainer(); method from earlier implementation which needlesly took a canvas argument.


## TODO ##


* Refactor for modularity & add window resize detect that changes number of dots.
* Make Out-of-Bounds dots (after resize) return to bounds. 



Notes
================================================================

Version 1.0.2

Last updated May 31, 2016