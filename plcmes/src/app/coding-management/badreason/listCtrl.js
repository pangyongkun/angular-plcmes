/**
 * Created by kun on 2016/1/29.
 */
(function () {
    'use strict';
    angular.module('BadReason')
        .controller('badReasonListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify', 'badReasonService'];

    function listCtrl($state, progress, confirm, notify, badReasonService) {
        var vm = this;
        var labs = {
            id: '序号',
            process: '所属工序名称',
            name: '不良原因名称',
            code: '编码',
            count: '是否计数'
        };
        /*var badReasons = [
         {
         "id": 1,
         "process": "半成品测试",
         "name": "FA不良",
         "code": "001",
         "count": "不计"
         },
         {
         "id": 2,
         "process": "半成品测试",
         "name": "FA不良",
         "code": "002",
         "count": "不计"
         },
         {
         "id": 3,
         "process": "成品测试",
         "name": "连接头研磨不到位",
         "code": "003",
         "count": "不计"
         },
         {
         "id": 4,
         "process": "成品测试",
         "name": "连接头研磨不到位",
         "code": "004",
         "count": "不计"
         },
         {
         "id": 5,
         "process": "成品测试",
         "name": "连接头研磨不到位",
         "code": "005",
         "count": "不计"
         },
         {
         "id": 6,
         "process": "成品测试",
         "name": "连接头研磨不到位",
         "code": "006",
         "count": "不计"
         }
         ];*/
        vm.isLoading = false;
        vm.badReasons = "";
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };

        vm.addBadReason = addBadReason;
        vm.deleteBadReason = deleteBadReason;
        vm.modifyBadReason = modifyBadReason;


        function addBadReason() {
            $state.go('codingManagement.badReason.add')
        }

        function deleteBadReason(badReason) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(badReason, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    //-------如果确定,则执行删除操作-------------
                    badReasonService.deleteBadReason(badReason.id)
                        .then(function (data) {
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

        function modifyBadReason(badReason) {
            $state.go('codingManagement.badReason.modify', {id: badReason.id});
        }

        function refresh() {
            vm.isLoading = true;
            badReasonService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.badReasons = result.badReasons;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return badReasonService.getPage(targetPage, pageSize, params);
        }


    }
})()