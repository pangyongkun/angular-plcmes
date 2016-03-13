/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip.stock', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.chip.stock', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.chip.stock.list', {
                    url: '/stocks',
                    templateUrl: 'app/raw-material-processing-process/chip/stock/tpl.stock.list.html',
                    controller: 'ChipStockListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.stock.detail', {
                    url: '/stocks/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/chip/stock/tpl.stock.detail.html',
                    controller: 'ChipStockDetailCtrl',
                    controllerAs: 'vm'
                })
        })


})();