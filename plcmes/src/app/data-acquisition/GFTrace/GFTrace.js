/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('GFTrace',[])
        .config(function GFTraceRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('dataAcquisition.GFTrace', {
                    abstract: true,
                    url: '/GFTrace',
                    template: '<ui-view></ui-view>'
                })
                .state('dataAcquisition.GFTrace.list', {
                    url: '/list',
                    templateUrl: 'app/data-acquisition/GFTrace/list.html',
                    controller: 'GFTraceCtrl',
                    controllerAs: 'vm'
                })

        });
})()
