# tntp
*(tiled new tab page)*

A dead simple new tab replacement that displays web page links as a customizable grid of colored tiles.

Should work with any browser that implements the WebExtensions API.


Built with:

- Hyperapp [[github](https://github.com/hyperapp/hyperapp)] [[homepage](https://hyperapp.js.org/)]
- Stylus [[github](https://github.com/stylus/stylus)] [[homepage](http://stylus-lang.com/)]


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


## Dev

- Clone repository
- Run `yarn` in project root
- Run `gulp` in project root to start a webpack dev server with hot reloading
- Browse to `localhost:8080` to view output (Note: App will not have access to the WebExtensions API in this mode)

Some notes about how storage things work during development:

Normally, (in prod mode; once it's a built browser extension) the application stores its data in the `browser.storage.local` area, a system exposed by the WebExtensions API.

This app uses a polyfill to allow us to use the "standard" API in browsers where it's not completely supported yet (Mainly Google Chrome; we can now use `browser.storage` rather than `chrome.storage`). The polyfill is in the `src/include_prod` directory, and is copied to `build/` during the `build` gulp task.

Since our dev mode is serving the app as a web page using webpack-dev-server, the polyfill will throw errors. For this reason, we don't copy it over during the dev gulp task. Now, without the polyfill copied to `build/`, because the app relies on this `browser` API, we'll get more errors as `browser` is undefined.

In order to substitute the required functionality, in dev mode we instead copy a file from `src/include_dev` to `build/`. It's got the same name as the polyfill so that `index.html` will pick it up, but instead of being a polyfill, it's a small script to mock the parts of the WebExtensions API that we use. It is of course missing features, but works well enough for our purposes. This script also provides some default pages and settings to work with.

