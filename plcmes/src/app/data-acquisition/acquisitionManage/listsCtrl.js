/**
 * Created by kun on 2016/1/31.
 */

(function () {
    'use strict';
    angular.module('AcquisitionManage')
        .controller('acquisitionManageCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','acquisitionManageService'];

    function listCtrl($state, progress, confirm, notify,acquisitionManageService) {
        var vm = this;
        var operators = [
            {
                id: 1001,
                name:"小李"
            },
            {
                id: 1002,
                name:"小王"
            }
        ];
        var reworks=[
            {
                name:"光纤头损坏"
            }
        ]
        var reworkStates=[
            {
                name:"光纤头损坏"
            }
        ]
        /*var productionDatas = [
            {
                "id": "1",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4"
                ],
                "rework": "",
                "reworkState": ""
            },
            {
                "id": "2",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [],
                "rework": "",
                "reworkState": ""
            },
            {
                "id": "1",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4"
                ],
                "rework": "",
                "reworkState": ""
            },
            {
                "id": "2",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [],
                "rework": "",
                "reworkState": ""
            },
            {
                "id": "1",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [
                    "检修设备:D1",
                    "1:64.1 62.4",
                    "2:64.1 62.4"
                ],
                "rework": "",
                "reworkState": ""
            },
            {
                "id": "2",
                "time": "2012-12-4 12:12:20",
                "GXNumber": "ZTKD54982316549",
                "operator": "小李",
                "acquisitionManage": "做盒",
                "checkData": [],
                "rework": "",
                "reworkState": ""
            }
        ]*/
        vm.operator="";
        vm.operators=operators;
        vm.reworks=reworks;
        vm.reworkStates=reworkStates;
        vm.acquisitionManages = '';
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh()
            }
        };

        function refresh() {
            vm.isLoading = true;
            acquisitionManageService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.acquisitionManages = result.acquisitionManages;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return acquisitionManageService.getPage(targetPage, pageSize, params);
        }


    }
})()
