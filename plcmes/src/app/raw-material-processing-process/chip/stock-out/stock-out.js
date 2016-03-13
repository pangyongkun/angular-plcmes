/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip.stock-out', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.chip.stock-out', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.chip.stock-out.list', {
                    url: '/stock-outs',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-out/tpl.stock-out-list.html',
                    controller: 'ChipStockOutListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.stock-out.add', {
                    url: '/stock-outs/stock',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-out/tpl.stock-out-edit.html',
                    controller: 'ChipStockOutAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.stock-out.merge', {
                    url: '/stock-outs/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-out/tpl.stock-out-edit.html',
                    controller: 'ChipStockOutMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        ChipStockOutPrepService: function (ChipStockOutService, $stateParams, progress) {
                            progress.start();
                            return ChipStockOutService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
