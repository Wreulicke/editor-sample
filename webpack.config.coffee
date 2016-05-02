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
  resolve:
    root: [
      path.resolve('bower_components')
      path.resolve('./src')
      path.resolve('./src/module')
      path.resolve('node_modules')
    ]
    alias:
      'markdown-it':'markdown-it/dist/markdown-it.js'
      'highlightjs':'highlightjs/highlight.pack.min.js'
    moduleDirectories: ['node_modules','bower_components']
    extensions: [
      '', '.ts', '.webpack.js', '.web.js', '.js', '.jade','.pack.js'
    ]
  module:
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
      { test: /\.jade$/, loader: 'jade-loader' }
    ]
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    )
  ]
  devServer:
    contentBase: "target"
    port: 8080
    hot: true
    inline: true
