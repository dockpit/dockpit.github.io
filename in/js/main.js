var dp = angular.module('dp', []).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

//show examples
dp.directive('exampleViewer', ['$sce', function($sce) {
  return {
      restrict: 'EA',
      controller: function($scope) {

        $scope.explanation = {
          text: "-",
          show: false
        }

        //@from http://stackoverflow.com/questions/9154026/jquery-dynamically-load-a-gist-embed
        $scope.loadGist = function (element, gistId) {
            var callbackName = "gist_callback";
            window[callbackName] = function (gistData) {
                delete window[callbackName];
                var html = '<link rel="stylesheet" href="' + gistData.stylesheet + '"></link>';
                html += gistData.div;
                element.innerHTML = html;
                script.parentNode.removeChild(script);

            };
            var script = document.createElement("script");
            script.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + callbackName);
            document.body.appendChild(script);
        }

        $scope.loadFile = function(path, $itemEl) {
          var el = document.getElementById("ex-file-view")
          var $el = angular.element(el)
          
          //empty reveils loader
          $el.empty()
          
          //gistId should be in the data el
          var gistId = $itemEl.attr('data-gist')

          //load gist while empty?
          $scope.loadGist(el, gistId)       
        }

        $scope.showExplanation = function(path) {
          
          //if we have some explanation markdown, show it
          var expl = window.explanations[path]
          if(expl) {          
            $scope.explanation.text = $sce.trustAsHtml(String.fromCharCode.apply(String, expl.contents)); 
            $scope.explanation.show = true
          }

          //@todo add explanation

        }

        $scope.hideExplanation = function(path) {
          $scope.explanation.show = false          
        }

      },
  
      //traverse html structure to events    
      link: function (scope, $el) {

        //walks each element in the dom
        var walk = function(el, path) {
          el = angular.element(el)

          //file or folder
          if(el[0].nodeName == "LI") {
            if(el.hasClass("file")) {
              path = path + el.text()


              //add onclick
              el.bind('click', function(ev){
                scope.loadFile(path, el)
              })

            } else {

              //the first label under the LI should contain folder name
              var label = angular.element(el.find("label")[0])
            
              //if its not empty append to path
              if (label.text().length != 0) {            
                path = path + label.text() + "/"  
              }
            }

            //show/hide explanation
            el.bind('mouseenter', function(){
              scope.showExplanation(path)
              scope.$digest()
            }).bind('mouseleave', function(){
              scope.hideExplanation(path)
              scope.$digest()
            })

          }

          angular.forEach(el.children(), function(c){
            walk(c, path)
          })
        }

        //start walking
        walk($el, "/")
      }
  }
}])