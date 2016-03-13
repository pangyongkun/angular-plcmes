/**
 * Created by jerry on 1/31/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber', [
            'raw-material-processing.single-fiber.capillary-batch',
            'raw-material-processing.single-fiber.bare-fiber-batch',
            'raw-material-processing.single-fiber.SF-batch',
            'raw-material-processing.single-fiber.stock',
            'raw-material-processing.single-fiber.stock-in',
            'raw-material-processing.single-fiber.stock-out'
        ])
        .config(function ($stateProvider) {
            $stateProvider.state('raw-material-processing.single-fiber', {
                url: '/single-fiber',
                template: '<ui-view/>'
            });
        });
})();