/**
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('Process')
        .controller('processListCtrl', processListCtrl);

    processListCtrl.$inject = ['$state','progress', 'ConfirmDialog', 'notify','processService'];

    function processListCtrl($state,progress, confirm, notify,processService) {
        var vm = this;
        var labs = {
            id: '序号',
            name: '工序名称',
            group: '所属组别',
            code: '工序编码',
        };
       /* var processes = [
            {
                'id': '1',
                'name': '晶圆粘胶',
                'group': 'A组-芯片FA',
                'code': 'A01'
            },
            {
                'id': '2',
                'name': '晶圆粘胶',
                'group': 'A组-芯片FA',
                'code': 'A02'
            }
        ]*/
        vm.processes = "";
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh()
            }
        };

        vm.addProcess = addProcess;
        vm.deleteProcess=deleteProcess;
        vm.modifyProcess=modifyProcess;


        function addProcess() {
            $state.go('codingManagement.process.add')
        }

        function deleteProcess(process){
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(process, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance=confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------
                    progress.start();
                    processService.deleteProcess(process.id)
                        .then(function(data){
                            notify({
                                message: '删除成功',
                                duration: 2000,
                                position: 'center',
                                classes: 'alert-success'
                            });
                            progress.stop();
                            refresh();
                        },function(reason){
                            progress.stop();
                        })


                    /////////////////////////////////////////
                }
            });
        }

        function modifyProcess(process){
            $state.go('codingManagement.process.modify',{id:process.id});
        }

        function refresh() {
            vm.isLoading = true;
            processService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.processes = result.processes;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return processService.getPage(targetPage, pageSize, params);
        }

    }
})()