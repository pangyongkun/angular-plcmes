/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('CirculationNumber')
        .controller('circulationNumberListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','circulationNumberService'];

    function listCtrl($state, progress, confirm, notify,circulationNumberService) {
        var vm = this;
        var labs = {
            id: '序号',
            startNumber: '起始流转编号',
            endNumber: '结束流转编号',
            total: '总数',
            addTime: '增加时间',
            printTime:'打印时间'
        };
        var circulationNumbers = [
            {
                "id":1,
                "startNumber":"ZTKD1507000001",
                "endNumber":"ZTKD1507001000",
                "total":1000,
                "addTime":"2015-8-10 12:00:01",
                "printTime":"未打印"
            },
            {
                "id":2,
                "startNumber":"ZTKD1507000002",
                "endNumber":"ZTKD1507002000",
                "total":1000,
                "addTime":"2015-8-10 14:00:01",
                "printTime":"2015-8-10 14:00:01"
            }
        ];
        vm.circulationNumbers = circulationNumbers;
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };

        vm.addCirculationNumber = addCirculationNumber;
        vm.deleteCirculationNumber = deleteCirculationNumber;
        vm.modifyCirculationNumber = modifyCirculationNumber;
        vm.printCirculationNumber=printCirculationNumber;
        vm.addPrintCirculationNumber=addPrintCirculationNumber;


        function addCirculationNumber() {
            $state.go('productionProcess.circulationNumber.add')
        }
        function addPrintCirculationNumber() {
            $state.go('productionProcess.circulationNumber.print')
        }


        function deleteCirculationNumber(circulationNumber) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(circulationNumber, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------

                    progress.start();
                    circulationNumberService.deleteCirculationNumber(circulationNumber.id)
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

        function modifyCirculationNumber(circulationNumber) {
            $state.go('productionProcess.circulationNumber.modify', {id: circulationNumber.id});
        }

        function printCirculationNumber(circulationNumber){
            $state.go('productionProcess.circulationNumber.print', {id: circulationNumber.id});
        }


        function refresh() {
            vm.isLoading = true;
            circulationNumberService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.circulationNumbers = result.circulationNumbers;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return circulationNumberService.getPage(targetPage, pageSize, params);
        }
    }
})()
