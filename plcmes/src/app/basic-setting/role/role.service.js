(function () {
    "use strict";
    angular.module('basic-setting.role')
        .factory('basicSettingRolesService', RolesService);

    RolesService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function RolesService($http, $q, Restangular, $timeout, $state) {
        var randomsItems = [];
        var lastStateParams = '';
        var total = 666;
        for (var i = 0; i < 666; i++) {
            randomsItems.push(createRandomItem(i));
        }


        var service = {
            getLastStateParams: getLastStateParams,
            setLastStateParams: setLastStateParams,
            queryById: queryById,
            paginationQuery: paginationQuery,
            deleteOne: deleteOne,
            save: save,
            merge: merge,
            back: back
        };
        return service;


        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        function back() {
            $state.go('basic-setting.role.list');
        }

        function getLastStateParams() {
            return lastStateParams;
        }

        function setLastStateParams(stateParams) {
            lastStateParams = stateParams
        }

        function deleteOne(userID) {
            var deferred = $q.defer();

            $http({
                    url: '/basic-setting/roles/' + userID,
                    method: 'delete'
                }
            ).then(function (resp) {
                deferred.resolve(resp.data);
            }, function () {
                deferred.reject('网络请求失败');
            });
            return deferred.promise;
        }


        function save(role) {
            var deferred = $q.defer();
            $http({
                    url: '/basic-setting/roles',
                    method: 'post',
                    data: {
                        role: role
                    }
                }
            ).then(function (resp) {
                deferred.resolve(resp.data);
            }, function () {
                deferred.reject('网络请求失败');
            });

            return deferred.promise;
        }

        function merge(role) {
            var deferred = $q.defer();
            $http({
                    url: '/basic-setting/roles/' + role.id,
                    method: 'put',
                    data: {
                        role: role
                    }
                }
            ).then(function (resp) {
                deferred.resolve(resp.data);
            }, function () {
                deferred.reject('网络请求失败');
            });
            return deferred.promise;
        }


        function queryById(id) {
            var deferred = $q.defer();

            $http({
                    url: '/basic-setting/roles/' + id,
                    method: 'GET'
                }
            ).then(function (resp) {
                deferred.resolve(resp.data);
            }, function () {
                deferred.reject('网络请求失败');
            });
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            $http({
                    url: '/basic-setting/roles',
                    method: 'GET',
                    params: {
                        page: targetPage,
                        pageItems: pageItemsNum
                    }
                }
            ).then(function (resp) {
                deferred.resolve(resp.data);
            }, function () {
                deferred.reject('网络请求失败');
            });
            return deferred.promise;
        }


        function createRandomItem(id) {
            var names = ['超级管理员', '一般管理员', '管理员', '高级管理员'];
            var descriptions = ['管理超级的人员', '管理一般员工', '管理管理员的管理员', '高级管理的管理管理员'];

            var permissions = [[
                "系统基本设置",
                "系统编码管理",
                "生产准备流程管理",
                "原材料加工流程",
                "生产流程管理",
                "生产数据采集管理",
                "数据统计分析管理"],
                ["原材料加工流程",
                    "生产流程管理",
                    "生产数据采集管理",
                    "数据统计分析管理"],
                ["生产流程管理",
                    "生产数据采集管理",
                    "数据统计分析管理"],
                ["原材料加工流程"]
            ]


            var randomNum = Math.floor((Math.random() * 4));
            return {
                id: id,
                name: names[randomNum],
                description: descriptions[randomNum],
                permissions: permissions[randomNum],
            }
        }


    }
})();