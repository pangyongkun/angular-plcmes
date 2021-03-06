/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('raw-material-processing.FA.V-slot-distribution')
        .controller('VSlotDistributionListCtrl', vSlotDistributionList)
        .controller('VSlotDistributionAddCtrl', vSlotDistributionAdd)
        .controller('VSlotDistributionMergeCtrl', vSlotDistributionMerge);


    vSlotDistributionList.$inject = ['VSlotDistributionService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function vSlotDistributionList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            material: {
                number: '物料号',
                name: '物料名称',
                model: '型号规格'
            },
            batch: '批次号',
            receiver: '领取人',
            receiveNumber: '领取数量',
            timestamp: '领取时间'
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
                vm.vSlotDistributions = result.vSlotDistributions;
                vm.isLoading = false;
            });
        }

        function deleteOne(vSlotDistribution) {
            var messages = ['确认对象信息如下'];
            angular.forEach(vSlotDistribution, function (value, key) {

                if (typeof (labs[key]) != 'object') {
                    if (labs[key]) {
                        messages.push(labs[key] + ' : ' + value)
                    }
                } else {
                    angular.forEach(vSlotDistribution[key], function (_value, _key) {
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
                    service.deleteOne(vSlotDistribution.id).then(function (result) {
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

    vSlotDistributionAdd.$inject = ['VSlotDistributionService', '$state', '$stateParams', 'progress', 'notify'];
    function vSlotDistributionAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        var date = new Date();
        vm.vSlotDistribution = {};
        vm.fields = [
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'V槽批次号',
                    required: true,
                    type: 'text',
                    placeholder: '查询V槽批次号'
                }
            },
            {
                type: 'dateShow',
                controller: function ($scope, $timeout) {
                    $scope.$watch('model.batch', function (newValue, oldValue, theScope) {

                        $scope.isShow = false;
                        if (newValue !== oldValue) {
                            if (newValue.toString().length > 4) {
                                var obj1 = {
                                    '物料号': Math.floor((Math.random() * 10000)),
                                    '物料名称': 'V槽',
                                    '型号': '1分2'
                                };
                                var obj2 = {
                                    '物料号': Math.floor((Math.random() * 10000)),
                                    '物料名称': 'V槽',
                                    '型号': '3分2'
                                };
                                var obj = [obj1, obj2];

                                $timeout(function () {
                                    $scope.options.value(obj[Math.floor(Math.random() * 2)]);
                                    $scope.isShow = true
                                }, 1000);


                            }
                        }
                    });
                }
            },
            {
                key: 'receiveAmount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '领取数量',
                    required: true,
                    type: 'number'
                }
            },
            {
                type: 'dateTimepicker',
                defaultValue: date,
                templateOptions: {
                    label: '领取时间',
                    type: 'text'

                }
            }
        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.vSlotDistribution).then(function (result) {
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

    vSlotDistributionMerge.$inject = ['VSlotDistributionService', 'mergeVSlotDistributionPrepService', '$state', 'notify', 'progress'];
    function vSlotDistributionMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;
        vm.fields = [
            {
                key: 'batch',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'V槽批次号',
                    required: true,
                    type: 'text',
                    placeholder: '查询光纤带批次号'
                }
            },
            {
                type: 'dateShow',
                controller: function ($scope, $timeout) {
                    $scope.$watch('model.batch', function (newValue, oldValue, theScope) {

                        $scope.isShow = false;
                        if (newValue !== oldValue) {
                            if (newValue.toString().length > 4) {
                                var obj1 = {
                                    '物料号': Math.floor((Math.random() * 10000)),
                                    '物料名称': 'V槽',
                                    '型号': '1分2'
                                };
                                var obj2 = {
                                    '物料号': Math.floor((Math.random() * 10000)),
                                    '物料名称': 'V槽',
                                    '型号': '3分2'
                                };
                                var obj = [obj1, obj2];

                                $timeout(function () {
                                    $scope.options.value(obj[Math.floor(Math.random() * 2)]);
                                    $scope.isShow = true
                                }, 1000);


                            }
                        }
                    });
                }
            },
            {
                key: 'receiveAmount',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '领取数量',
                    required: true,
                    type: 'number'
                }
            },
            {
                type: 'dateTimepicker',
                templateOptions: {
                    label: '领取时间',
                    type: 'text'

                }
            }
        ];
        vm.vSlotDistribution = preService.vSlotDistribution;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.vSlotDistribution).then(function (result) {
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