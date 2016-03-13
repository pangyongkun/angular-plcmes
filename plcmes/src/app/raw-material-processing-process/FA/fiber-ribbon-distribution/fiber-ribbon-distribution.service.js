(function () {
    "use strict";
    angular.module('raw-material-processing.FA.fiber-ribbon-distribution')
        .factory('FiberRibbonDistributionsService', fiberRibbonDistributionsService);

    fiberRibbonDistributionsService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function fiberRibbonDistributionsService($http, $q, Restangular, $timeout, $state) {
        var randomsItems = [];
        var lastStateParams = '';
        var total = 666;
        for (var i = 0; i < 666; i++) {
            randomsItems.push(createRandomItem(i));
        }
        var fiberRibbonDistributionsService = {
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
            queryById: queryById,
            paginationQuery: paginationQuery,
            deleteOne: deleteOne,
            save: save,
            merge: merge,
            back: back
        };
        return fiberRibbonDistributionsService;


        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        function back() {
            var lastStateParams = fiberRibbonDistributionsService.getLastStateParams() ? fiberRibbonDistributionsService.getLastStateParams() : '';
            $state.go('raw-material-processing.FA.fiber-ribbon-distribution.list', lastStateParams);
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


        function save(fiberRibbonDistribution) {
            fiberRibbonDistribution.id = ++total;
            randomsItems.push(fiberRibbonDistribution);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(fiberRibbonDistribution) {
            randomsItems[fiberRibbonDistribution.id] = fiberRibbonDistribution;
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
                    fiberRibbonDistribution: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var fiberRibbonDistributions = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    fiberRibbonDistributions: fiberRibbonDistributions,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {
            return {
                id: id,
                material: {
                    number: 28299,
                    name: '光纤带',
                    model: '1m'
                },
                receiver: '测试组长',
                receiveAmount: id * 3,
                timestamp: '2015.1.2 10.34',
                batch: 2 * id + id * id,
            }
        }


    }
})();