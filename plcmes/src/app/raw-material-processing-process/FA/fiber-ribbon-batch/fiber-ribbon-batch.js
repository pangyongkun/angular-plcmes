/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.fiber-ribbon-batch', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.fiber-ribbon-batch', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.fiber-ribbon-batch.list', {
                    url: '/fiber-ribbon-batches',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-batch/tpl.fiber-ribbon-batch.list.html',
                    controller: 'RawMaterialFAFiberRibbonBatchListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.fiber-ribbon-batch.add', {
                    url: '/fiber-ribbon-batches/batch',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-batch/tpl.fiber-ribbon-batch.edit.html',
                    controller: 'RawMaterialFAFiberRibbonBatchAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.FA.fiber-ribbon-batch.merge', {
                    url: '/fiber-ribbon-batches/batch/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-batch/tpl.fiber-ribbon-batch.edit.html',
                    controller: 'RawMaterialFAFiberRibbonBatchMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeFiberRibbonBatchPrepService: function (rawMaterialFAFiberRibbonBatchService, $stateParams, progress) {
                            progress.start();
                            return rawMaterialFAFiberRibbonBatchService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();