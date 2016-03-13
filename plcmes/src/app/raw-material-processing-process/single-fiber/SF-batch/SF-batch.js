/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.SF-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.SF-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.SF-batch.list', {
                    url: '/SF-batches',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/SF-batch/tpl.SF-batch.list.html',
                    controller: 'SFBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.SF-batch.add', {
                    url: '/SF-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/SF-batch/tpl.SF-batch.edit.html',
                    controller: 'SFBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.single-fiber.SF-batch.merge', {
                    url: '/SF-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/SF-batch/tpl.SF-batch.edit.html',
                    controller: 'SFBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeSFBatchPrepService: function (SFBatchService, $stateParams, progress) {
                            progress.start();
                            return SFBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();