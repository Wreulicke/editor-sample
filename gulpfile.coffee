gulp = require 'gulp'
$ = require('gulp-load-plugins')()
run = require 'run-sequence'
packConfig = require './webpack.config.coffee'
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'

plumber = ->
  $.plumber(
    errorHandler: (err) ->
      console.log(err.messageFormatted)
      @emit('end')
  )

vulcanize = ->
  $.vulcanize
    inlineScripts: true
    inlineCss: true
    stripExcludes: true

gulp.task 'jade', ->
  gulp.src("src/index.jade")
  .pipe plumber()
  .pipe $.jade()
  .pipe gulp.dest 'target'

gulp.task 'less', ->
  gulp.src('src/less/**/*.less',base:'src/less')
  .pipe plumber()
  .pipe $.less()
  .pipe gulp.dest 'target/css'

gulp.task 'webpack', ->
  gulp.src("src/**/*")
    .pipe plumber()
    .pipe $.webpack packConfig
    .pipe gulp.dest 'target'

gulp.task 'web', ['default','watch'], ->
  packConfig.devtool = 'eval';
  packConfig.debug = true;

  child = require('child_process').spawn('node',['.','3000'])
  child.stdout.on 'data',
    (data) ->
      process.stdout.write("[WebServer] : " + data.toString())


  new WebpackDevServer(webpack(packConfig),
    publicPath: packConfig.output.publicPath
    stats: {
      colors: true
    }
    proxy: {
      "*": 'http://localhost:3000/'
    }
  ).listen(8080, 'localhost', (err) ->
    gulp.src('./target/index.html').pipe($.open(uri: 'http://localhost:8080/webpack-dev-server/'))
  )


gulp.task 'vulcanize', ->
  gulp.src('target/index.html')
  .pipe plumber()
  .pipe vulcanize()
  .pipe gulp.dest './vulcanized/'

gulp.task 'default', (cb) ->
  run(
    ['jade','less'],
    'webpack',
    cb
  )

gulp.task 'watch', ->
  gulp.watch 'src/less/**/*.less', ['less']
  gulp.watch "src/index.jade", ['jade']
  #gulp.watch ['src/ts/**/*','src/jade/**/*.jade'], ['webpack']
