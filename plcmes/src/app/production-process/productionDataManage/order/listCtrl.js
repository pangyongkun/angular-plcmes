/**
 * Created by kun on 2016/1/30.
 */
(function () {
    'use strict';
    angular.module('ProductionData')
        .controller('orderQueryCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','orderService'];

    function listCtrl($state, progress, confirm, notify,orderService) {
        var vm = this;
        var orderInfo = {
            "items":[
                {
                    "id":1,
                    "number":"ZTKD150700001",
                    "state":"已完成"
                },
                {
                    "id":2,
                    "number":"ZTKD150700001",
                    "state":"已完成"
                },
                {
                    "id":3,
                    "number":"ZTKD150700001",
                    "state":"已完成"
                },
                {
                    "id":4,
                    "number":"ZTKD150700001",
                    "state":"已完成"
                }
            ],
            "time":"2015-12-4",
            "client":"江苏移动电信",
            "productName":"分路器",
            "patter":"光分路器-1x8-插片式适配型-SC/UPC",
            "total":100,
            "complete":50
        }
        vm.ordersInfo=orderInfo;
        vm.orders = '';
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
            orderService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.orders = result.orders;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return orderService.getPage(targetPage, pageSize, params);
        }

    }
})()