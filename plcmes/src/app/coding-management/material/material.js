/**
 * Created by kun on 2016/1/29.
 */

(function(){
    'use strict';
    angular.module('Material',[])
        .config(function materialRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('codingManagement.material', {
                    abstract: true,
                    url: '/material',
                    template: '<ui-view></ui-view>'
                })
                .state('codingManagement.material.list', {
                    url: '/list',
                    templateUrl: 'app/coding-management/material/list.tpl.html',
                    controller: 'materialListCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.material.add', {
                    url: '/new',
                    templateUrl: 'app/coding-management/material/edit.tpl.html',
                    controller: 'materialAddCtrl',
                    controllerAs: 'vm'
                })
                .state('codingManagement.material.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/coding-management/material/edit.tpl.html',
                    controller: 'materialModifyCtrl',
                    controllerAs: 'vm'
                })
        });
})()
