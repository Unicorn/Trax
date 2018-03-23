const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../renderer/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  serve: {
    clipboard: false,
    port: 8080,
    logLevel: 'warn',
    logTime: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve(__dirname, '../renderer'),
      path.resolve(__dirname, '../main'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts|\.tsx|\.js|\.jsx$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: ['babel-loader', 'awesome-typescript-loader'],
      },

      // File loader handles SVG, WAV, etc
      {
        test: /\.wav|\.mp3|\.png|\.svg$/,
        loader: 'file-loader',
      },

      // Load styles
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Trax',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([{ from: 'public' }, { from: 'main' }]),
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
}
