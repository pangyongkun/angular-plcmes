/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('Order')
        .factory('orderService', orderService);

    orderService.$inject = ['$http', '$q', '$timeout'];

    function orderService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }
        ///////////////////////////////////////////////////////////////////////返回的服务
        var service = {
            getOrder: getOrder,
            deleteOrder: deleteOrder,
            modifyOrder: modifyOrder,
            getOrders:getOrders,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;
        ////////////////////////////////////////////////////////////////////////功能函数实现


        function getOrder(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/order.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteOrder(id) {
            var defer = $q.defer();
            $http.post('', {id: id})
                .success(function (data) {
                    $timeout(function () {
                        defer.resolve(data);
                    }, 1000)

                })
                .error(function (reason) {
                    $timeout(function () {
                        defer.resolve(reason);
                    }, 1000)

                });
            return defer.promise;
        }

        function modifyOrder(order) {
            var defer = $q.defer();
            $http.post('', order)
                .success(function (data) {
                    $timeout(function () {
                        defer.resolve(data);
                    }, 1000)

                })
                .error(function (reason) {
                    $timeout(function () {
                        defer.resolve(reason);
                    }, 1000)

                });
            return defer.promise;
        }

        function getOrders(){


        }

        function getPage(targetPage, pageSize, params) {

            var deferred = $q.defer();

            var start = (targetPage - 1) * pageSize;
            start = start <= 0 ? 0 : start;

            var result = randomsItems.slice(start, start + pageSize);

            $timeout(function () {
                //note, the server passes the information about the data set size
                deferred.resolve({
                    orders: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var state=['完成','未完成']
            return {
                id:1,
                number:"ZTKD"+100000+Math.floor(Math.random() * 888888),
                state:state[Math.floor(Math.random()*2)]
            };

        }

        function getLastStateParams() {
            return lastStateParams;
        }

        function setLastStateParams(stateParams) {
            lastStateParams = stateParams
        }


    }


})()

