/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.stock', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.stock', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.stock.list', {
                    url: '/stocks',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock/tpl.stock.list.html',
                    controller: 'SFStockListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.stock.detail', {
                    url: '/stocks/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock/tpl.stock.detail.html',
                    controller: 'SFStockDetailCtrl',
                    controllerAs: 'vm'
                })
        })


})();