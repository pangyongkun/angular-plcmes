/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.stock', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.stock', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.stock.list', {
                    url: '/stocks',
                    templateUrl: 'app/raw-material-processing-process/FA/stock/tpl.stock.list.html',
                    controller: 'FAStockListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.stock.detail', {
                    url: '/stocks/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/stock/tpl.stock.detail.html',
                    controller: 'FAStockDetailCtrl',
                    controllerAs: 'vm'
                })
        })


})();