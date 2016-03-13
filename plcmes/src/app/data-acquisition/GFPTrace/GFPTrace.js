/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('GFPTrace',[])
        .config(function GFPTraceRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('dataAcquisition.GFPTrace', {
                    abstract: true,
                    url: '/GFPTrace',
                    template: '<ui-view></ui-view>'
                })
                .state('dataAcquisition.GFPTrace.list', {
                    url: '/list',
                    templateUrl: 'app/data-acquisition/GFPTrace/list.html',
                    controller:'GFPTraceCtrl',
                    controllerAs:'vm'
                })

        });
})()
