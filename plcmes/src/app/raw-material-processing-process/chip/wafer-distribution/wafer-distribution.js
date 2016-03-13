/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip.wafer-distribution', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.chip.wafer-distribution', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.chip.wafer-distribution.list', {
                    url: '/wafer-distributions',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-distribution/tpl.wafer-distribution.list.html',
                    controller: 'ChipWaferDistributionListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.chip.wafer-distribution.add', {
                    url: '/wafer-distributions/distribution',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-distribution/tpl.wafer-distribution.edit.html',
                    controller: 'ChipWaferDistributionAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.chip.wafer-distribution.merge', {
                    url: '/wafer-distributions/distribution/:id',
                    templateUrl: 'app/raw-material-processing-process/chip/wafer-distribution/tpl.wafer-distribution.edit.html',
                    controller: 'ChipWaferDistributionMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeChipWaferDistributionPrepService: function (ChipWaferDistributionService, $stateParams, progress) {
                            progress.start();
                            return ChipWaferDistributionService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();