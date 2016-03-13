/**
 * Created by kun on 2016/1/31.
 */
(function () {
    'use strict';
    angular.module('_CirculationNumber', [])
        .config(function _circulationNumberRoute($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('productionProcess.productionDataManage.circulationNumber', {
                    abstract: true,
                    url: '/circulationNumber',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.productionDataManage.circulationNumber.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/productionDataManage/circulationNumber/list.html',
                    controller: '_circulationNumberCtrl',
                    controllerAs: 'vm'
                })
        });

})()