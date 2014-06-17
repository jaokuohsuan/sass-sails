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