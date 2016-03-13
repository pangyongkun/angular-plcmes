/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('AcquisitionManage',[])
        .config(function processRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('dataAcquisition', {
                    abstract: true,
                    url: '/dataAcquisition',
                    template: '<ui-view></ui-view>'
                })
                .state('dataAcquisition.acquisitionManage', {
                    abstract: true,
                    url: '/acquisitionManage',
                    template: '<ui-view></ui-view>'
                })
                .state('dataAcquisition.acquisitionManage.list', {
                    url: '/list',
                    templateUrl: 'app/data-acquisition/acquisitionManage/list.html',
                    controller: 'acquisitionManageCtrl',
                    controllerAs: 'vm'
                })

        });
})()
