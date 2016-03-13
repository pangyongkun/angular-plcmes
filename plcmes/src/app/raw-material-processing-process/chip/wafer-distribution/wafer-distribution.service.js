(function () {
    "use strict";
    angular.module('raw-material-processing.chip.wafer-distribution')
        .factory('ChipWaferDistributionService', waferDistributionService);

    waferDistributionService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function waferDistributionService($http, $q, Restangular, $timeout, $state) {
        var randomsItems = [];
        var lastStateParams = '';
        var total = 666;
        for (var i = 0; i < 666; i++) {
            randomsItems.push(createRandomItem(i));
        }


        var service = {
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
            queryById: queryById,
            paginationQuery: paginationQuery,
            deleteOne: deleteOne,
            save: save,
            merge: merge,
            back: back,
            getBatch: getBatch
        };
        return service;


        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        function back() {
            var lastStateParams = service.getLastStateParams() ? service.getLastStateParams() : '';
            $state.go('raw-material-processing.FA.V-slot-distribution.list', lastStateParams);
        }

        function getLastStateParams() {
            return lastStateParams;
        }

        function setLastStateParams(stateParams) {
            lastStateParams = stateParams
        }

        function deleteOne(userID) {
            var deferred = $q.defer();
            randomsItems.splice(userID, 1);
            $timeout(function () {
                deferred
                    .resolve({});
            }, 1500);
            return deferred.promise;
        }


        function save(waferDistribution) {
            waferDistribution.id = ++total;
            randomsItems.push(waferDistribution);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(waferDistribution) {
            randomsItems[waferDistribution.id] = waferDistribution;
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);
            return deferred.promise;
        }


        function queryById(id) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({
                    waferDistribution: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var waferDistributions = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    waferDistributions: waferDistributions,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function getBatch(batchNumber) {
            var batches = [{
                batchNumber: 12345,
                material: {
                    number: '3333445',
                    name: '晶圆',
                    model: '1分3'
                }
            }];
            var deferred = $q.defer();
            for (var i = 0, length = batches.length; i < length; i++) {
                var batch = batches[i];
                if (batch.batchNumber == batchNumber) {
                    $timeout(function () {
                        deferred.resolve(batch.material);
                    }, 500);
                    break;
                }
            }
            return deferred.promise;
        }

        function createRandomItem(id) {
            return {
                id: id,
                material: {
                    number: 123444,
                    name: '晶圆',
                    model: '1分2',
                },
                batch: 123132,
                receiver: '测试组长',
                receiveAmount: 100,
                timestamp: '2011.1.20 10:20'
            }
        }


    }
})();