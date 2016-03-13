/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('OrderRelated')
        .factory('orderRelatedService', orderRelatedService);

    orderRelatedService.$inject = ['$http', '$q', '$timeout'];

    function orderRelatedService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getOrderRelated: getOrderRelated,
            deleteOrderRelated: deleteOrderRelated,
            modifyOrderRelated: modifyOrderRelated,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getOrderRelated(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/orderRelated.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteOrderRelated(id) {
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

        function modifyOrderRelated(orderRelated) {
            var defer = $q.defer();
            $http.post('', orderRelated)
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

        function getPage(targetPage, pageSize, params) {

            var deferred = $q.defer();

            var start = (targetPage - 1) * pageSize;
            start = start <= 0 ? 0 : start;

            var result = randomsItems.slice(start, start + pageSize);

            $timeout(function () {
                //note, the server passes the information about the data set size
                deferred.resolve({
                    orderRelateds: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            return {
                id: id,
                circulationNumber: "ZTKD" + (12222223 + Math.floor(Math.random() * 100032)),
                orderNumber: 3132333234 + Math.floor(Math.random() * 1000)
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
