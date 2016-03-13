/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('SNPrint')
        .factory('SNPrintService', SNPrintService);

    SNPrintService.$inject = ['$http', '$q', '$timeout'];

    function SNPrintService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getSNPrint: getSNPrint,
            deleteSNPrint: deleteSNPrint,
            modifySNPrint: modifySNPrint,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getSNPrint(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/SNPrint.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteSNPrint(id) {
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

        function modifySNPrint(SNPrint) {
            var defer = $q.defer();
            $http.post('', SNPrint)
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
                    SNPrints: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var addTime = ["2015-8-10 12:10:00", "2015-9-11 7:10:00", "2015-12-1 19:10:00"];
            var printTime = ["2015-8-10 12:10:00", "未打印", "2015-12-1 19:10:00", "未打印"];
            var number = Math.floor(Math.random() * 1000);
            return {
                id: id,
                startSN: "ZTKD" + number,
                "endSN": "ZTKD" + (number + 100),
                "total": 100,
                "addTime": addTime[Math.floor(Math.random() * 3)],
                "printTime": printTime[Math.floor(Math.random() * 3)],
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
