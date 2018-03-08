const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: {
        desuplayer: './src/js/index.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use:[{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }],
    },
    output: {
      path: path.resolve(__dirname, 'test'),
      filename: 'desuplayer.js',
      library: 'desuplayer',
      libraryExport: 'default'
    }
};