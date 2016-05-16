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

function addFiles(form, input) {
  var xhttp = getXMLHttpRequest();

  for (var i = 0; i < input.files.length; i++) {
    xhttp.open("POST", "/uploadFile", true);
    createLi(input.files[i].name);
    var formData = new FormData(form);
    formData.append('afile', input.files[i]);
    xhttp.setRequestHeader('Cache-Control','no-cache');
    xhttp.send(formData);
    (function(elId) {
      xhttp.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          var percentComplete = Math.round(e.loaded / e.total * 100);
          listLi[elId].children[1].value = percentComplete;
        }
      }, false);
    })(i);
  }

  // xhttp.onreadystatechange = function() {
  //   if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 0)) {
  //     console.log(xhttp.responseText);
  //     // listLi[elId].children[2].innerHTML = "Done";
  //   }
  //   else if(xhttp.readyState == 4 && (xhttp.status == 413)) {
  //     // listLi[elId].children[2].innerHTML = "Error";
  //   }
  // };




}

function createLi(name) {
  var li = document.createElement("li");
  li.innerHTML = "<span>" + name + "</span><progress max='100'></progress><span class='status'>In progress...</span>";
  document.getElementById("list-file").appendChild(li);
  listLi.push(li);
}
