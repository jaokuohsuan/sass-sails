'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.controller('MyCtrl1', ['$scope', '$sails', '$filter', '$http', 'formDataObject', '$upload',

  function($scope, $sails, $filter, $http, formDataObject, $upload) {
    ///////////
    $scope.lookup = {};
    $scope.msos = [];

    (function() {
      $sails.get("/mso").success(function(response) {
        $scope.msos = response;
        $scope.lookup = {};
        for (var i in $scope.msos) {
          $scope.lookup[$scope.msos[i].id] = i;
          console.log($scope.lookup[$scope.msos[i].id]);
        }
      }).error(function(response) {
        console.log('error');
      });

      $sails.get("/task").success(function(response) {
        console.log('task: ' + response);
      }).error(function(response) {
        console.log('error');
      });

      $sails.on('mso', function(message) {
        console.log('sails published a message for mso: ' + message.verb);
        switch (message.verb) {
          case 'created':
            console.log("pushing " + JSON.stringify(message.data));
            $scope.msos.push(message.data);
            $scope.lookup = {};
            for (var i in $scope.msos) {
              $scope.lookup[$scope.msos[i].id] = i;
            }
            break;
          case 'destroyed':
            $scope.msos = $scope.msos.filter(function(mso) {
              return mso.id != message.id;
            });
            $scope.lookup = {};
            for (var i in $scope.msos) {
              $scope.lookup[$scope.msos[i].id] = i;
            }
            break;
          case 'addedTo':
            var idx = $scope.lookup[message.id];
            $sails.get("/task/" + message.addedId).success(function(aTask) {
              $scope.msos[idx].tasks.push(aTask);
            }).error(function(aTask) {
              console.log('error');
            });
            break;
          case 'removedFrom':
            var idx = $scope.lookup[message.id];
            $scope.msos[idx].tasks = $scope.msos[idx].tasks.filter(function(task) {
              return task.id != message.removedId;
            });
            break;
        }
      });
      $sails.on('task', function(message) {
        console.log('sails published a message for task: ' + message.verb);
      });

    })();
    ///////////

    // $scope.filesChange=function(elm){
    //   $scope.files=elm.files;
    //   $scope.apply();
    // }

    $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'http://localhost:1337/mso/upload?myname=love2', //upload.php script, node.js route, or servlet url
          method: 'POST',
          // headers: {'header-key': 'header-value'},
          // withCredentials: true,
          data: {
            myObj: $scope.myModelObj
          },
          file: file, // or list of files: $files for html5 only
          /* set the file formData name ('Content-Desposition'). Default is 'file' */
          //fileFormDataName: myFile, //or a list of names for multiple files (html5).
          /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
        //.error(...)
        //.then(success, error, progress); 
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };


    $scope.updateMsoImg = function() {

      return $http({
        method: 'POST',
        url: 'http://localhost:1337/mso/upload?myname=love1',
        headers: {
          // 'Content-Type': 'multipart/form-data'
          'Content-Type': undefined
        },
        // file: $scope.files,
        data: {
          file: $scope.files
        },


        transformRequest: formDataObject
        // transformRequest: function(data){return data;}
      }).success(function(result) {
        console.log(result);
        return result;
      });
      // var fd= new FormData();
      // angular.forEach($scope.files,function(file){
      //   fd.append('file',file);
      // });
      // $http.post('http://localhost:1337/mso/upload',fd,
      // {
      //   transformRequest: angular.identity,
      //   header:{'Content-Type': undefined}
      // })
      // .success(function(result) {
      //   console.log(result);
      //   return result.data;
      // });



    }



  }
]);

myAppControllers.controller('MyCtrl2', [

  function() {}
]);



// for test UI bootstrap  ...it's work
myAppControllers.controller('TimepickerDemoCtrl', ['$scope',
  function($scope) {

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      $scope.mytime = d;
    };

    $scope.changed = function() {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };



  }
]);