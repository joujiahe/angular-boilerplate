(function () {
'use strict';

angular.module('yControllers')

.controller('navController', ['yConfig', '$routeParams', '$scope', '$modal', 'userService',
function(config, $params, $scope, $modal, userService) {
    $scope.user = userService.current() && userService.current().attributes;

    $scope.postLink = function () {
        var modalInstance = $modal.open({
            template: '<post-form></post-form>'
        });
    };

    $scope.logIn = function () {
        userService.logIn().then(function (user) {
            $scope.user = user.attributes;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.logOut = function () {
        delete $scope.user;
        userService.logOut();
    };
}])

;

})();