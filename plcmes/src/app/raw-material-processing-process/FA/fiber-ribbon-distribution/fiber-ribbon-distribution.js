/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.fiber-ribbon-distribution', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.fiber-ribbon-distribution', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.fiber-ribbon-distribution.list', {
                    url: '/fiber-ribbon-distributions',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-distribution/tpl.fiber-ribbon-distribution.list.html',
                    controller: 'FiberRibbonDistributionListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.fiber-ribbon-distribution.add', {
                    url: '/fiber-ribbon-distributions/distribution',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-distribution/tpl.fiber-ribbon-distribution.edit.html',
                    controller: 'FiberRibbonDistributionAddCtrl',
                    controllerAs: 'vm'

                })
                .state('raw-material-processing.FA.fiber-ribbon-distribution.merge', {
                    url: '/fiber-ribbon-distributions/distribution/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/fiber-ribbon-distribution/tpl.fiber-ribbon-distribution.edit.html',
                    controller: 'FiberRibbonDistributionMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mergeFiberRibbonDistributionPrepService: function (basicSettingFiberRibbonDistributionsService, $stateParams, progress) {
                            progress.start();
                            return basicSettingFiberRibbonDistributionsService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })


        })

})();