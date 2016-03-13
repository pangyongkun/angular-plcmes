/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.bare-fiber-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.single-fiber.bare-fiber-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.single-fiber.bare-fiber-batch.list', {
                    url: '/bare-fiber-batches',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/bare-fiber-batch/tpl.bare-fiber-batch.list.html',
                    controller: 'SFBareFiberBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.single-fiber.bare-fiber-batch.add', {
                    url: '/bare-fiber-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/bare-fiber-batch/tpl.bare-fiber-batch.edit.html',
                    controller: 'SFBareFiberBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.single-fiber.bare-fiber-batch.merge', {
                    url: '/bare-fiber-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/single-fiber/bare-fiber-batch/tpl.bare-fiber-batch.edit.html',
                    controller: 'SFBareFiberBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeSFBareFiberBatchPrepService: function (SFBareFiberBatchService, $stateParams, progress) {
                            progress.start();
                            return SFBareFiberBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();