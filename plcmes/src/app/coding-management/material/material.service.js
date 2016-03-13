/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('Material')
        .factory('materialService', materialService);

    materialService.$inject = ['$http', '$q', '$timeout'];

    function materialService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getMaterial: getMaterial,
            deleteMaterial: deleteMaterial,
            modifyMaterial: modifyMaterial,
            addMaterial:addMaterial,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getMaterial(id) {
            var defer = $q.defer();
            var data=randomsItems[id];
            defer.resolve(data);
            return defer.promise;
        }
        function addMaterial(material){
            var defer = $q.defer();
            material.id=randomsItems.length+1;
            randomsItems.push(material);
            $timeout(function(){
                defer.resolve({})
            },1000)
            return defer.promise;
        }
        function deleteMaterial(id) {
            var defer = $q.defer();
            randomsItems.splice(id,1);
            $timeout(function(){
                defer.resolve({})
            },1000)
            return defer.promise;
        }

        function modifyMaterial(material) {
            var defer = $q.defer();
            randomsItems[material.id]=material;
            $timeout(function(){
                defer.resolve({})
            },1000)
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
                    materials: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var name = ['晶圆', '芯片', 'V槽'];
            var pattern = ['1分12', '1分8', '1分4'];
            var unit = ['个', '只'];
            var time = ["2015-8-10 12:00:00", "2013-8-10 12:00:00", "2014-8-10 15:00:00"]
            return {
                id: id,
                code: "100" + id,
                name: name[Math.floor(Math.random() * 3)],
                pattern: pattern[Math.floor(Math.random() * 3)],
                unit: unit[Math.floor(Math.random() * 2)],
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

