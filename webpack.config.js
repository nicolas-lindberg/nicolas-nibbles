
var path = require('path');

var bundlePath = path.resolve(__dirname, 'build', 'scripts');
var sources = {
  site: './scripts/site.js',
  //maps: './scripts/maps.js'
};

var config = {
  entry: sources,
  output: {
    path: bundlePath,
    filename: '[name].bundle.js'
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
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