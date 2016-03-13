/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('CirculationNumber', [])
        .config(function circulationNumberRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess',{
                    abstract:true,
                    url:'/productionProcess',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.circulationNumber', {
                    abstract: true,
                    url: '/circulationNumber',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.circulationNumber.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/circulationNumber/list.tpl.html',
                    controller: 'circulationNumberListCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.circulationNumber.add', {
                    url: '/new',
                    templateUrl: 'app/production-process/circulationNumber/edit.tpl.html',
                    controller: 'circulationNumberAddCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.circulationNumber.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/production-process/circulationNumber/edit.tpl.html',
                    controller: 'circulationNumberModifyCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.circulationNumber.print', {
                    url: '/print/:id',
                    templateUrl: 'app/production-process/circulationNumber/edit.tpl.html',
                    controller: 'circulationNumberPrintCtrl',
                    controllerAs: 'vm'
                })

        });

})()

