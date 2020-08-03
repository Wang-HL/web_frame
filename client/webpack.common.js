const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/preset-env', { targets: '> 2.486%, not dead' }],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-syntax-dynamic-import'],
      ['@babel/plugin-proposal-class-properties'],
      ['import', { libraryName: "antd", style: 'css' }],
    ],
  },
};
const styleLoader = {
  loader: 'style-loader',
  options: {
    insertAt: { before: 'link' },
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]-[name]-[hash:base64:5]'
  }
};


module.exports = {
  entry: {
    index: path.join(__dirname, 'index.jsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "duola",
      template: path.join(__dirname, 'public/index.html'),
      meta: {
        // viewport: 'width=device-width, initial-scale=1',
      },
      hash: true,
      favicon: './favicon.ico' //favicon.ico文件路径
    })
  ],
  resolve: {
    modules: ['node_modules', 'components', path.resolve(__dirname, 'src/utils')],
    extensions: ['.js', '.jsx', ".ts", ".tsx", '.css'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [babelLoader],
    }, {
      test: /\.(ts|tsx)?$/,
      use: "ts-loader"
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: [styleLoader, 'css-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [styleLoader, cssLoader],
    }, {
      test: /\.less$/,
      use: [styleLoader, cssLoader, 'less-loader'],
    }, {
      test: /\.(png|jpg|gif|svg|webp|webm|jpeg|bmp|eot|otf|ttf|woff|woff2|mp4|wav|mp3|m4a|aac|oga)$/,
      use: 'file-loader',
    }],
  },
};
