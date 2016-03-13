/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.chip.stock')
        .controller('ChipStockListCtrl', stockList)
        .controller('ChipStockDetailCtrl', stockDetail);


    stockList.$inject = ['ChipStockService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function stockList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;

        var labs = {
            id: '序号',
            material: {
                number: '物料号',
                name: '物料名称',
                model: '规格型号'
            },
            number: '物料号',
            name: '物料名称',
            model: '规格型号',
            amount: 112,
            wafer: 222123
        };

        var lastParams = service.getLastStateParams();

        //分页参数
        vm.paginationConf = {
            currentPage: lastParams.page ? lastParams.page : 1,
            itemsPerPage: lastParams.pageSize ? lastParams.pageSize : 10,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };
        vm.delete = deleteOne;
        vm.back = service.back;
        ////////////////////////////////////////////////////////
        function refresh() {
            service.setLastStateParams({
                page: vm.paginationConf.currentPage,
                pageSize: vm.paginationConf.itemsPerPage
            });
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage);
        }

        function paginationQuery(targetPage, itemsPerpage, params) {
            vm.isLoading = true;
            service.paginationQuery(targetPage, itemsPerpage, params).then(function (result) {
                vm.paginationConf.totalItems = result.totalNumber;
                vm.stocks = result.stocks;
                vm.isLoading = false;
            });
        }

        function deleteOne(stock) {
            var messages = ['确认对象信息如下'];
            angular.forEach(stock, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        messages.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(stock[key], function (_value, _key) {
                        if (labs[key][_key]) {
                            messages.push(labs[key][_key] + ' : ' + _value);
                        }
                    })
                }


            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(stock.id).then(function (result) {
                        progress.stop();
                        notify({
                            message: '删除成功',
                            duration: 2000,//显示两秒
                            position: 'center',
                            classes: 'alert-success'
                        });
                        refresh();
                    }, function () {
                        progress.stop();
                    });
                }
            });
        }
    }

    stockDetail.$inject = ['ChipStockService', 'progress', '$timeout'];
    function stockDetail(service, progress, $timeout) {
        var vm = this;
        var stockIns = [];
        var stockOuts = [];

        vm.stock = {
            number: 123333,
            name: 'FA',
            model: '1分3',
            amount: 1120,
            wafer: 27374,
            ins: [],
            outs: []
        };
        for (var i = 1; i < 1000; i++) {
            var stockIn = {
                id: i,
                amount: 3 * i,
                operator: '入库员1',
                timestamp: '2017-02-03  10:09'
            };
            stockIns.push(stockIn);
            var stockOut = {
                id: i,
                amount: 5 * i,
                operator: '出库员1',
                timestamp: '2017-02-23  10:09'
            };
            stockOuts.push(stockOut);
        }

        vm.stockInConf = {
            currentPage: 1,
            totalItems: stockIns.length,
            itemsPerPage: 5,
            perPageOptions: [5, 10, 15, 20, 30],
            onChange: function () {
                var start = (vm.stockInConf.currentPage - 1) * vm.stockInConf.itemsPerPage;
                var end = (vm.stockInConf.currentPage) * vm.stockInConf.itemsPerPage > stockIns.length ? stockIns.length : (vm.stockInConf.currentPage) * vm.stockInConf.itemsPerPage;

                $timeout(function () {
                    vm.stockInLoading = true;
                }, 1000);
                vm.stock.ins = stockIns.slice(start, end);
                vm.stockInLoading = false;
            }
        };
        vm.stockOutConf = {
            currentPage: 1,
            totalItems: stockOuts.length,
            itemsPerPage: 5,
            perPageOptions: [5, 10, 15, 20, 30],
            onChange: function () {
                var start = (vm.stockOutConf.currentPage - 1) * vm.stockOutConf.itemsPerPage;
                var end = (vm.stockOutConf.currentPage) * vm.stockOutConf.itemsPerPage > stockOuts.length ? stockOuts.length : (vm.stockOutConf.currentPage) * vm.stockOutConf.itemsPerPage;

                $timeout(function () {
                    vm.stockOutLoading = true;
                }, 1000);
                vm.stock.outs = stockOuts.slice(start, end);
                vm.stockOutLoading = false;
            }
        }

    }
})();