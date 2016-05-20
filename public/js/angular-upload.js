"use strict"

document.querySelector("html").classList.add('js');

var angularUpload = angular.module('app', []);

angularUpload.directive('ngUpload', function() {
  return {
    restrict: 'E',
    templateUrl: '/uploadForm.html',
    link: function(scope, element, attrs) {
      var form = element[0].children[0].children[0];
      var input = form.children[0];
      scope.lists = [];

      input.addEventListener("change", function (e) {
        addFiles(scope, form, input);
        scope.$apply();
      });

    }
  };
});

var listXHTTP = [];

function addFiles(scope, form, input) {
  for (var i = 0; i < input.files.length; i++) {
    var li = {
      "name": input.files[i].name,
      "value": 0,
      "status": "In progress..."
    };
    scope.lists.push(li);
    listXHTTP.push( getXMLHttpRequest() );
    listXHTTP[listXHTTP.length - 1].open("POST", "/uploadFile", true);

    var formData = new FormData(form);
    formData.append('afile', input.files[i]);
    (function(elId) {
      listXHTTP[elId].upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          var percentComplete = Math.round(e.loaded / e.total * 100);
          console.log( e.loaded );
          scope.lists[elId].value = percentComplete;
          scope.$apply();
        }
      }, false);
      listXHTTP[elId].onreadystatechange = function() {
        if (listXHTTP[elId].readyState == 4 && (listXHTTP[elId].status == 200 || listXHTTP[elId].status == 0)) {
          scope.lists[elId].value = 100;
          scope.lists[elId].status = "Done!";
          scope.$apply();
        }
        else if(listXHTTP[elId].readyState == 4 && (listXHTTP[elId].status == 413)) {
          scope.lists[elId].status = "Error!";
          scope.$apply();
        }
      };
    })(listXHTTP.length - 1);
    listXHTTP[listXHTTP.length - 1].send(formData);
  }
}
