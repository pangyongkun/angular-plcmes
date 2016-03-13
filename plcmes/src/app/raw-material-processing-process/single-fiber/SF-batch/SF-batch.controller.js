/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.single-fiber.SF-batch')
        .controller('SFBatchListCtrl', batchList)
        .controller('SFBatchAddCtrl', batchAdd)
        .controller('SFBatchMergeCtrl', batchMerge);


    batchList.$inject = ['SFBatchService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function batchList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            batch: '批次号',
            material: {
                name: '物料名称',
                number: '物料号',
                model: '型号规格'
            },
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
                vm.SFBatches = result.SFBatches;
                vm.isLoading = false;
            });
        }

        function deleteOne(SFBatch) {
            var messages = ['确认对象信息如下'];
            angular.forEach(SFBatch, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        messages.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(SFBatch[key], function (_value, _key) {
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
                    service.deleteOne(SFBatch.id).then(function (result) {
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

    batchAdd.$inject = ['SFBatchService', '$state', '$stateParams', 'progress', 'notify'];
    function batchAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.SFBatch = {};
        vm.fields = [
            {
                key: 'material',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '物料号',
                    options: [
                        {
                            name: '112-单纤-1分3', value: {
                            number: 112,
                            name: '单纤',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-单纤-2分3', value: {
                            number: 123,
                            name: '单纤',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-单纤-1分2', value: {
                            number: 444,
                            name: '单纤',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-单纤-4分3', value: {
                            number: 234,
                            name: '单纤',
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
                    label: '单纤批次号',
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
                    placeholder: '数量',
                    required: true
                }
            }


        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.SFBatch).then(function (result) {
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

    batchMerge.$inject = ['SFBatchService', 'mergeSFBatchPrepService', '$state', 'notify', 'progress'];
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
                            name: '112-单纤-1分3', value: {
                            number: 112,
                            name: '单纤',
                            model: '1分3'
                        }
                        },
                        {
                            name: '123-单纤-2分3', value: {
                            number: 123,
                            name: '单纤',
                            model: '2分3'
                        }
                        },
                        {
                            name: '444-单纤-1分2', value: {
                            number: 444,
                            name: '单纤',
                            model: '1分2'
                        }
                        },
                        {
                            name: '234-单纤-4分3', value: {
                            number: 234,
                            name: '单纤',
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
                    label: '单纤批次号',
                    type: 'text',
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
                    placeholder: '数量',
                    required: true
                }
            }


        ];
        vm.SFBatch = preService.SFBatch;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.SFBatch).then(function (result) {
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