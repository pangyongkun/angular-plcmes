/**
 * Created by jerry on 1/29/16.
 */

/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.stock-in', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.stock-in', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.stock-in.list', {
                    url: '/stock-ins',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-in/tpl.stock-in-list.html',
                    controller: 'SFStockInListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.stock-in.add', {
                    url: '/stock-ins/stock',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-in/tpl.stock-in-edit.html',
                    controller: 'SFStockInAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.stock-in.merge', {
                    url: '/stock-ins/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-in/tpl.stock-in-edit.html',
                    controller: 'SFStockInMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        SFStockInPrepService: function (SFStockInService, $stateParams, progress) {
                            progress.start();
                            return SFStockInService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
