/**
 * Created by kun on 2016/1/30.
 */
(function () {
    'use strict';
    angular.module('BadReason')
        .factory('badReasonService', badReasonService);

    badReasonService.$inject = ['$http', '$q', '$timeout'];

    function badReasonService($http, $q, $timeout) {

        var randomsItems = [];      //存放数据
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {                //生成1000条模拟数据
            randomsItems.push(createRandomItem(i));
        }
        ///////////////////////////////////////////////////////////////////////返回的服务
        var service = {
            getBadReason: getBadReason,
            deleteBadReason: deleteBadReason,
            modifyBadReason: modifyBadReason,
            addBadReason:addBadReason,
            getPage: getPage,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
        }
        return service;
        ////////////////////////////////////////////////////////////////////////功能函数实现


        function getBadReason(id) {
            var defer = $q.defer();
            var data=randomsItems[id];
            defer.resolve(data);
            return defer.promise;
        }
        function addBadReason(badReason){
            var defer = $q.defer();
            badReason.id=randomsItems.length+1;
            randomsItems.push(badReason);
            $timeout(function(){
                defer.resolve({})
            },1000)
            return defer.promise;
        }
        function deleteBadReason(id) {
            var defer = $q.defer();
            randomsItems.splice(id,1);
            $timeout(function(){
                defer.resolve({})
            },1000)
            return defer.promise;
        }

        function modifyBadReason(badReason) {
            var defer = $q.defer();
            randomsItems[badReason.id]=badReason;
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
                    badReasons: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var process = ['半成品测试', '成品测试'];
            var name = ['FA不良', '连接头研磨不到位'];
            var count = ['不计', '计'];
            return {
                id: id,
                process: process[Math.floor(Math.random() * 2)],
                name: name[Math.floor(Math.random() * 2)],
                code:"00"+id,
                count: count[Math.floor(Math.random() * 2)],
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
