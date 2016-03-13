/**
 * Created by jerry on 1/30/16.
 */
(function () {
    'use strict';
    angular.module('produce-process-pre-management', ['produce-process-pre-management.plan'])
        .config(function ($stateProvider) {
            $stateProvider.state('produce-process-pre-management', {
                url: '/produce-process-pre-management',
                template: '<ui-view/>'
            })
        });
})();