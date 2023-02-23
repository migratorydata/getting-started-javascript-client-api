const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'site'),
  },
  devServer: {
    static: './site'
  },

    // ignore optional dependency pako (used for compression feature by MigratoryData API Client)
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /pako/,
        contextRegExp: /migratorydata-client\/lib$/,
      })
    ]  
};