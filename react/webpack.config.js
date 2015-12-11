const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = module.exports = {

  context: path.resolve('.'),

  entry: {
    demo: ['./src/demo'],
  },

  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },

  eslint: {
    configFile: path.resolve('.eslintrc'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.NoErrorsPlugin(),
  ],

  devtool: 'eval-sourcemap',

};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new HtmlWebpackPlugin());
} else {
  config.devtool = 'sourcemap';
  config.output.devtoolModuleFilenameTemplate = 'file://[resource-path]';
  config.output.devtoolFallbackModuleFilenameTemplate = 'file://[resource-path]?[hash]';

  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ comments: /a^/, compress: { warnings: false } })
  );
}
