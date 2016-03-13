/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('ReportForm',[])
        .config(function ($stateProvider) {
            $stateProvider.state('statics.reportForm', {
                url: '/reportForm',
                templateUrl: 'app/statistics/reportForm/reportForm.html',
                controller:'reportFormCtrl',
                controllerAs:'vm'
            });
        });

})()
