/**
 * Created by kun on 2016/1/30.
 */
(function () {
    'use strict';
    angular.module('_CirculationNumber')
        .controller('_circulationNumberCtrl', circulationNumberCtrl);

    circulationNumberCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','_circulationNumberService'];

    function circulationNumberCtrl($state, progress, confirm, notify,_circulationNumberService) {
        var vm = this;
        var labs = {
            id: '工序号',
            state: '完成状态',
            operator: '操作人员',
            value: '检测值',
            rework: '返修情形',
            reworkState:'返修状态',
            time:'采集时间'
        };
        var _circulationNumbers = [
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
        vm._circulationNumbers = '';
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh()
            }
        };
        vm.delete_CirculationNumber=delete_CirculationNumber;

        function delete_CirculationNumber(_circulationNumber){
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(_circulationNumber, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------

                    progress.start();
                    _circulationNumberService.delete_CirculationNumber(_circulationNumber.id)
                        .then(function(data){
                            progress.stop();
                            notify({
                                message: '删除成功',
                                duration: 2000,
                                position: 'center',
                                classes: 'alert-success'
                            });
                            refresh();
                        })

                    /////////////////////////////////////////
                }
            });
        }


        function refresh() {
            vm.isLoading = true;
            _circulationNumberService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm._circulationNumbers = result._circulationNumbers;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return _circulationNumberService.getPage(targetPage, pageSize, params);
        }



    }
})()