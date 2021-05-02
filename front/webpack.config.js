const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/.env') });
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: ['./app/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: 'html-loader',
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      /* {
        test: /\.(ttf|eot|svg|woff|woff2|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'file-loader',
        options: {
          outputPath: path.resolve(__dirname, 'dist/fonts'),
        },
      }, */
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
  ],
  devServer: {
    port: 9000,
    publicPath: 'http://localhost:9000',
    watchContentBase: true,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
