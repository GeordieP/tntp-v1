const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(new MinifyPlugin());   
}

module.exports = {
    entry: [
        './src/js/index.js',
        './src/styles/main.styl',
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src/js'),
            path.resolve(__dirname, 'src/styles')
        ],
        extensions: [".js", ".json", ".styl"],
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'env',
                ],
                plugins: [],
            },
            include: [
                path.resolve(__dirname, './'),
            ],
        }, {
            test: /\.styl$/,
            loader: "style-loader!css-loader!stylus-loader"
        }],
    },
    plugins,
}
