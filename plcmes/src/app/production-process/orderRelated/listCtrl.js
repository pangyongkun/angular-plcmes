/**
 * Created by kun on 2016/1/29.
 */
(function () {
    'use strict';
    angular.module('OrderRelated')
        .controller('orderRelatedListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify', 'orderRelatedService'];

    function listCtrl($state, progress, confirm, notify, orderRelatedService) {
        var vm = this;
        var labs = {
            id: '序号',
            orderRelated: "流转编号",
            orderNumber: "订单编号"
        };
        /*var orderRelateds = [
         {
         "id": "1",
         "orderRelated": "121313",
         "orderNumber": "313113"
         },
         {
         "id": "2",
         "orderRelated": "122313",
         "orderNumber": "313113"
         },
         {
         "id": "3",
         "orderRelated": "122413",
         "orderNumber": "313113"
         }
         ]*/
        var orderInfo = {
            "pattern": "1分8",
            "style": "盒式2.0",
            "color": "黄色",
            "length": "1.5m",
            "code": "FA/APC"

        };

        vm.orderRelateds = '';
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };
        vm.orderInfo = orderInfo;

        vm.deleteCirculationNumbersAssociate = deleteCirculationNumbersAssociate;


        function deleteCirculationNumbersAssociate(orderRelated) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(orderRelated, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------
                    progress.start();
                    orderRelatedService.deleteOrderRelated(orderRelated.id)
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

        function refresh() {
            vm.isLoading = true;
            orderRelatedService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.orderRelateds = result.orderRelateds;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return orderRelatedService.getPage(targetPage, pageSize, params);
        }


    }
})()