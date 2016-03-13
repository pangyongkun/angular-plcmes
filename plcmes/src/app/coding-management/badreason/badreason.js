/**
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('BadReason', [])
        .config(function badReasonRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('codingManagement.badReason', {
                    abstract: true,
                    url: '/badReason',
                    template: '<ui-view></ui-view>'
                })
                .state('codingManagement.badReason.list', {
                    url: '/list',
                    templateUrl: 'app/coding-management/badreason/list.tpl.html',
                    controller: 'badReasonListCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.badReason.add', {
                    url: '/new',
                    templateUrl: 'app/coding-management/badreason/edit.tpl.html',
                    controller: 'badReasonAddCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.badReason.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/coding-management/badreason/edit.tpl.html',
                    controller: 'badReasonModifyCtrl',
                    controllerAs: 'vm'
                })
        });

})()

