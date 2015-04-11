require("babel/register")({ extensions: [".jsx"]})

//dependencies
var fs = require("fs")
var walk = require('fs-walk');
var path = require("path")
var gulp = require("gulp")
var less = require("gulp-less")
var request = require("superagent")
var plumber = require("gulp-plumber")
var concat = require("gulp-concat")
var React = require("react")
var Immutable = require('immutable')

var SEGMENT_ID = "8bvqeS1FiRo3sVVW9mZBoyzSrAmmCLXD"

var HTML_DOCKTYPE = "<!doctype html>"
var HTML_CONDITIONALS = '<!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->'
var HTML_ANALYTICS = '<script type="text/javascript">window.analytics=window.analytics||[],window.analytics.methods=["identify","group","track","page","pageview","alias","ready","on","once","off","trackLink","trackForm","trackClick","trackSubmit"],window.analytics.factory=function(t){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(t),window.analytics.push(a),window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var key=window.analytics.methods[i];window.analytics[key]=window.analytics.factory(key)}window.analytics.load=function(t){if(!document.getElementById("analytics-js")){var a=document.createElement("script");a.type="text/javascript",a.id="analytics-js",a.async=!0,a.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},window.analytics.SNIPPET_VERSION="2.0.9",window.analytics.load("'+SEGMENT_ID+'");</script>'

//watch for jsx changes and rebuild
gulp.task("watch", function(){
  gulp.watch(["src/**/*.less"], ["less"])
  gulp.watch(["src/**/*.jsx"], ["clear-cache", "jsx"])
})

//clear require() cache
gulp.task("clear-cache", function(){
  walk.walkSync('src', function(basedir, filename, stat) {
      var pp = ""

      try {
        pp = require.resolve(path.join(__dirname, basedir, filename))
      } catch(err) { return }

      delete require.cache[pp]
  });
})

//donwload most resent release information
gulp.task("release", function(done) {
  request.get("https://api.github.com/repos/dockpit/pit/releases").end(function(err, resp){
    if (err) return done(err)
    
    //get latest release
    var latest = JSON.parse(resp.text).shift()

    fs.writeFileSync(path.join(__dirname, "src", "json", "latest_release.json"), JSON.stringify(latest))    
    done()
  })
})

//compile less to css
gulp.task("less", function () {
  return gulp.src(path.join(__dirname, "src", "**", "*.less"))
    .pipe(plumber())
    .pipe(less())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(__dirname));
});

//build jsx files into static html pages
gulp.task("jsx", function() {
  var globalProps = {
    latestRelease: require("./src/json/latest_release.json")
  }

  var pages = Immutable.Map({
    index: require("./src/jsx/index_page.jsx"),
    download: require("./src/jsx/download_page.jsx"),
  })

  elements = pages.map(function(component, name){
    return React.createElement(component, globalProps)
  })

  html = elements.map(function(el, name){
    return React.renderToStaticMarkup(el)
  })

  html.forEach(function(markup, name){
    markup = markup.replace('__CONDITIONALS__', HTML_CONDITIONALS)
    markup = markup.replace('__ANALYTICS__', HTML_ANALYTICS)

    fs.writeFileSync(path.join(__dirname, name+".html"), HTML_DOCKTYPE+markup)
  })
})

gulp.task("build", ["less", "jsx"])
gulp.task("default", ["release", "clear-cache", "build", "watch"])