const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "desuplayer.css",
    disable: false
})

module.exports = {
    entry: {
        desuplayer: './src/js/index.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use:[{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }],
    },
    plugins: [
        extractSass
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'desuplayer.js',
      library: 'desuplayer',
      libraryExport: 'default'
    }
};