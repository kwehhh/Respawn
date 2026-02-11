/**
 * Config File to Run Demo
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: './playground/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@nurvus/respawn': path.resolve(__dirname, '../src/index.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Welcome to the Respawn ENGINE',
    })
  ]
};