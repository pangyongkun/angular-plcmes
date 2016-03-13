/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('CirculationNumberAssociate')
        .factory('circulationNumberAssociateService', circulationNumberAssociateService);

    circulationNumberAssociateService.$inject = ['$http', '$q', '$timeout'];

    function circulationNumberAssociateService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getCirculationNumberAssociate: getCirculationNumberAssociate,
            deleteCirculationNumberAssociate: deleteCirculationNumberAssociate,
            modifyCirculationNumberAssociate: modifyCirculationNumberAssociate,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getCirculationNumberAssociate(id) {
            var defer = $q.defer();
            $http.get('data/codingManagement/circulationNumberAssociate.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (reason) {
                    defer.resolve(reason);
                });
            return defer.promise;
        }

        function deleteCirculationNumberAssociate(id) {
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

        function modifyCirculationNumberAssociate(circulationNumberAssociate) {
            var defer = $q.defer();
            $http.post('', circulationNumberAssociate)
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
                    circulationNumberAssociates: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var number = "ZTKD1507000";
            var times = [10, 5,6];
            var time = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"];
            var person=['张工','李工','徐工','刘工'];
            return {
                id: id,
                number: number+id,
                JYBath: "12300"+id,
                FANumber: "321313"+id,
                DXBath: "431313"+id,
                person: person[Math.floor(Math.random() * 4)],
                time: time[Math.floor(Math.random() * 3)],
                times: times[Math.floor(Math.random() * 3)],
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
