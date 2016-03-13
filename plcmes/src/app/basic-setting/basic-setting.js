/**
 * Created by jerry on 1/29/16.
 */
(function () {
    angular.module('basic-setting', ['basic-setting.role', 'basic-setting.user'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('basic-setting', {
                    url: '/basic-setting',
                    template: '<ui-view/>'
                })

        })
})();