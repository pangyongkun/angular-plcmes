/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('CirculationNumber')
        .factory('circulationNumberService', circulationNumberService);

    circulationNumberService.$inject = ['$http', '$q', '$timeout'];

    function circulationNumberService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getCirculationNumber: getCirculationNumber,
            deleteCirculationNumber: deleteCirculationNumber,
            modifyCirculationNumber: modifyCirculationNumber,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getCirculationNumber(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/circulationNumber.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteCirculationNumber(id) {
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

        function modifyCirculationNumber(circulationNumber) {
            var defer = $q.defer();
            $http.post('', circulationNumber)
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
                    circulationNumbers: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {

            var endNumber = "ZTKD1507";
            var startNumber = "ZTKD1609";
            var total = [100, 100, 100];
            var addTime = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"];
            var printTime = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"]
            return {
                id: id,
                startNumber: endNumber + id,
                endNumber: startNumber + id,
                total: total[Math.floor(Math.random() * 3)],
                addTime: addTime[Math.floor(Math.random() * 3)],
                printTime: printTime[Math.floor(Math.random() * 3)]
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
