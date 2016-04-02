path = require 'path'
webpack = require("webpack")
BowerWebpackPlugin = require "bower-webpack-plugin"

cwd = ->
  args = ['./'].concat(Array::slice.apply arguments)
  path.join.apply(path, args)

module.exports =
  entry:
    app: ['./src/entry.ts']
  output:
    path: path.resolve "./target"
    filename: '[name].js'
  alias:
    jquery: "jquery"
    jQuery: "jquery"
  resolve:
    root: [
      path.resolve('bower_components')
      path.resolve('./src')
      path.resolve('node_modules')
    ]
    moduleDirectories: ['node_modules','bower_components']
    extensions: [
      '', '.ts', '.webpack.js', '.web.js', '.js', '.jade'
    ]
  module:
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
      { test: /\.jade$/, loader: 'jade-loader' }
    ]
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    )
    new webpack.ProvidePlugin
      jQuery: "jquery",
      $: "jquery"
      "window.jQuery":"jquery"
  ]
  devServer:
    contentBase: "target"
    port: 8080
    hot: true
    inline: true
