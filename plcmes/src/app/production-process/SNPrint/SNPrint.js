/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('SNPrint', [])
        .config(function SNPrintRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess.SNPrint', {
                    abstract: true,
                    url: '/SNPrint',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.SNPrint.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/SNPrint/list.tpl.html',
                    controller: 'SNPrintListCtrl',
                    controllerAs: 'vm'
                })
               /* .state('productionProcess.SNPrint.add', {
                    url: '/new',
                    templateUrl: 'app/production-process/SNPrint/edit.tpl.html',
                    controller: 'SNPrintAddCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.SNPrint.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/production-process/SNPrint/edit.tpl.html',
                    controller: 'SNPrintModifyCtrl',
                    controllerAs: 'vm'
                })*/
        });

})()