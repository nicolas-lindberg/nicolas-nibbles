
var path = require('path');
var webpack = require('webpack');

var bundlePath = path.resolve(__dirname, 'build', 'scripts');
var sitejs = ['./scripts/site.js'];

var sourceScripts = sitejs;

var config = {
  entry: sourceScripts,
  output: {
    path: bundlePath,
    filename: 'site.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  }
};

module.exports = config;