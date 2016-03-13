/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('GFTrace')
        .controller('GFTraceCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','GFTraceService'];

    function listCtrl($state, progress, confirm, notify,GFTraceService) {
        var vm = this;


       /* var GFTraces = [
            {
                "process": "工序1",
                "completeState": "已完成",
                "operator": "小李",
                "checkData": [
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4"
                ],
                "rework": "",
                "reworkState": "未返修",
                "time": "2012-12-4 12:12:20"
            },
            {
                "process": "工序1",
                "completeState": "已完成",
                "operator": "小李",
                "checkData": [

                ],
                "rework": "",
                "reworkState": "",
                "time": "2012-12-4 12:12:20"
            },
            {
                "process": "工序1",
                "completeState": "已完成",
                "operator": "小李",
                "checkData": [
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4"
                ],
                "rework": "",
                "reworkState": "未返修",
                "time": "2012-12-4 12:12:20"
            },
            {
                "process": "工序1",
                "completeState": "已完成",
                "operator": "小李",
                "checkData": [

                ],
                "rework": "",
                "reworkState": "",
                "time": "2012-12-4 12:12:20"
            }
        ]*/
        vm.GFTraces = '';
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };


        function refresh() {
            vm.isLoading = true;
            GFTraceService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.GFTraces = result.GFTraces;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return GFTraceService.getPage(targetPage, pageSize, params);
        }

    }
})()
