# ol-describe-map

[![npm version](https://img.shields.io/npm/v/@terrestris/ol-describe-map.svg?style=flat-square)](https://www.npmjs.com/package/@terrestris/ol-describe-map)
[![GitHub license](https://img.shields.io/github/license/terrestris/ol-describe-map?style=flat-square)](https://github.com/terrestris/ol-describe-map/blob/main/LICENSE)
[![Coverage Status](https://img.shields.io/coveralls/github/terrestris/ol-describe-map?style=flat-square)](https://coveralls.io/github/terrestris/ol-describe-map)
![GitHub action build](https://img.shields.io/github/actions/workflow/status/terrestris/ol-describe-map/on-push-main.yml?branch=main&style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

The purpose of the `ol-describe-map` library is to provide configurable means of getting
a textual description of an [OpenLayers](https://openlayers.org/) map.

This description could enhance OpenLayers map applications by 
* providing additional information
* adding semantics
* making them more accessible (e.g. for visually impaired users)

The library ships with the most basic functionality to describe maps, which most
applications will most likely adjust to their specific purpose. It is easy to configure
more specific describers that take care of the specialties of your actual application.

# Usage

Install as dependency:

```bash
npm install @terrestris/ol-describe-map
```

Use it to describe your map, e.g. in a `moveend`-handler:

```javascript
// import the describe function
import { describe } from '@terrestris/ol-describe-map';

// initialise your map as usual
const map = new Map({ /* configuration left-out for brevity */ });

// whenever the map's moveend event occurs, get a description
map.on('moveend', async () => {
  let desc = await describe(map);
  console.log(desc.text);
  // instead of logging, you probably want to update a
  // aria-description attribute of the map-div:
  map.getTargetElement().setAttribute('aria-description', desc.text);
});
```

The library ships with some textual describers, and they can be quite useful as they are.
But applications might have more specific ways of describing the map content, and you can
easily pass your own describer:

```javascript
// instead of the following line from the above example…
let desc = await describe(map);
```

```javascript
// …you can create…
const myDescriber = async () => {
  return 'HumptyDumpty';
};
// …and pass your own textual describer, e.g.
let desc = await describe(map, {textualDescriber: myDescriber});
```

Your own `myDescriber` function will receive objects with details of the view and all
layers that were described.

# Examples

These examples are all based on the `main`-branch:

* [Basic usage](https://terrestris.github.io/ol-describe-map/main/examples/basic.html)
* [Nominatim describer](https://terrestris.github.io/ol-describe-map/main/examples/nominatim.html)
* [It's OK to `useGeographic()`](https://terrestris.github.io/ol-describe-map/main/examples/use-geographic.html)
* [Describing a vector layer](https://terrestris.github.io/ol-describe-map/main/examples/vector.html)

# API

[Typedoc for all exported types and functions](https://terrestris.github.io/ol-describe-map/main/doc/index.html) again for the `main`-branch

# Development

```bash
# install dependencies
npm install

# run tests (also lints & does a typecheck)
npm test

# run tests in watch mode
npm run test:watch

# preview examples
npm run serve-examples
# examples are now listed under http://localhost:5173/examples/index.html

# build (library only)
npm run build

# build (examples only, rarely used)
npm run build-examples

# build (examples and library)
npm run build:all
# check the contents of the dist-folder

# cleanup build or coverage artifacts
npm run clean

```

# TODOs

* Is the description OK or misleading / false when one uses useGeographic?
* OGC!
* improve vectorlayer description / statistics etc

