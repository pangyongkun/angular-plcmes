/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('AcquisitionManage')
        .factory('acquisitionManageService', acquisitionManageService);

    acquisitionManageService.$inject = ['$http', '$q', '$timeout'];

    function acquisitionManageService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getAcquisitionManage: getAcquisitionManage,
            deleteAcquisitionManage: deleteAcquisitionManage,
            modifyAcquisitionManage: modifyAcquisitionManage,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getAcquisitionManage(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/acquisitionManage.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteAcquisitionManage(id) {
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

        function modifyAcquisitionManage(acquisitionManage) {
            var defer = $q.defer();
            $http.post('', acquisitionManage)
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
                    acquisitionManages: result,
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
            ], []];
            var time = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"];
            var process=['做盒','半成品检测','成品检测','穿纤'];
            var rework=['光纤头损坏',''];
            var reworkState=['已返修','未返修','']
            return {
                id: id,
                time: time[Math.floor(Math.random() * 3)],
                GXNumber: "ZTKD54" + Math.random() * 100,
                operator: operator[Math.floor(Math.random() * 3)],
                process: process[Math.floor(Math.random() * 4)],
                checkData: checkData[Math.floor(Math.random()*2)],
                "rework": rework[Math.floor(Math.random()*2)],
                "reworkState": reworkState[Math.floor(Math.random()*3)]
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
