(function () {
'use strict';

angular.module('app.utils', [])

.factory('promise', ['$q', function ($q) {
    return function (callback) {
        var defer = $q.defer();
        callback(defer);
        return defer.promise;
    };
}])

;

})();
