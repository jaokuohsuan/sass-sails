'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.controller('MyCtrl1', ['$scope', '$sails', '$filter',
  function($scope, $sails, $filter) {
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
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };



  }
]);