/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.FA.fiber-ribbon-batch')
        .controller('RawMaterialFAFiberRibbonBatchListCtrl', fiberRibbonBatchList)
        .controller('RawMaterialFAFiberRibbonBatchAddCtrl', fiberRibbonBatchAdd)
        .controller('RawMaterialFAFiberRibbonBatchMergeCtrl', fiberRibbonBatchMerge);


    fiberRibbonBatchList.$inject = ['rawMaterialFAFiberRibbonBatchService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function fiberRibbonBatchList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            materialNumber: '物料号',
            materialName: '物料名称',
            model: '规格型号',
            batch: '光纤带批次号',
            amount: '数量',
            timestamp: '增加时间'
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
                vm.fiberRibbonBatches = result.fiberRibbonBatches;
                vm.isLoading = false;
            });
        }

        function deleteOne(fiberRibbonBatch) {
            var messages = ['确认对象信息如下'];
            angular.forEach(fiberRibbonBatch, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        messages.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(fiberRibbonBatch[key], function (_value, _key) {
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
                    service.deleteOne(fiberRibbonBatch.id).then(function (result) {
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

    fiberRibbonBatchAdd.$inject = ['rawMaterialFAFiberRibbonBatchService', '$state', '$stateParams', 'progress', 'notify'];
    function fiberRibbonBatchAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.fiberRibbonBatch = {};
        vm.fields = [
            {
                key: 'material',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '物料号',
                    options: [
                        {
                            name: '21233-光纤带-1m', value: {
                            number: 21233,
                            name: '光纤带',
                            model: '1m'
                        }
                        },
                        {
                            name: '28300-光纤带-3m', value: {
                            number: 28300,
                            name: '光纤带',
                            model: '3m'
                        }
                        }
                    ]
                }
            },
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '光纤带批次号',
                    placeholder: '请正确输入光纤批次号'
                }
            },
            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '数量',
                    placeholder: '请输入数量',
                    type: 'number'
                }
            }


        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.fiberRibbonBatch).then(function (result) {
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

    fiberRibbonBatchMerge.$inject = ['rawMaterialFAFiberRibbonBatchService', 'mergeFiberRibbonBatchPrepService', '$state', 'notify', 'progress'];
    function fiberRibbonBatchMerge(service, preService, $state, notify, progress) {
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
                            name: '21233-光纤带-1m', value: {
                            "number": 21233,
                            "name": '光纤带',
                            "model": '1m'
                        }
                        },
                        {
                            name: '28300-光纤带-3m', value: {
                            number: 28300,
                            name: '光纤带',
                            model: '3m'
                        }
                        }
                    ]
                }
            },
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '光纤带批次号',
                    placeholder: '请正确输入光纤批次号'
                }
            },
            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '数量',
                    placeholder: '请输入数量',
                    type: 'number'
                }
            }


        ];
        vm.fiberRibbonBatch = preService.fiberRibbonBatch;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.fiberRibbonBatch).then(function (result) {
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