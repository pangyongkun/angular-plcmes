
/**
 * 编辑控制器包含了两个控制器,增加和修改
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('BadReason')
        .controller('badReasonAddCtrl', badReasonAddCtrl)
        .controller('badReasonModifyCtrl', badReasonModifyCtrl);

    badReasonAddCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','badReasonService'];
    badReasonModifyCtrl.$inject = ['$state','$stateParams', 'progress', 'ConfirmDialog', 'notify','badReasonService'];


    function badReasonAddCtrl($state, progress, confirm, notify,badReasonService) {
        var vm = this;
        vm.isModify = false;

        vm.model = {};
        vm.fields = [
            {
                key: 'process',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '所属工序名称',
                    options: [
                        {name: '半成品检测', value: 'process1'},
                        {name: '成品检测', value: 'process2'}
                    ]
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '不良原因',
                    required: true,
                    type: 'text',
                    placeholder: '不良原因'
                }
            },
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '不良原因编码',
                    required: true,
                    type: 'text',
                    placeholder: '不良原因编码'
                }
            }


        ];
        vm.back = back;
        vm.save=save;

        function back() {
            $state.go('codingManagement.badReason.list');
        }
        function save(){
            progress.start()
            badReasonService.addBadReason(vm.model)
                .then(function(){
                    notify({
                        message: '添加成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.badReason.list');
        }

    }

    function badReasonModifyCtrl($state,$stateParams,progress, confirm, notify,badReasonService) {
        var vm = this;
        vm.isModify = true;

        vm.model = {};
        vm.fields = [
            {
                key: 'process',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '所属工序名称',
                    options: [
                        {name: '半成品检测', value: 'process1'},
                        {name: '成品检测', value: 'process2'}
                    ]
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '不良原因',
                    required: true,
                    type: 'text',
                    placeholder: '不良原因'
                }
            },
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '不良原因编码',
                    required: true,
                    type: 'text',
                    placeholder: '不良原因编码'
                }
            }


        ];
        vm.back=back;
        vm.save=save;
        vm.getBadReason=getBadReason;


        function getBadReason(){
            var id=$stateParams.id;
            badReasonService.getBadReason(id)
                .then(function(data){
                    vm.model=data;
                })
        }
        function back() {
            $state.go('codingManagement.badReason.list');
        }
        function save(){
            progress.start()
            badReasonService.modifyBadReason(vm.model)
                .then(function(){
                    notify({
                        message: '修改成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.badReason.list');
        }
    }
})()
