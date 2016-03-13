(function () {
    "use strict";
    angular.module('raw-material-processing.FA.V-slot-batch')
        .factory('rawMaterialProcessingFAVSlotBatchService', VSlotBatch);

    VSlotBatch.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function VSlotBatch($http, $q, Restangular, $timeout, $state, batchService) {
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
            $state.go('raw-material-processing.FA.V-slot-batch.list', lastStateParams);
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


        function save(VSlotBatch) {
            VSlotBatch.id = ++total;
            randomsItems.push(VSlotBatch);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(VSlotBatch) {
            randomsItems[VSlotBatch.id] = VSlotBatch;
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
                    VSlotBatch: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var VSlotBatches = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    VSlotBatches: VSlotBatches,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }



        function createRandomItem(id) {
            var materialNumbers = [112, 123, 444, 234];
            var materialNames = ['测试物料名称1', '测试物料名称2', '测试物料名称3', '测试物料名称4'];
            var models = ['1分3', '2分3', '1分2', '4分3'];
            var amounts = [100, 111, 123, 333];
            var timestamps = ['2011-1-1 10:23', '2011-1-1 11:23', '2001-1-12 4:23', '2013-1-1 10:23']
            var randomNum = Math.floor((Math.random() * 4));
            var batchNumbers = [123455, 22342, 1111, 2234];
            return {
                id: id,
                material: {
                    number: materialNumbers[randomNum],
                    name: materialNames[randomNum],
                    model: models[randomNum]
                },
                amount: amounts[randomNum],
                timestamp: timestamps[randomNum],
                batch: batchNumbers[randomNum]
            }
        }


    }
})();