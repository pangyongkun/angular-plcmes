/**
 * Created by jerry on 1/29/16.
 */
(function () {
    "use strict";
    angular.module('basic-setting.user')
        .factory('basicSettingUsersService', UsersService);

    UsersService.$inject = ['$http', '$q', 'Restangular', '$timeout', '$state', '$stateParams'];


    function UsersService($http, $q, Restangular, $timeout, $state) {
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
            var lastStateParams = service.getLastStateParams() ? service.getLastStateParams() : '';
            $state.go('basic-setting.user.list', lastStateParams);
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
            $timeout(function () {
                deferred
                    .resolve({});
            }, 1500);
            return deferred.promise;
        }


        function save(user) {
            user.id = ++total;
            randomsItems.push(user);
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);

            return deferred.promise;
        }

        function merge(user) {
            randomsItems[user.id] = user;
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({});
            }, 1500);
            return deferred.promise;
        }


        function queryById(id) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({
                    user: randomsItems[id]
                });
            }, 1500);
            return deferred.promise;
        }


        function paginationQuery(targetPage, pageItemsNum, params) {
            var deferred = $q.defer();
            //test
            var start = (targetPage - 1) * pageItemsNum < 0 ? 0 : (targetPage - 1) * pageItemsNum;
            var end = targetPage * pageItemsNum > (randomsItems.length) ? (randomsItems.length ) : targetPage * pageItemsNum;

            var users = randomsItems.slice(start, end);

            $timeout(function () {
                deferred.resolve({
                    users: users,
                    totalNumber: randomsItems.length
                });
            }, 1500);
            return deferred.promise;
        }

        function createRandomItem(id) {
            var realNames = ['张工', '李工', '于工', '易工'];
            var usernames = ['user1', 'user2', 'user3', 'user4'];
            var ages = [12, 2, 23, 55];
            var roles = ['超级管理员', '一般管理员', '管理员', '高级管理员'];
            var passwords = ['110wss', '122ddd', 'wwdodd', 'password'];
            var phones = ['18752930081', '13899078906', '15678902213', '13908263221'];
            var randomNum = Math.floor((Math.random() * 4));
            return {
                id: id,
                username: usernames[randomNum],
                realName: realNames[randomNum],
                age: ages[randomNum],
                gender: 'male',
                role: roles[randomNum],
                password: passwords[randomNum],
                phone: phones[randomNum]

            }
        }


    }
})();