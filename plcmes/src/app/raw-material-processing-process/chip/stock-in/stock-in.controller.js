/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.chip.stock-in')
        .controller('ChipStockInListCtrl', stockInList)
        .controller('ChipStockInAddCtrl', stockInAdd)
        .controller('ChipStockInMergeCtrl', stockInMerge);


    stockInList.$inject = ['ChipStockInService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function stockInList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            material: {
                number: '物料号',
                name: '物料名称',
                model: '规格型号'
            },
            wafer: '所属晶圆批次号',
            amount: '入库数',
            operator: '入库人',
            timestamp: '入库时间'
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
                pageSize: vm.paginationConf.itemsPerPage,
                totalItems: 0
            });
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage);
        }

        function paginationQuery(targetPage, itemsPerpage, params) {
            vm.isLoading = true;
            service.paginationQuery(targetPage, itemsPerpage, params).then(function (result) {
                vm.paginationConf.totalItems = result.totalNumber;
                vm.stockIns = result.stockIns;
                vm.isLoading = false;
            });
        }

        function deleteOne(stockIn) {
            var messages = ['确认对象信息如下'];
            angular.forEach(stockIn, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + ' : ' + value)
                }

            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(stockIn.id).then(function (result) {
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

    stockInAdd.$inject = ['ChipStockInService', '$state', '$stateParams', 'progress', 'notify'];
    function stockInAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.stockIn = {};
        vm.fields = [
            {
                key: 'material',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '物料号',
                    options: [
                        {
                            name: '112-芯片-1分3', value: {
                            number: 112,
                            name: '芯片',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-芯片-2分3', value: {
                            number: 123,
                            name: '芯片',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-芯片-1分2', value: {
                            number: 444,
                            name: '芯片',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-芯片-4分3', value: {
                            number: 234,
                            name: '芯片',
                            model: '4分3'
                        }
                        }
                    ]
                }
            },

            {
                key: 'wafer',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '所属晶圆批次号',
                    required: true
                }
            },


            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '出库数',
                    required: true,
                }
            },


            {
                key: 'operator',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '操作员',
                    options: [
                        {
                            name: '测试操作员', value: '测试操作员'
                        },
                        {
                            name: '操作员1', value: '操作员1'
                        },
                    ]
                }
            }
        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.stockIn).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '添加成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-danger'
                    });
                service.back();
            }, function (err) {

            });
        }


    }

    stockInMerge.$inject = ['ChipStockInService', 'ChipStockInPrepService', '$state', 'notify', 'progress'];
    function stockInMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;
        vm.fields = [
            {
                key: 'material',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '物料号',
                    options: [
                        {
                            name: '112-芯片-1分3', value: {
                            number: 112,
                            name: '芯片',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-芯片-2分3', value: {
                            number: 123,
                            name: '芯片',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-芯片-1分2', value: {
                            number: 444,
                            name: '芯片',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-芯片-4分3', value: {
                            number: 234,
                            name: '芯片',
                            model: '4分3'
                        }
                        }
                    ]
                }
            },
            {
                key: 'wafer',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '所属晶圆批次号',
                    required: true
                }
            },

            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '出库数',
                    required: true,
                }
            },


            {
                key: 'operator',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '操作员',
                    options: [
                        {
                            name: '测试操作员', value: '测试操作员'
                        },
                        {
                            name: '操作员1', value: '操作员1'
                        }
                    ]
                }
            }

        ];
        vm.stockIn = preService.stockIn;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.stockIn).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '修改成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-danger'
                    });
                service.back();
            }, function (err) {
            });
        }
    }


})();