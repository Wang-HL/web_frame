const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(__dirname, 'dist/*'),
      ],
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'public'),
      to: path.join(__dirname, 'dist/'),
      force: true,
      ignore: ['index.html'],
    }]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      minSize: 80000,
      maxSize: 250000,
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 8,
        },
        sourceMap: true,
      }),
    ],
  },
});