'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'ngSails', // angular-sails
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'angularFileUpload'
])
.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home',{
			url:'/',
			views:{
				'view.main':{
					templateUrl: 'partials/main_home.html',
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

	
}])
.config(['$httpProvider',function($httpProvider) {
	$httpProvider.defaults.headers
		.common["X-Requested-With"]="XMLHttpRequest";
	
}]);

// .config(function($httpProvider){
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// });

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
