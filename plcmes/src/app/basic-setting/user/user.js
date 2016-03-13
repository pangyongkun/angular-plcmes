/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('basic-setting.user', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('basic-setting.user', {
                    template: '<ui-view/>'
                })
                .state('basic-setting.user.list', {
                    url: '/users',
                    templateUrl: 'app/basic-setting/user/tpl.user.list.html',
                    controller: 'BasicSettingUserListCtrl',
                    controllerAs: 'vm'
                })
                .state('basic-setting.user.add', {
                    url: '/users/new',
                    templateUrl: 'app/basic-setting/user/tpl.user.edit.html',
                    controller: 'BasicSettingUserAddCtrl',
                    controllerAs: 'vm'

                })
                .state('basic-setting.user.merge', {
                    url: '/users/:id',
                    templateUrl: 'app/basic-setting/user/tpl.user.edit.html',
                    controller: 'BasicSettingUserMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeUserPrepService: function (basicSettingUsersService, $stateParams, progress) {
                            progress.start();
                            return basicSettingUsersService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        });
})();