/**
 * Created by jerry on 1/29/16.
 */
(function () {
    angular.module('sample', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('sample', {
                    url: '',
                    templateUrl: 'app/_sample_for_look/tpl.sample.list.html',
                    controller: 'SampleListCtrl',
                    controllerAs: 'vm'

                })
                .state('sample-list', {
                    url: '/samples',
                    templateUrl: 'app/_sample_for_look/tpl.sample.list.html',
                    controller: 'SampleListCtrl',
                    controllerAs: 'vm'


                })

                .state('sample-add', {
                    url: '/samples/new',
                    templateUrl: 'app/_sample_for_look/tpl.sample.edit.html',
                    controller: 'SampleAddCtrl',
                    controllerAs: 'vm',
                    data: {
                        isMerge: false
                    }
                })
                .state('sample-edit', {
                    url: '/samples/:id',
                    templateUrl: 'app/_sample_for_look/tpl.sample.edit.html',
                    controller: 'SampleEditCtrl',
                    controllerAs: 'vm',
                    data: {
                        isMerge: true
                    }
                })
        })
})();