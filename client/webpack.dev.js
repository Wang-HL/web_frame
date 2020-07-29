const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    clientLogLevel: 'warning',
    historyApiFallback: true,
    host: 'localhost',  // bind DEV server to localhost
    // host: '::',  // bind DEV server to [::]
    hot: true,
    inline: true,
    overlay: true,
    port: 8080,  // bidn DEV server on port 8080
    progress: true,
    proxy: {
      '/api': 'http://localhost:12580'
    }
  },
});