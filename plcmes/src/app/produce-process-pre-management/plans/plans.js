/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('produce-process-pre-management.plan', ['produce-process-pre-management.plan.order', 'produce-process-pre-management.plan.child-order'])
        .config(function ($stateProvider) {
            $stateProvider.state('produce-process-pre-management.plan', {
                url: '/plans',
                template: '<ui-view/>'
            })
        });
})();