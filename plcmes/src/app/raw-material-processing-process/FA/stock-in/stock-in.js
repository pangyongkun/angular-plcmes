/**
 * Created by jerry on 1/29/16.
 */

/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA.stock-in', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('raw-material-processing.FA.stock-in', {
                    template: '<ui-view/>'
                })
                .state('raw-material-processing.FA.stock-in.list', {
                    url: '/stock-ins',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-in/tpl.stock-in-list.html',
                    controller: 'FAStockInListCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.stock-in.add', {
                    url: '/stock-ins/stock',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-in/tpl.stock-in-edit.html',
                    controller: 'FAStockInAddCtrl',
                    controllerAs: 'vm'
                })
                .state('raw-material-processing.FA.stock-in.merge', {
                    url: '/stock-ins/stock/:id',
                    templateUrl: 'app/raw-material-processing-process/FA/stock-in/tpl.stock-in-edit.html',
                    controller: 'FAStockInMergeCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        FAStockInPrepService: function (FAStockInService, $stateParams, progress) {
                            progress.start();
                            return FAStockInService.queryById($stateParams.id).then(function (result) {
                                progress.stop();
                                return result
                            });
                        }
                    }
                })
        })


})();
