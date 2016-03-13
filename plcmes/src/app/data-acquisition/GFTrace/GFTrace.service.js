/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('GFTrace')
        .factory('GFTraceService', GFTraceService);

    GFTraceService.$inject = ['$http', '$q', '$timeout'];

    function GFTraceService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getGFTrace: getGFTrace,
            deleteGFTrace: deleteGFTrace,
            modifyGFTrace: modifyGFTrace,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getGFTrace(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/GFTrace.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteGFTrace(id) {
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

        function modifyGFTrace(GFTrace) {
            var defer = $q.defer();
            $http.post('', GFTrace)
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
                    GFTraces: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var operator = ['小李', '小张', '小王'];
            var checkData = [[
                "检修设备:D1",
                "1:64.1 62.4",
                "2:64.1 62.4"
            ], [],[]];
            var time = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"];
            var process=['工序1','工序2','工序3','工序4'];
            var rework=['光纤头损坏',''];
            var reworkState=['已返修','未返修',''];
            var completeState=['已完成','未完成','']
            return {
                process: process[Math.floor(Math.random() * 4)],
                completeState: completeState[Math.floor(Math.random() * 3)],
                operator: operator[Math.floor(Math.random() * 3)],
                checkData: checkData[Math.floor(Math.random() * 2)],
                rework: rework[Math.floor(Math.random() * 3)],
                reworkState: reworkState[Math.floor(Math.random() * 3)],
                time: time[Math.floor(Math.random() * 3)]
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

