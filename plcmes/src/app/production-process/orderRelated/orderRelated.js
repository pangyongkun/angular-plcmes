/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('OrderRelated', [])
        .config(function orderRelatedRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess.orderRelated', {
                    abstract: true,
                    url: '/orderRelated',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.orderRelated.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/orderRelated/list.tpl.html',
                    controller: 'orderRelatedListCtrl',
                    controllerAs: 'vm'
                })
        });

})()

