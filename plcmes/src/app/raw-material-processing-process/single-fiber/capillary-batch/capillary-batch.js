/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.capillary-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.capillary-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.capillary-batch.list', {
                    url: '/capillary-batches',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/capillary-batch/tpl.capillary-batch.list.html',
                    controller: 'SFCapillaryBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.capillary-batch.add', {
                    url: '/capillary-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/capillary-batch/tpl.capillary-batch.edit.html',
                    controller: 'SFCapillaryBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.single-fiber.capillary-batch.merge', {
                    url: '/capillary-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/capillary-batch/tpl.capillary-batch.edit.html',
                    controller: 'SFCapillaryBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeSFCapillaryBatchPrepService: function (SFCapillaryBatchService, $stateParams, progress) {
                            progress.start();
                            return SFCapillaryBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();