(function () {
    "use strict";
    angular.module('raw-material-processing.FA.fiber-ribbon-batch')
        .factory('rawMaterialFAFiberRibbonBatchService', FiberRibbonBatchService);

    FiberRibbonBatchService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function FiberRibbonBatchService($http, $q, Restangular, $timeout, $state) {
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
            back: back
        };
        return service;


        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        function back() {
            var lastStateParams = service.getLastStateParams() ? service.getLastStateParams() : '';
            $state.go('raw-material-processing.FA.fiber-ribbon-batch.list', lastStateParams);
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


        function save(fiberRibbonBatch) {
            fiberRibbonBatch.id = ++total;
            randomsItems.push(fiberRibbonBatch);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(fiberRibbonBatch) {
            randomsItems[fiberRibbonBatch.id] = fiberRibbonBatch;
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
                    fiberRibbonBatch: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var fiberRibbonBatches = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    fiberRibbonBatches: fiberRibbonBatches,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {
            var materialNumber = [21233, 28300];
            var materialName = ['光纤带', '光纤带'];
            var model = ['1m', '3m'];
            var batches = [1234, 23444];
            var amount = [112, 54];
            var timestamps = ['2001-2-3 10:08', '2016-3-2 08:03'];
            var randomNum = Math.floor((Math.random() * 2));
            return {
                id: id,
                material: {
                    number: materialNumber[randomNum],
                    name: materialName[randomNum],
                    model: model[randomNum]
                },
                batch: batches[randomNum],
                amount: amount[randomNum],
                timestamp: timestamps[randomNum]
            }
        }


    }
})();