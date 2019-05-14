const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    }
  }
};
