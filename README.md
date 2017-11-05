# tntp
*(tiled new tab page)*

A dead simple new tab replacement that displays web page links as a customizable grid of colored tiles.

Should work with any browser that implements the WebExtensions API.


Built with:

- Hyperapp [[github](https://github.com/hyperapp/hyperapp)] [[homepage](https://hyperapp.js.org/)]
- Stylus [[github](https://github.com/stylus/stylus)] [[homepage](http://stylus-lang.com/)]


## Dev

- Clone repository
- Run `yarn` in project root
- Run `gulp` in project root to start a webpack dev server with hot reloading

## Build

- Run `gulp build` in project root to copy WebExtension files (manifest, icons, etc) and generate a webpack bundle JS file in the `build/` directory


## Load Extension (Dev mode)

### Firefox (version 57+ recommended)

- Browse to `about:debugging`
- Click "Load Temporary Add-on"
- Browse to `[project root]/build` and select any file

### Chrome
- Browse to `about:extensions`
- Click "Load Unpacked Extension"
- Browse to `[project root]/build` and click open


Check official browser documentation for extension packaging and distribution instructions.
