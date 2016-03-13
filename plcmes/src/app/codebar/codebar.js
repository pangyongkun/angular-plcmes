/**
 * Created by jerry on 16/3/3.
 */
(function(){
    'use strict';
    angular.module('codeBar', [])
        .config(function ($stateProvider) {
            $stateProvider.state('codeBar', {
                url: '/codebar',
                templateUrl: 'app/codebar/codebar.html',
                controller: 'CodeBarCtrl',
                controllerAs: 'vm'
            })
        });
})();