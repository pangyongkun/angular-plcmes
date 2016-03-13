/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('ReportFormManage')
        .controller('reportFormManageCtrl', reportFormManageCtrl)

    function reportFormManageCtrl() {
        var vm = this;
        var k = 4;
        vm.reportType = [
            {
                name: "芯片生产报表"
            },
            {
                name: "FA生产报表"
            },
            {
                name: "调试组产量报表"
            },
            {
                name: "考勤报表"
            },
            {
                name: "订单报表报表"
            },
        ];
        vm.other='';
        vm.reportForms = [
            {
                id:1,
                name:'调试组产量报表',
                time:'2015-6-15 12:05:20'
            },
            {
                id:2,
                name:'考勤报表',
                time:'2015-6-15 12:05:20'
            },
            {
                id:3,
                name:'FA生产报表',
                time:'2015-6-15 12:05:20'
            }
        ]
        vm.generate = generate;
        vm.selectReport = {}

        function generate() {
            if (vm.selectReport.name != null) {
                var r = {};
                r.id = k++;
                r.time = new Date()
                r.name = vm.selectReport.name;
                r.other=vm.other;
                vm.reportForms.push(r);
            }

        }

    }

})()
