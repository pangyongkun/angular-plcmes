/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.FA.stock-in')
        .controller('FAStockInListCtrl', stockInList)
        .controller('FAStockInAddCtrl', stockInAdd)
        .controller('FAStockInMergeCtrl', stockInMerge);


    stockInList.$inject = ['FAStockInService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function stockInList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            material: {
                number: '物料号',
                name: '物料名称',
                model: '规格型号'
            },
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
            angular.forEach(stockIn, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        stockIn.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(stockIn[key], function (_value, _key) {
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

    stockInAdd.$inject = ['FAStockInService', '$state', '$stateParams', 'progress', 'notify'];
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
                            name: '112-FA-1分3', value: {
                            number: 112,
                            name: 'FA',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-FA-2分3', value: {
                            number: 123,
                            name: 'FA',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-FA-1分2', value: {
                            number: 444,
                            name: 'FA',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-FA-4分3', value: {
                            number: 234,
                            name: 'FA',
                            model: '4分3'
                        }
                        }
                    ]
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
            },

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

    stockInMerge.$inject = ['FAStockInService', 'FAStockInPrepService', '$state', 'notify', 'progress'];
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
                            name: '112-FA-1分3', value: {
                            number: 112,
                            name: 'FA',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-FA-2分3', value: {
                            number: 123,
                            name: 'FA',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-FA-1分2', value: {
                            number: 444,
                            name: 'FA',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-FA-4分3', value: {
                            number: 234,
                            name: 'FA',
                            model: '4分3'
                        }
                        }
                    ]
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
            },

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