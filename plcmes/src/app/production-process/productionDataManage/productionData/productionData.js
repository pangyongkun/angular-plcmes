/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('ProductionData', [])
        .config(function productionDataRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess.productionDataManage', {
                    abstract: true,
                    url: '/productionDataManage',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.productionDataManage.productionData', {
                    abstract: true,
                    url: '/productionData',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.productionDataManage.productionData.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/productionDataManage/productionData/list.html',
                    controller: 'productionDataQueryCtrl',
                    controllerAs: 'vm'
                })
        });

})()