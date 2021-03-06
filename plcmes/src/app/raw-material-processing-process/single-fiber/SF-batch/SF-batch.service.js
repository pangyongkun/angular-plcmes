(function () {
    "use strict";
    angular.module('raw-material-processing.single-fiber.SF-batch')
        .factory('SFBatchService', SFBatch);

    SFBatch.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function SFBatch($http, $q, Restangular, $timeout, $state, batchService) {
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
            $state.go('raw-material-processing.single-fiber.SF-batch.list');
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


        function save(SFBatch) {
            SFBatch.id = ++total;
            randomsItems.push(SFBatch);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(SFBatch) {
            randomsItems[SFBatch.id] = SFBatch;
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
                    SFBatch: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var SFBatches = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    SFBatches: SFBatches,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }


        function createRandomItem(id) {
            var materialNumbers = [112, 123, 444, 234];
            var materialNames = ['单纤', '单纤', '单纤', '单纤'];
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