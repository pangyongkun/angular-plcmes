/**
 * Created by jerry on 1/30/16.
 */

(function () {
    angular.module('produce-process-pre-management.plan.order')
        .controller('prePlanOrderListCtrl', prePlanOrderList)
        .controller('prePlanOrderAddCtrl', prePlanOrderAdd)
        .controller('prePlanOrderMergeCtrl', prePlanOrderMerge);


    prePlanOrderList.$inject = ['PrePlanOrderService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function prePlanOrderList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            timestamp: '下单时间',
            serial: '订单号',
            client: '客户',
            productName: '产品名称',
            productNumber: '包含产品型号数'
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
                vm.orders = result.orders;
                vm.isLoading = false;
            });
        }

        function deleteOne(order) {
            var messages = ['确认对象信息如下'];
            angular.forEach(order, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + ' : ' + value)
                }
            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(order.id).then(function (result) {
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

    prePlanOrderAdd.$inject = ['PrePlanOrderService', '$state', '$stateParams', 'progress', 'notify'];
    function prePlanOrderAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        var date = new Date();
        vm.isMerge = false;
        vm.order = {
            productTypes: [{}]
        };


        vm.fieldsPart1 = [
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
            }
        ];

        vm.fieldsPart2 = [
            {

                key: 'client',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '客户',
                    required: true
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
                        {name: '北京', value: '北京'},
                        {name: '东京', value: '东京'},
                        {name: '华盛顿', value: '华盛顿'},

                    ]
                }
            },
        ];
        vm.fieldsPart3 = [


            {

                key: 'system',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '系统',
                    required: true
                }
            },
            {

                key: 'productName',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '产品名称',
                    options: [
                        {name: '路由器', value: '路由器'},
                        {name: '光交换机', value: '光交换机'},
                        {name: '分路器', value: '分路器'},
                        {name: '尾纤', value: '尾纤'},
                    ]
                }
            }


        ];

        vm.childFiledsPart1 = [
            {
                key: 'type',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '型号',
                    options: [
                        {name: '213', value: '213'},
                        {name: '119', value: '119'},
                        {name: '110', value: '100'},
                    ]
                }
            },
            {
                key: 'number',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    type: 'number',
                    required: true,
                    label: '数量',
                    placeholder: '该型号数量'
                }
            },
            {
                key: 'price',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '单价',
                    type: 'number'
                }
            },
            {
                key: 'totalPrice',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '金额',
                }
            }
        ];

        vm.childFiledsPart2 = [
            {
                key: 'encapsulation',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '封装',

                }
            },
            {
                key: 'cable',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '缆经',

                }
            },
            {


                key: 'color',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '缆色',
                    options: [
                        {name: '红', value: '红'},
                        {name: '白', value: '白'},
                        {name: '黑', value: '黑'},
                    ]
                }
            },

            {
                key: 'splittingRatio',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '分光比',
                    options: [
                        {name: '1.1', value: '1.1'},
                        {name: '1.2', value: '1.2'},
                        {name: '2.2', value: '2.2'},
                    ]
                }
            }
        ];

        vm.childFiledsPart3 = [

            {
                key: 'splittingNumber',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '分光芯数',
                    options: [
                        {name: '11', value: '11'},
                        {name: '12', value: '12'},
                        {name: '22', value: '22'},
                    ]
                }
            },

            {
                key: 'connectedHead',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '连接头',
                    options: [
                        {name: 'FC', value: 'FC'},
                        {name: 'FI', value: 'FI'},
                        {name: 'FB', value: 'FB'},
                    ]
                }
            },
            {
                key: 'totalCoreNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '总芯数'
                }
            }

        ];

        vm.save = saveSubmit;
        vm.back = service.back;
        vm.addType = addType;
        vm.remove = remove;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.order).then(function (result) {
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

        function addType() {
            vm.order.productTypes.push({});
        }

        function remove(start) {
            if (vm.order.productTypes.length > 1) {
                vm.order.productTypes.splice(start, 1);
            }
        }


    }

    prePlanOrderMerge.$inject = ['PrePlanOrderService', 'mergeOrderPrepService', '$state', 'notify', 'progress'];
    function prePlanOrderMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;
        vm.fieldsPart1 = [
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
            }
        ];

        vm.fieldsPart2 = [
            {

                key: 'client',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '客户',
                    required: true
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
                        {name: '北京', value: '北京'},
                        {name: '东京', value: '东京'},
                        {name: '华盛顿', value: '华盛顿'},

                    ]
                }
            },
        ];
        vm.fieldsPart3 = [


            {

                key: 'system',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    label: '系统',
                    required: true
                }
            },
            {

                key: 'productName',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '产品名称',
                    options: [
                        {name: '路由器', value: '路由器'},
                        {name: '光交换机', value: '光交换机'},
                        {name: '分路器', value: '分路器'},
                        {name: '尾纤', value: '尾纤'},
                    ]
                }
            }


        ];

        vm.childFiledsPart1 = [
            {
                key: 'type',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '型号',
                    options: [
                        {name: '213', value: '213'},
                        {name: '119', value: '119'},
                        {name: '110', value: '100'},
                    ]
                }
            },
            {
                key: 'number',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    type: 'number',
                    required: true,
                    label: '数量',
                    placeholder: '该型号数量'
                }
            },
            {
                key: 'price',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '单价',
                    type: 'number'
                }
            },
            {
                key: 'totalPrice',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '金额',
                }
            }
        ];

        vm.childFiledsPart2 = [
            {
                key: 'encapsulation',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '封装',

                }
            },
            {
                key: 'cable',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '缆经',

                }
            },
            {


                key: 'color',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '缆色',
                    options: [
                        {name: '红', value: '红'},
                        {name: '白', value: '白'},
                        {name: '黑', value: '黑'},
                    ]
                }
            },

            {
                key: 'splittingRatio',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '分光比',
                    options: [
                        {name: '1.1', value: '1.1'},
                        {name: '1.2', value: '1.2'},
                        {name: '2.2', value: '2.2'},
                    ]
                }
            }
        ];

        vm.childFiledsPart3 = [

            {
                key: 'splittingNumber',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '分光芯数',
                    options: [
                        {name: '11', value: '11'},
                        {name: '12', value: '12'},
                        {name: '22', value: '22'},
                    ]
                }
            },

            {
                key: 'connectedHead',
                type: 'horizontalSelect2',
                templateOptions: {
                    required: true,
                    label: '连接头',
                    options: [
                        {name: 'FC', value: 'FC'},
                        {name: 'FI', value: 'FI'},
                        {name: 'FB', value: 'FB'},
                    ]
                }
            },
            {
                key: 'totalCoreNumber',
                type: 'bootstrapHorizontalInput2',
                templateOptions: {
                    required: true,
                    label: '总芯数'
                }
            }

        ];

        vm.order = preService.order;
        vm.merge = mergeSubmit;
        vm.back = service.back;
        vm.addType = addType;
        vm.remove = remove;

        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.order).then(function (result) {
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

        function addType() {
            vm.order.productTypes.push({});
        }

        function remove(start) {
            if (vm.order.productTypes.length > 1) {
                vm.order.productTypes.splice(start, 1);
            }
        }
    }


})();
