/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('GFPTrace')
        .controller('GFPTraceCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify'];

    function listCtrl($state, progress, confirm, notify) {
        var vm = this;

        var GFPTraces = [
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
                "checkData": [],
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
                "checkData": [],
                "rework": "",
                "reworkState": "",
                "time": "2012-12-4 12:12:20"
            }
        ]
        var orders=[
            {
                id:'1',
                number:'ZTKD5348489'
            },
            {
                id:'1',
                number:'ZTKD5348489'
            },
            {
                id:'1',
                number:'ZTKD5348489'
            },
            {
                id:'1',
                number:'ZTKD5348489'
            },
            {
                id:'1',
                number:'ZTKD5348489'
            },
            {
                id:'1',
                number:'ZTKD5348489'
            }
        ]
        vm.GFPTraces = GFPTraces;
        vm.orders=orders;
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
            }
        };



    }
})()

