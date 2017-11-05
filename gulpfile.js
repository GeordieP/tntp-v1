"use strict"

const gulp = require("gulp")
const webpack = require("webpack")
const webpackStream = require("webpack-stream")
const webpackDevServer = require("webpack-dev-server")
const rimraf = require("rimraf")
const path = require("path")
const packageJson = require("./package.json")

// use a function so the returned object can be a constant, but
// we can use intermediate values when building the object
const miscCfg = (() => {
    let tmp = {}

    tmp.appRoot = path.resolve("src")
    tmp.buildIncludeDir = path.resolve("src/include")
    tmp.appEntry = path.resolve(tmp.appRoot, "js/index.js")
    tmp.buildDest = path.resolve("build/")

    // webpack config files
    tmp.wpBaseCfg = path.resolve("webpack.config")

    return tmp
})()

// functions
function clean() {
    try {
        // remove build dir
        rimraf.sync(miscCfg.buildDest)    
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    }
}

// main tasks
gulp.task("default", ["dev"])
gulp.task("dev", ["copyInclude", "hot"])

// tasks
// clean working dir
gulp.task("clean", (callback) => {
    return clean()
        .catch(e => {
            console.error(e)
        })
})

gulp.task("copyInclude", ["clean"], () => {
    // copy everything from include directory into build/
    gulp.src(miscCfg.buildIncludeDir + "/**/*")
        .pipe(gulp.dest(miscCfg.buildDest))
})

// run webpack build in production mode
gulp.task("build", ["copyInclude"], () => {
    process.env.NODE_ENV = "production"

    // load our webpack configuration and start the webpack build process
    let wpCfg = require(miscCfg.wpBaseCfg)
    return gulp.src(miscCfg.appEntry)
        .pipe(webpackStream(wpCfg, webpack))
        .pipe(gulp.dest(miscCfg.buildDest))
})

gulp.task("hot", (callback) => {
    let wpCfg = require(miscCfg.wpBaseCfg)
    let port = 8080
    let devServerOpts = {
        contentBase: miscCfg.buildDest,
        hot: true,
        port: port,
    }

    wpCfg.entry.unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server")

    new webpackDevServer(webpack(wpCfg), devServerOpts).listen(port, "localhost", err => {
        if (err) {
            console.error(err)
            callback()
        }
    })
})

gulp.task("help", ["list"])

gulp.task("list", () => {
    console.log("\ndefault:\nRun 'dev'")
    console.log("\ndev:\nRun 'copyInclude' and 'hot'")
    console.log("\nclean:\nExec rm -rf on build/")
    console.log("\nbuild:\nRun 'copyInclude', then start webpack build process")
    console.log("\nhot:\nCompile app with webpack, and serve results with hot module reloading.")
    console.log("\n")
})
