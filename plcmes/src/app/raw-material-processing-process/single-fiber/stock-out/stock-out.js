/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.stock-out', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.stock-out', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.stock-out.list', {
                    url: '/stock-outs',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-out/tpl.stock-out-list.html',
                    controller: 'SFStockOutListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.stock-out.add', {
                    url: '/stock-outs/stock',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-out/tpl.stock-out-edit.html',
                    controller: 'SFStockOutAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.stock-out.merge', {
                    url: '/stock-outs/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/stock-out/tpl.stock-out-edit.html',
                    controller: 'SFStockOutMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        SFStockOutPrepService: function (SFStockOutService, $stateParams, progress) {
                            progress.start();
                            return SFStockOutService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
