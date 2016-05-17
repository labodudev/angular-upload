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
      input.addEventListener("change", function (e) {
        addFiles(form, input);
      });

    }
  };
});

var listLi = [];
var listXHTTP = [];

function addFiles(form, input) {
  for (var i = 0; i < input.files.length; i++) {
    createLi(input.files[i].name);
    listXHTTP[listLi.length - 1] = getXMLHttpRequest();
    listXHTTP[listLi.length - 1].open("POST", "/uploadFile", true);

    var formData = new FormData(form);
    formData.append('afile', input.files[i]);
    (function(elId) {
      listXHTTP[elId].upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          var percentComplete = Math.round(e.loaded / e.total * 100);
          listLi[elId].children[1].value = percentComplete;
        }
      }, false);
      listXHTTP[elId].onreadystatechange = function() {
        if (listXHTTP[elId].readyState == 4 && (listXHTTP[elId].status == 200 || listXHTTP[elId].status == 0)) {
          listLi[elId].children[1].value = 100;
          listLi[elId].children[2].innerHTML = "Done";
        }
        else if(listXHTTP[elId].readyState == 4 && (listXHTTP[elId].status == 413)) {
          listLi[elId].children[2].innerHTML = "Error";
        }
      };
    })(listLi.length - 1);
    listXHTTP[listLi.length - 1].send(formData);
  }
}

function createLi(name) {
  var li = document.createElement("li");
  li.innerHTML = "<span>" + name + "</span><progress max='100'></progress><span class='status'>In progress...</span>";
  document.getElementById("list-file").appendChild(li);
  listLi.push(li);
}
