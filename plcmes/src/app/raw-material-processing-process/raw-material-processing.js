/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('raw-material-processing', [
            'raw-material-processing.FA',
            'raw-material-processing.chip',
            'raw-material-processing.single-fiber'
        ])
        .config(function ($stateProvider) {
            $stateProvider.state('raw-material-processing', {
                url: '/raw-material-processing',
                template: '<ui-view/>'
            });
        })
})();