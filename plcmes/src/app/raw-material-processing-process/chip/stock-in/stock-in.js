/**
 * Created by jerry on 1/29/16.
 */

/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip.stock-in', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.chip.stock-in', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.chip.stock-in.list', {
                    url: '/stock-ins',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-in/tpl.stock-in-list.html',
                    controller: 'ChipStockInListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.stock-in.add', {
                    url: '/stock-ins/stock',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-in/tpl.stock-in-edit.html',
                    controller: 'ChipStockInAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.stock-in.merge', {
                    url: '/stock-ins/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/chip/stock-in/tpl.stock-in-edit.html',
                    controller: 'ChipStockInMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        ChipStockInPrepService: function (ChipStockInService, $stateParams, progress) {
                            progress.start();
                            return ChipStockInService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
