/**
 * Created by jerry on 1/29/16.
 */

/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.stock-out', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.stock-out', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.stock-out.list', {
                    url: '/stock-outs',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-out/tpl.stock-out-list.html',
                    controller: 'FAStockOutListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.stock-out.add', {
                    url: '/stock-outs/stock',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-out/tpl.stock-out-edit.html',
                    controller: 'FAStockOutAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.stock-out.merge', {
                    url: '/stock-outs/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-out/tpl.stock-out-edit.html',
                    controller: 'StockOutMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        FAStockOutPrepService: function (FAStockOutService, $stateParams, progress) {
                            progress.start();
                            return FAStockOutService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
