/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const version = require('./package.json').version

let libraryName = 'tctip';

let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}-${version}.min.js`;
} else {
  outputFile = `${libraryName}-${version}.js`;
}

plugins.push(new webpack.LoaderOptionsPlugin({
  minimize: true
}))

const config = {
  entry: __dirname + '/src/main.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      { 
        test: /\.css$/, 
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          'postcss-loader' 
        ]
      },
      { 
        test: /\.less$/, 
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
      　test: /\.(png|jpg|gif)$/,
      　loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
