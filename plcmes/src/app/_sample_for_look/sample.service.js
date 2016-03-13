/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('sample')
        .factory('SampleService', sampleService);

    sampleService.$inject = ['$q', '$timeout'];
    function sampleService($q, $timeout) {
        //for test
        var randomsItems = [];

        //列表页现场参数
        var lastStateParams = '';

        for (var i = 0; i < 1000; i++) {
            randomsItems.push(createRandomItem(i));
        }


        var service = {
            getPage: getPage,
            deleteOne: deleteOne,
            save: save,
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
            getDestinationProvince: getDestinationProvince,
            getDestinationCity: getDestinationCity,
            getDestinationDistrict: getDestinationDistrict,
            back: back
        };
        return service;

        /////////////////////////////////////

        function back() {
            $state.go('basic-setting.roles.list');
        }


        function getDestinationProvince() {
            var deferred = $q.defer();
            var data = [
                {name: '江苏'},
                {name: '浙江'}
            ];
            $timeout(function () {
                deferred.resolve(data)
            }, 500);

            return deferred.promise;
        }

        function getDestinationCity(province) {
            var deferred = $q.defer();
            var data = {
                    '江苏': [
                        {name: '南京'},
                        {name: '常州'},
                        {name: '镇江'},
                        {name: '南通'}]
                    ,
                    '浙江': [
                        {name: '杭州'},
                        {name: '温州'}
                    ]

                }
                ;

            $timeout(function () {
                deferred.resolve(data[province])
            }, 500);

            return deferred.promise;
        }


        function getDestinationDistrict(city) {
            var deferred = $q.defer();
            var data = {
                '南京': [
                    {name: '栖霞区'},
                    {name: '玄武区'},
                    {name: '鼓楼区'},
                    {name: '秦淮区'}
                ],
                '常州': [
                    {name: '钟楼区'},
                    {name: '武进区'},
                    {name: '新北区'},
                    {name: '戚墅堰'}
                ],
                '温州': [
                    {name: '温州区'},
                    {name: '大区'},
                ]
            };
            $timeout(function () {
                deferred.resolve(data[city])
            }, 500);

            return deferred.promise;
        }


        function getLastStateParams() {
            return lastStateParams;
        }

        function setLastStateParams(stateParams) {
            lastStateParams = stateParams
        }


        function deleteOne(userID) {
            var deferred = $q.defer();
            randomsItems.splice(userID, 1);
            $timeout(
                function () {
                    deferred.resolve(function () {

                    });
                }
                , 1500);

            return deferred.promise;
        }

        function save(role) {
            randomsItems.push(createRandomItem(1011));
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function getPage(targetPage, pageSize, params) {

            var deferred = $q.defer();

            var start = (targetPage - 1) * pageSize;
            start = start <= 0 ? 0 : start;

            var result = randomsItems.slice(start, start + pageSize);

            $timeout(function () {
                //note, the server passes the information about the data set size
                deferred.resolve({
                    users: result,
                    totalItems: randomsItems.length
                })

            }, 1500);


            return deferred.promise;
        }

        function createRandomItem(id) {
            var username = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
            var realName = ['王老板', '李老板', '张老板', '向老板', '于员工'];
            var role = ['超级管理员', '一般管理员', '高级管理员', '日常管理员'];
            var phones = ['1823332344', '123445552', '22234568', '1728344331'];
            return {
                id: id,
                username: username[Math.floor(Math.random() * 7)],
                realName: realName[Math.floor(Math.random() * 5)],
                role: role[Math.floor(Math.random() * 4)],
                phone: phones[Math.floor(Math.random() * 4)]
            };

        }


    }

})();