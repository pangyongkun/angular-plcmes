(function () {
    "use strict";
    angular.module('raw-material-processing.chip.stock-out')
        .factory('ChipStockOutService', StockOutService);

    StockOutService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];
    function StockOutService($http, $q, Restangular, $timeout, $state) {
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
            $state.go('raw-material-processing.chip.stock-out.list');
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


        function save(stockOut) {
            stockOut.id = ++total;
            randomsItems.push(stockOut);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(stockOut) {
            randomsItems[stockOut.id] = stockOut;
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
                    stockOut: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var stockOuts = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    stockOuts: stockOuts,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {
            return {
                id: id,
                material: {
                    number: 123,
                    name: '芯片',
                    model: '1分2'
                },
                wafer: 12344,
                amount: 123,
                operator: '测试出库员',
                timestamp: '2013.12.03  19:09'
            }
        }


    }
})();