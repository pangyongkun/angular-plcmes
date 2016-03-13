/**
 * Created by jerry on 1/31/16.
 */

(function () {
    'use strict';
    angular.module('anti-counterfeit', [])
        .config(function ($stateProvider) {
            $stateProvider.state('anti-counterfeit', {
                url: '/anti-counterfeit',
                templateUrl: 'app/anti-counterfeit/anti-counterfeit.html',
                controller: 'AntiCounterCtrl',
                controllerAs: 'vm'
            })
        });
})();