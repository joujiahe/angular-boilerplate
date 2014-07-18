(function () {
'use strict';

angular.module('app.route', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', '$sceProvider', '$locationProvider',
function ($routeProvider, $httpProvider, $sceProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $sceProvider.enabled(false);

    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    })
    .otherwise({
        templateUrl: 'views/404.html'
    });

}])

;

})();
