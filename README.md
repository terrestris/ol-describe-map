# ol-describe-map

The purpose of this library is to provide configurable means of getting a textual description of an OpenLayers map.

This description could enhance OpenLayers map applications by 
* providing additional information
* adding semantics
* making them more accessible (e.g. for visually impaired users)

The library ships with the most basic functionality to describe maps, which most applications will most likely adjust to their specific purpose. It is easy to configure more specific describers that take care of the specialties of your actual application.

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
# examples are now e.g. http://localhost:5173/basic/index.html

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

* handle useGeographic!
* OGC!

