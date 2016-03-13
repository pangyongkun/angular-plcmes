/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.V-slot-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.V-slot-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.V-slot-batch.list', {
                    url: '/V-slot-batches',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-batch/tpl.V-slot-batch.list.html',
                    controller: 'RawMaterialProcessingFAVSlotBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.V-slot-batch.add', {
                    url: '/V-slot-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-batch/tpl.V-slot-batch.edit.html',
                    controller: 'RawMaterialProcessingFAVSlotBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.FA.V-slot-batch.merge', {
                    url: '/V-slot-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-batch/tpl.V-slot-batch.edit.html',
                    controller: 'RawMaterialProcessingFAVSlotBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeVSlotBatchPrepService: function (rawMaterialProcessingFAVSlotBatchService, $stateParams, progress) {
                            progress.start();
                            return rawMaterialProcessingFAVSlotBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();