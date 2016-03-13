/**
 * Created by jerry on 1/31/16.
 */

(function () {
    'use strict';
    angular.module('anti-counterfeit')
        .factory('AntiCounterService', antiCounterService);


    antiCounterService.$inject = ['$q', '$timeout'];
    function antiCounterService($q, $timeout) {
        var count = 0;

        var service = {
            getInfo: getInfo
        };

        return service;

        ////////////////////////
        function getInfo(serial) {
            var deferred = $q.defer();
            count++;
            $timeout(function () {

                if (serial == 'ZTKD1234') {
                    deferred.resolve({
                        serial: 'ZTKD1234',
                        count: count,
                        producer: '中天宽带',
                        timestamp: '2013年6月22号',
                        productBoole: true
                    })
                } else {
                    deferred.resolve({
                        productBoole: false
                    })
                }

            }, 1000);


            return deferred.promise;

        }

    }

})();
