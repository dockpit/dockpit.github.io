/* globals __dirname, process, setTimeout */

//gulp deps
var gulp        = require("gulp")
var gutil       = require("gulp-util")
var less        = require("gulp-less")
var concat      = require("gulp-concat");
var minifyCSS   = require("gulp-minify-css")

//ms deps
var ms          = require("metalsmith")
var markdown    = require("metalsmith-markdown")
var templates   = require("metalsmith-templates")
var collections = require("metalsmith-collections")
var permalinks  = require("metalsmith-permalinks")
var ignore      = require("metalsmith-ignore")

//misc deps
var lr     = require("tiny-lr")()
var fs     = require("fs")
var path   = require("path")
var swig   = require("swig")

//helper for capturing final uncaught errors
process.on("uncaughtException", function(err) {
  "use strict";
  gutil.log(gutil.colors.red("[UNCAUGHT EXCEPTION]" + err));
});

//custom filter for splitting strings
swig.setFilter('split', function (input) {
  return input.split(",")
});


/**
 * =============================================
 * Configuration
 * =============================================
 */

//var paths
var inPath = path.join(__dirname, "in")
var outPath = path.join(__dirname, "out")

//collection config
var colls = {
  explanations: {
    pattern: "md/explanations/*.md",
  },
  features: {
    pattern: "md/features/*.md",
    sortBy: 'priority',
    reverse: true
  },
  pages: {
    pattern: "md/pages/*.md"
  }
}


/**
 * =============================================
 * Automation
 * =============================================
 */

//auto build new out on changes in in
gulp.task("watch", function(){

  //compile less and combine sprite css
  gulp.watch(["in/less/*.less"], ["less"]);

  gulp.watch([
    "in/md/*", 
    "in/md/**/*.md",
    "in/html/*", 
    "in/html/**/*.html",
    "in/css/*.css", 
    "in/js/*.js", 
  ], ["build"]);
});

/**
 * =============================================
 * Servers
 * =============================================
 */

// liver reloads the browser when something in the output dir changes
gulp.task("server:livereload", function(done){
  lr.listen(35729, function (err) {
    if (err) {
      done(err);
    }

    gutil.log("Live reload server listening on: " +  gutil.colors.yellow(35729));
  });

  gulp.watch(["out/**/*"], function(e){
    gutil.log("File "+path.relative(__dirname,e.path)+ " was "+gutil.colors.yellow(e.type));
    lr.changed({
      body: { files: [e.path] }
    });
  });
});


/**
 * =============================================
 * Building from src (in -> out)
 * =============================================
 */

// use gulp to build less and concat sprite css
gulp.task("less", function () {
  return gulp.src(path.join(inPath, "less", "*.less"))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(path.join(inPath, "css")));
});

// use metalsmith to build the site
gulp.task("build", function(done){
  swig.invalidateCache();

  ms(__dirname)
    .source(inPath)
    .destination(outPath)
    .use(ignore(["vendor/**/*"]))   
    
    .use(collections(colls))    
    .use(markdown())    
    
    //render items using swig
    .use(templates({
      engine: "swig",
      directory: path.join(inPath, "html"),
    }))

    //do not actually output the template files
    .use(ignore(["html/**/*.html", "less/**/*.less"]))   
    .build(function(err){
      if (err) return done(err)
      
      // copy homepage file as index.html
      var dest = path.join(__dirname, "index.html")
      var src = path.join(__dirname, "out", "md", "pages", "home.html")

      err = fs.unlinkSync(dest)
      if (err) return done(err)

      fs.link(src, dest, done)
    })

})

//default task starts dev env
gulp.task("default", function(){
  gulp.start("server:livereload");
  gulp.start("watch");
})