/**
 * Created by kun on 2016/1/30.
 */
(function () {
    'use strict';
    angular.module('Process')
        .factory('processService', processService);

    processService.$inject = ['$http', '$q', '$timeout'];

    function processService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }

        var service = {
            getProcess: getProcess,
            deleteProcess: deleteProcess,
            modifyProcess: modifyProcess,
            addProcess:addProcess,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;

        function getProcess(id) {
            var defer = $q.defer();
            var process=randomsItems[id];;
            defer.resolve(process);
            return defer.promise;
        }

        function deleteProcess(id) {
            var defer = $q.defer();
            randomsItems.splice(id,1);
            $timeout(function(){

                defer.resolve({})
            },1000)
            return defer.promise;
        }

        function modifyProcess(process) {
            var defer = $q.defer();
            randomsItems[process.id]=process;
            $timeout(function(){
                defer.resolve({})
            },1000)
            return defer.promise;
        }
        function addProcess(process){
            var defer = $q.defer();
            process['id']=randomsItems.length+1;
            randomsItems.push(process);
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
                    processes: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var name = ['晶圆凝胶', '晶圆清晰'];
            var group = ["A组-芯片FA", "B组-芯片FA"];
            var code = ['A', 'B'];
            return {
                id: id,
                name: name[Math.floor(Math.random() * 2)],
                group: group[Math.floor(Math.random() * 2)],
                code: code[Math.floor(Math.random() * 2)]+id,
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
