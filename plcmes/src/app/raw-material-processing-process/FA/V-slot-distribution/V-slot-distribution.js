/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.V-slot-distribution', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.V-slot-distribution', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.V-slot-distribution.list', {
                    url: '/V-slot-distributions',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-distribution/tpl.V-slot-distribution.list.html',
                    controller: 'VSlotDistributionListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.V-slot-distribution.add', {
                    url: '/V-slot-distributions/distribution',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-distribution/tpl.V-slot-distribution.edit.html',
                    controller: 'VSlotDistributionAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.FA.V-slot-distribution.merge', {
                    url: '/V-slot-distributions/distribution/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/V-slot-distribution/tpl.V-slot-distribution.edit.html',
                    controller: 'VSlotDistributionMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeVSlotDistributionPrepService: function (VSlotDistributionService, $stateParams, progress) {
                            progress.start();
                            return VSlotDistributionService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();