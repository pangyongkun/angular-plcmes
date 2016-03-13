/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('ReportFormManage',[])
        .config(function ($stateProvider) {
            $stateProvider.state('statics.reportFormManage', {
                url: '/reportFormManage',
                templateUrl: 'app/statistics/reportFormManage/list.html',
                controller:'reportFormManageCtrl',
                controllerAs:'vm'
            });
        });

})()