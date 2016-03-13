/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip.wafer-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.chip.wafer-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.chip.wafer-batch.list', {
                    url: '/wafer-batches',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-batch/tpl.wafer-batch.list.html',
                    controller: 'ChipWaferBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.wafer-batch.add', {
                    url: '/wafer-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-batch/tpl.wafer-batch.edit.html',
                    controller: 'ChipWaferBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.chip.wafer-batch.merge', {
                    url: '/wafer-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-batch/tpl.wafer-batch.edit.html',
                    controller: 'ChipWaferBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeChipWaferBatchPrepService: function (ChipWaferBatchService, $stateParams, progress) {
                            progress.start();
                            return ChipWaferBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();