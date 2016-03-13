(function () {
    "use strict";
    angular.module('raw-material-processing.FA.stock')
        .factory('FAStockService', stocksService);

    stocksService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function stocksService($http, $q, Restangular, $timeout, $state) {
        var randomsItems = [];
        var lastStateParams = '';
        var total = 666;
        for (var i = 0; i < 666; i++) {
            randomsItems.push(createRandomItem(i));
        }


        var stocksService = {
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
            queryById: queryById,
            paginationQuery: paginationQuery,
            deleteOne: deleteOne,
            save: save,
            merge: merge,
            back: back
        };
        return stocksService;

        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        function back() {
            var lastStateParams = stocksService.getLastStateParams() ? stocksService.getLastStateParams() : '';
            $state.go('basic-setting.stock.list', lastStateParams);
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


        function save(stock) {
            stock.id = ++total;
            randomsItems.push(stock);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(stock) {
            randomsItems[stock.id] = stock;
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
                    stock: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }

        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var stocks = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    stocks: stocks,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {
            return {
                id: id,
                number: '12344',
                name: 'FA',
                model: '1分2',
                amount: 112
            }
        }


    }
})();