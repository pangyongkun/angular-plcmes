/**
 * Created by kun on 2016/1/30.
 */
(function () {
    'use strict';
    angular.module('ProductionData')
        .controller('productionDataQueryCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','productionDataService'];

    function listCtrl($state, progress, confirm, notify,productionDataService) {
        var vm = this;
        var productionDatas = [
            {
                "id":"工序1",
                "state":"完成",
                "operator":"小明",
                "value":[

                ],
                "rework":"",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序2",
                "state":"完成",
                "operator":"小李",
                "value":[

                ],
                "rework":"",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序3",
                "state":"完成",
                "operator":"小黄",
                "value":[

                ],
                "rework":"光纤头坏",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序1",
                "state":"完成",
                "operator":"小陈",
                "value":[
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4",
                    "3:64.1 62.4",
                    "4:64.1 62.4",
                    "5:64.1 62.4",
                    "6:64.1 62.4"
                ],
                "rework":"光纤头坏",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序3",
                "state":"完成",
                "operator":"小明",
                "value":[

                ],
                "rework":"",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序5",
                "state":"完成",
                "operator":"小李",
                "value":[

                ],
                "rework":"",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            },
            {
                "id":"工序1",
                "state":"完成",
                "operator":"小黄",
                "value":[

                ],
                "rework":"光纤头坏",
                "reworkState":" ",
                "time":"2015-7-24 12:10:00"
            }
        ]
        vm.productionDatas = '';
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
            productionDataService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.productionDatas = result.productionDatas;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return productionDataService.getPage(targetPage, pageSize, params);
        }

    }
})()