/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('Order', [])
        .config(function orderRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess.productionDataManage.order', {
                    abstract: true,
                    url: '/order',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.productionDataManage.order.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/productionDataManage/order/list.html',
                    controller: 'orderQueryCtrl',
                    controllerAs: 'vm'
                })
        });

})()