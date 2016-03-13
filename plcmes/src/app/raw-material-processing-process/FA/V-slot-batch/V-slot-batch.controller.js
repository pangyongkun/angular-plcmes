/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.FA.V-slot-batch')
        .controller('RawMaterialProcessingFAVSlotBatchListCtrl', batchList)
        .controller('RawMaterialProcessingFAVSlotBatchAddCtrl', batchAdd)
        .controller('RawMaterialProcessingFAVSlotBatchMergeCtrl', batchMerge);


    batchList.$inject = ['rawMaterialProcessingFAVSlotBatchService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function batchList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            material: {
                number: '物料号',
                name: '物料名称',
                model: '规格型号'
            },
            batch: 'V槽批次号',
            amount: '数量(只)',
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
                vm.VSlotBatches = result.VSlotBatches;
                vm.isLoading = false;
            });
        }

        function deleteOne(VSlotBatch) {
            var messages = ['确认对象信息如下'];
            angular.forEach(VSlotBatch, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        messages.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(VSlotBatch[key], function (_value, _key) {
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
                    service.deleteOne(VSlotBatch.id).then(function (result) {
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

    batchAdd.$inject = ['rawMaterialProcessingFAVSlotBatchService', '$state', '$stateParams', 'progress', 'notify'];
    function batchAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.VSlotBatch = {};
        vm.fields = [
            {
                key: 'material',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '物料号',
                    options: [
                        {
                            name: '112-测试物料名称1-1分3', value: {
                            number: 112,
                            name: '测试物料名称1',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-测试物料名称2-2分3', value: {
                            number: 123,
                            name: '测试物料名称2',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-测试物料名称3-1分2', value: {
                            number: 444,
                            name: '测试物料名称3',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-测试物料名称4-4分3', value: {
                            number: 234,
                            name: '测试物料名称4',
                            model: '4分3'
                        }
                        }

                    ]
                }
            },
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'V槽批次号',
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '请正确输入该批次号',
                    required: true
                }
            },
            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '数量',
                    type: 'text',
                    placeholder: '请正输入数量',
                    required: true
                }
            }


        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.VSlotBatch).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '添加批次成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-danger'
                    });
                service.back();
            }, function (err) {

            });
        }


    }

    batchMerge.$inject = ['rawMaterialProcessingFAVSlotBatchService', 'mergeVSlotBatchPrepService', '$state', 'notify', 'progress'];
    function batchMerge(service, preService, $state, notify, progress) {
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
                            name: '112-测试物料名称1-1分3', value: {
                            number: 112,
                            name: '测试物料名称1',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-测试物料名称2-2分3', value: {
                            number: 123,
                            name: '测试物料名称2',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-测试物料名称3-1分2', value: {
                            number: 444,
                            name: '测试物料名称3',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-测试物料名称4-4分3', value: {
                            number: 234,
                            name: '测试物料名称4',
                            model: '4分3'
                        }
                        }

                    ]
                }
            },
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'V槽批次号',
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '请正确输入该批次号',
                    required: true
                }
            },
            {
                key: 'amount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '数量',
                    type: 'text',
                    placeholder: '请输入数量',
                    required: true
                }
            }


        ];
        vm.VSlotBatch = preService.VSlotBatch;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.VSlotBatch).then(function (result) {
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