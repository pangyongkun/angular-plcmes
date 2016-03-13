/**
 * Created by jerry on 1/30/16.
 */

(function () {
    'use strict';
    angular.module('produce-process-pre-management.plan.child-order')
        .controller('prePlanChildOrderListCtrl', childOrderList)
        .controller('prePlanChildOrderAddCtrl', childOrderAdd)
        .controller('prePlanChildOrderMergeCtrl', childOrderMerge);

    childOrderList.$inject = ['PrePlanChildOrderService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function childOrderList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            timestamp: '下单时间',
            serial: '订单号',
            client: '客户',
            productName: '产品名称',
            type: '型号',
            number: '数量'
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
                vm.childOrders = result.childOrders;
                vm.isLoading = false;
            });
        }

        function deleteOne(childOrder) {
            var messages = ['确认对象信息如下'];
            angular.forEach(childOrder, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + ' : ' + value)
                }
            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(childOrder.id).then(function (result) {
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

    childOrderAdd.$inject = ['PrePlanChildOrderService', '$state', '$stateParams', 'progress', 'notify'];
    function childOrderAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.childOrder = {};
        var date = new Date();
        vm.fieldPart1 = [
            {
                key: 'timestamp',
                type: 'abreastDatepicker',
                defaultValue: date,
                templateOptions: {
                    label: '下单时间',
                    required: true
                }
            },
            {
                key: 'serial',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '订单号',
                    required: true
                }
            },
            {
                key: 'client',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '客户',
                    type: 'text'
                }
            },

            {
                key: 'city',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '城市',
                    options: [
                        {name: '南京', value: '南京'},
                        {name: '东京', value: '东京'},
                        {name: '北京', value: '北京'},
                        {name: '华盛顿', value: '华盛顿'}
                    ]
                }


            },
            {
                key: 'system',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '系统',
                }
            },
            {
                key: 'productName',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '产品名',
                    options: [
                        {name: '路由器', value: '路由器'},
                        {name: '光交换机', value: '光交换机'},
                        {name: '分路器', value: '分路器'},
                        {name: '尾纤', value: '尾纤'}
                    ]
                }

            }

        ];
        vm.fieldPart2 = [
            {
                key: 'productNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '数量',
                    type: 'number'
                }
            },
            {
                key: 'type',
                type: 'horizontalSelect2',
                templateOptions: {
                    label: '型号',
                    options: [
                        {name: '型号212', value: '212'},
                        {name: '型号213', value: '213'},
                        {name: '型号119', value: '119'},
                        {name: '型号122', value: '122'}
                    ]
                }
            },
            {
                key: 'number',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '数量',
                    type: 'number',
                }
            }
            , {
                key: 'price',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '单价',
                }
            },
            {
                key: 'totalPrice',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '金额',
                }
            },

            {
                key: 'encapsulation',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '封装',
                }
            },

        ];
        vm.fieldPart3 = [

            {
                key: 'cable',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '缆经',
                }
            },
            {
                key: 'color',
                type: 'horizontalSelect2',
                templateOptions: {
                    label: '缆色',
                    options: [
                        {name: '白', value: '白'},
                        {name: '红', value: '红'},
                        {name: '黑', value: '黑'},
                    ]
                }
            },
            {
                key: 'splittingRatio',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '分光比',
                }
            },
            {
                key: 'splittingNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '分光芯数',
                }
            },
            {
                key: 'connectedHead',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '连接头',
                }
            },
            {
                key: 'totalCoreNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '总芯数',
                    type: 'number'
                }
            }
        ];

        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.childOrder).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '添加成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                service.back();
            }, function (err) {

            });
        }
    }

    childOrderMerge.$inject = ['PrePlanChildOrderService', 'mergeChildOrderPrepService', '$state', 'notify', 'progress'];
    function childOrderMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;

        vm.fieldPart1 = [
            {
                key: 'timestamp',
                type: 'abreastDatepicker',
                templateOptions: {
                    label: '下单时间',
                    required: true
                }
            },
            {
                key: 'serial',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '订单号',
                    required: true
                }
            },
            {
                key: 'client',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '客户',
                    type: 'text'
                }
            },

            {
                key: 'city',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '城市',
                    options: [
                        {name: '南京', value: '南京'},
                        {name: '东京', value: '东京'},
                        {name: '北京', value: '北京'},
                        {name: '华盛顿', value: '华盛顿'}
                    ]
                }


            },
            {
                key: 'system',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '系统',
                }
            },
            {
                key: 'productName',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '产品名',
                    options: [
                        {name: '路由器', value: '路由器'},
                        {name: '光交换机', value: '光交换机'},
                        {name: '分路器', value: '分路器'},
                        {name: '尾纤', value: '尾纤'}
                    ]
                }

            }

        ];
        vm.fieldPart2 = [
            {
                key: 'productNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '数量',
                    type: 'number'
                }
            },
            {
                key: 'type',
                type: 'horizontalSelect2',
                templateOptions: {
                    label: '型号',
                    options: [
                        {name: '型号212', value: '212'},
                        {name: '型号213', value: '213'},
                        {name: '型号119', value: '119'},
                        {name: '型号122', value: '122'}
                    ]
                }
            },
            {
                key: 'number',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '数量',
                    type: 'number',
                }
            }
            , {
                key: 'price',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '单价',
                }
            },
            {
                key: 'totalPrice',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '金额',
                }
            },

            {
                key: 'encapsulation',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '封装',
                }
            },

        ];
        vm.fieldPart3 = [

            {
                key: 'cable',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '缆经',
                }
            },
            {
                key: 'color',
                type: 'horizontalSelect2',
                templateOptions: {
                    label: '缆色',
                    options: [
                        {name: '白', value: '白'},
                        {name: '红', value: '红'},
                        {name: '黑', value: '黑'},
                    ]
                }
            },
            {
                key: 'splittingRatio',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '分光比',
                }
            },
            {
                key: 'splittingNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '分光芯数',
                }
            },
            {
                key: 'connectedHead',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '连接头',
                }
            },
            {
                key: 'totalCoreNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '总芯数',
                    type: 'number'
                }
            }
        ];
        vm.fields = [
            {
                key: 'timestamp',
                type: 'datepicker',
                templateOptions: {
                    label: '下单时间',
                    required: true
                }
            },
            {
                key: 'serial',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '订单号',
                    required: true
                }
            },
            {
                key: 'client',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '客户',
                    type: 'text'
                }
            },

            {
                key: 'city',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '城市',
                    options: [
                        {name: '南京', value: '南京'},
                        {name: '东京', value: '东京'},
                        {name: '北京', value: '北京'},
                        {name: '华盛顿', value: '华盛顿'}
                    ]
                }


            },
            {
                key: 'system',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '系统',
                }
            },
            {
                key: 'productName',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '产品名',
                    options: [
                        {name: '路由器', value: '路由器'},
                        {name: '光交换机', value: '光交换机'},
                        {name: '分路器', value: '分路器'},
                        {name: '尾纤', value: '尾纤'}
                    ]
                }

            },
            {
                key: 'productNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '数量',
                    type: 'number'
                }
            },
            {
                key: 'type',
                type: 'horizontalSelect',
                templateOptions: {
                    label: '型号',
                    options: [
                        {name: '型号212', value: '212'},
                        {name: '型号213', value: '213'},
                        {name: '型号119', value: '119'},
                        {name: '型号122', value: '122'}
                    ]
                }
            },
            {
                key: 'number',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '数量',
                    type: 'number',
                }
            },
            {
                key: 'price',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '单价',
                }
            },
            {
                key: 'totalPrice',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '金额',
                }
            },

            {
                key: 'encapsulation',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '封装',
                }
            },
            {
                key: 'cable',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '缆经',
                }
            },
            {
                key: 'color',
                type: 'horizontalSelect',
                templateOptions: {
                    label: '缆色',
                    options: [
                        {name: '白', value: '白'},
                        {name: '红', value: '红'},
                        {name: '黑', value: '黑'},
                    ]
                }
            },
            {
                key: 'splittingRatio',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '分光比',
                }
            },
            {
                key: 'splittingNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '分光芯数',
                }
            },
            {
                key: 'connectedHead',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '连接头',
                }
            },
            {
                key: 'totalCoreNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '总芯数',
                    type: 'number'
                }
            },


        ];
        vm.childOrder = preService.childOrder;
        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.childOrder).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '修改子订单成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                service.back();
            }, function (err) {

            });
        }
    }


})();