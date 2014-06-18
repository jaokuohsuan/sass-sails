'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'ngSails', // angular-sails
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home',{
			url:'/view1',
			views:{
				'view.main':{
					templateUrl: 'partials/partial1.html',
					controller: 'MyCtrl1'
				}
			}

		})
		.state('home2',{
			url:'/view2',
			views:{
				'view.main':{
					templateUrl: 'partials/partial2.html',
					controller: 'MyCtrl2'
				}
			}

		})

	
}]);
// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
