/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('CirculationNumberAssociate', [])
        .config(function circulationNumberAssociateRoute($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('productionProcess.circulationNumberAssociate', {
                    abstract: true,
                    url: '/circulationNumberAssociate',
                    template: '<ui-view></ui-view>'
                })
                .state('productionProcess.circulationNumberAssociate.list', {
                    url: '/list',
                    templateUrl: 'app/production-process/circulationNumberAssociate/list.tpl.html',
                    controller: 'circulationNumberAssociateListCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.circulationNumberAssociate.add', {
                    url: '/new',
                    templateUrl: 'app/production-process/circulationNumberAssociate/edit.tpl.html',
                    controller: 'circulationNumberAssociateAddCtrl',
                    controllerAs: 'vm'
                })
                .state('productionProcess.circulationNumberAssociate.modify', {
                    url: '/modify/:id',
                    templateUrl: 'app/production-process/circulationNumberAssociate/edit.tpl.html',
                    controller: 'circulationNumberAssociateModifyCtrl',
                    controllerAs: 'vm'
                })
        });

})()

