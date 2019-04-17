const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  target: 'electron-renderer',
  entry: path.resolve(__dirname, '../renderer/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build')
  },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  devtool: 'inline-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [
      path.resolve(__dirname, '../renderer'),
      path.resolve(__dirname, '../main'),
      path.resolve(__dirname, '../node_modules')
    ]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        loader: 'awesome-typescript-loader'
      },

      // File loader handles SVG, WAV, etc
      {
        test: /\.wav|\.mp3|\.svg|\.woff2$/,
        loader: 'file-loader'
      },

      // Url loader handles fonts and such
      {
        test: /\.woff2|\.ttf$/,
        loader: 'url-loader'
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js|\.tsx?$/,
        loader: 'source-map-loader'
      },

      // Load styles
      {
        test: /\.scss|\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Trax',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([{ from: 'public' }, { from: 'main' }])
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}
