/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.chip', [
            'raw-material-processing.chip.wafer-batch',
            'raw-material-processing.chip.wafer-distribution',
            'raw-material-processing.chip.stock',
            'raw-material-processing.chip.stock-in',
            'raw-material-processing.chip.stock-out'
        ])
        .config(function ($stateProvider) {
            $stateProvider.state('raw-material-processing.chip', {
                url: '/chip',
                template: '<ui-view/>'
            });
        });
})();