/**
 * Created by jerry on 1/29/16.
 */
(function () {
    "use strict";
    angular.module('produce-process-pre-management.plan.child-order')
        .factory('PrePlanChildOrderService', childOrdersService);

    childOrdersService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function childOrdersService($http, $q, Restangular, $timeout, $state) {
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
            $state.go('produce-process-pre-management.plan.child-order.list', lastStateParams);
        }

        function getLastStateParams() {
            return lastStateParams;
        }

        function setLastStateParams(stateParams) {
            lastStateParams = stateParams
        }

        function deleteOne(childOrderID) {
            var deferred = $q.defer();
            randomsItems.splice(childOrderID, 1);
            $timeout(function () {
                deferred
                    .resolve({});
            }, 1500);
            return deferred.promise;
        }


        function save(childOrder) {
            childOrder.id = ++total;
            randomsItems.push(childOrder);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(childOrder) {
            randomsItems[childOrder.id] = childOrder;
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
                    childOrder: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var childOrders = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    childOrders: childOrders,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {


            var timestamps = ['2014-01-02', '1990-01-02', '2001-09-12', '2010-12-21'];
            var serials = ['1022201020102', '212030122333', '34522233123', '1239483923422'];
            var clients = ['中国电信', '铁塔', '中国移动', '中国联通'];
            var citys = ['南京', '北京', '东京', '华盛顿'];
            var systems = ['测试系统1', '测试系统2', '测试系统3', '测试系统4'];
            var productNames = ['路由器', '光交换机', '分路器', '尾纤'];
            var randomNum = Math.floor((Math.random() * 4));
            var connectedHead = ['FC', 'FI', 'FB', 'FT'];

            return {
                id: id,
                timestamp: timestamps[randomNum],
                serial: serials[randomNum],
                client: clients[randomNum],
                city: citys[randomNum],
                system: systems[randomNum],
                productName: productNames[randomNum],
                productNumber: 1,
                type: 213,
                number: 2,
                price: 21000,
                totalPrice: 41000,
                encapsulation: '封装测试',
                cable: '测试缆经',
                color: '红',
                splittingRatio: '1.1',
                splittingNumber: '12',
                connectedHead: connectedHead[randomNum],
                totalCoreNumber: 11
            }
        }


    }
})();