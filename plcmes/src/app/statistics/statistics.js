/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('Statics', [ 'ReportFormManage','ReportForm'])
        .config(function ($stateProvider) {
            $stateProvider.state('statics', {
                abstract:true,
                url: '/statics',
                template:'<ui-view></ui-view>'

            });
        });
})()