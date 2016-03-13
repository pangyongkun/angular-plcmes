/**
 * Created by kun on 2016/1/29.
 */
(function () {
    'use strict';
    angular.module('SNPrint')
        .controller('SNPrintListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','SNPrintService'];

    function listCtrl($state, progress, confirm, notify,SNPrintService) {
        var vm = this;
        var labs = {
            id: '序号',
            startSN: '开始入场SN编号',
            endSN: '结束出场SN编号',
            total: '总数',
            addTime: '增加时间',
            printTime: "打印时间",

        };
        /*var SNPrints = [
            {
                "id":"1",
                "startSN":"ZTKD150710001",
                "endSN":"ZTKD150740001",
                "total":100,
                "addTime":"2015-8-10 12:10:00",
                "printTime":"未打印"
            },
            {
                "id":"1",
                "startSN":"ZTKD150710001",
                "endSN":"ZTKD150740001",
                "total":100,
                "addTime":"2015-8-10 12:10:00",
                "printTime":"2015-8-10 14:10:00"
            }
        ]*/
        vm.SNPrints = '';
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };

        vm.addSNPrint = addSNPrint;
        vm.deleteSNPrint = deleteSNPrint;
        vm.modifySNPrint = modifySNPrint;


        function addSNPrint() {
            $state.go('productionProcess.SNPrint.add')
        }

        function deleteSNPrint(SNPrint) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(SNPrint, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------
                    progress.start();
                    SNPrintService.deleteSNPrint(SNPrint.id)
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

        function modifySNPrint(SNPrint) {
            $state.go('productionProcess.SNPrint.modify', {id: SNPrint.id});
        }

        function refresh() {
            vm.isLoading = true;
            SNPrintService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.SNPrints = result.SNPrints;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return SNPrintService.getPage(targetPage, pageSize, params);
        }


    }
})()