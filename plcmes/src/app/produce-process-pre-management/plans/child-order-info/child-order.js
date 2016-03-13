/**
 * Created by jerry on 1/30/16.
 */
(function () {
    'use strict';
    angular.module('produce-process-pre-management.plan.child-order', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('produce-process-pre-management.plan.child-order', {
                    template: '<ui-view/>'
                })
                .state('produce-process-pre-management.plan.child-order.list', {
                    url: '/child-orders',
                    templateUrl: 'app/produce-process-pre-management/plans/child-order-info/tpl.child-order.list.html',
                    controller: 'prePlanChildOrderListCtrl',
                    controllerAs: 'vm'
                })
                .state('produce-process-pre-management.plan.child-order.add', {
                    url: '/child-orders/child-order',
                    templateUrl: 'app/produce-process-pre-management/plans/child-order-info/tpl.child-order.edit.html',
                    controller: 'prePlanChildOrderAddCtrl',
                    controllerAs: 'vm'
                })
                .state('produce-process-pre-management.plan.child-order.merge', {
                    url: '/child-orders/child-order/:id',
                    templateUrl: 'app/produce-process-pre-management/plans/child-order-info/tpl.child-order.edit.html',
                    controller: 'prePlanChildOrderMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeChildOrderPrepService: function (PrePlanChildOrderService, $stateParams, progress) {
                            progress.start();
                            return PrePlanChildOrderService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                });
        });
})();