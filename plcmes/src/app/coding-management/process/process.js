/**
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('Process', [])
        .config(function processRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('codingManagement', {
                    abstract: true,
                    url: '/codingManagement',
                    template: '<ui-view></ui-view>'
                })
                .state('codingManagement.process', {
                    abstract: true,
                    url: '/process',
                    template: '<ui-view></ui-view>'
                })
                .state('codingManagement.process.list', {
                    url: '/list',
                    templateUrl: 'app/coding-management/process/list.tpl.html',
                    controller: 'processListCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.process.add', {
                    url: '/new',
                    templateUrl: 'app/coding-management/process/edit.tpl.html',
                    controller: 'processAddCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.process.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/coding-management/process/edit.tpl.html',
                    controller: 'processModifyCtrl',
                    controllerAs: 'vm'
                })
        });

})()
