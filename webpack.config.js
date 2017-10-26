const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
const DIST_DIR = 'dist';

module.exports = {
  devtool: 'source-map',

  entry: Object.assign({
    client: path.join(__dirname, 'src', 'client.tsx'),
  }),

  output: {
    path: path.resolve(__dirname, DIST_DIR, 'assets'),
    filename: '[name].js'
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: [/node_modlues/, /__test__/] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    new workboxPlugin({
      globDirectory: `${DIST_DIR}/assets`,
      globPatterns: ['*.{js,html,css}'],
      //globIgnores: ['**\/*.{html,js,css}'],
      swDest: path.join(`${DIST_DIR}/assets`, 'sw.js'),
    }),
    new HtmlWebpackPlugin({
      path: path,
      inject: false,
      filename: path.join(path.resolve(__dirname, DIST_DIR, 'views'), 'index.ejs'),
      template: 'src/index.ejs'
    }),
  ],
  
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  node: {
    net: 'empty',
    fs: 'empty',
  }
};