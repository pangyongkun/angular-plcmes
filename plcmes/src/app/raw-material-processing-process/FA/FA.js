/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing.FA', [
            'raw-material-processing.FA.V-slot-batch',
            'raw-material-processing.FA.V-slot-distribution',
            'raw-material-processing.FA.fiber-ribbon-batch',
            'raw-material-processing.FA.fiber-ribbon-distribution',
            'raw-material-processing.FA.stock',
            'raw-material-processing.FA.stock-in',
            'raw-material-processing.FA.stock-out'
        ])
        .config(function ($stateProvider) {
            $stateProvider.state('raw-material-processing.FA', {
                url: '/FA',
                template: '<ui-view/>'
            });
        });
})();