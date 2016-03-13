/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('produce-process-pre-management.plan.order', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('produce-process-pre-management.plan.order', {
                    template: '<ui-view/>'
                })
                .state('produce-process-pre-management.plan.order.list', {
                    url: '/orders',
                    templateUrl: 'app/produce-process-pre-management/plans/orders-info/tpl.orders.list.html',
                    controller: 'prePlanOrderListCtrl',
                    controllerAs: 'vm'
                })
                .state('produce-process-pre-management.plan.order.add', {
                    url: '/orders/order',
                    templateUrl: 'app/produce-process-pre-management/plans/orders-info/tpl.orders.edit.html',
                    controller: 'prePlanOrderAddCtrl',
                    controllerAs: 'vm'
                })
                .state('produce-process-pre-management.plan.order.merge', {
                    url: '/orders/order/:id',
                    templateUrl: 'app/produce-process-pre-management/plans/orders-info/tpl.orders.edit.html',
                    controller: 'prePlanOrderMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeOrderPrepService: function (PrePlanOrderService, $stateParams, progress) {
                            progress.start();
                            return PrePlanOrderService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                });
        });
})();