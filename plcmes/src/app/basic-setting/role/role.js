/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('basic-setting.role', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('basic-setting.role', {
                    template: '<ui-view/>'
                })
                .state('basic-setting.role.list', {
                    url: '/roles',
                    templateUrl: 'app/basic-setting/role/list.tpl.html',
                    controller: 'BasicSettingRoleListCtrl',
                    controllerAs: 'vm'
                })
                .state('basic-setting.role.add', {
                    url: '/roles/new',
                    templateUrl: 'app/basic-setting/role/edit.tpl.html',
                    controller: 'BasicSettingRoleAddCtrl',
                    controllerAs: 'vm'

                })
                .state('basic-setting.role.merge', {
                    url: '/role/:id',
                    templateUrl: 'app/basic-setting/role/edit.tpl.html',
                    controller: 'BasicSettingRoleMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeRolePrepService: function (basicSettingRolesService, $stateParams, progress) {
                            progress.start();
                            return basicSettingRolesService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();