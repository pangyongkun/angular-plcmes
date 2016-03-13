/**
 * 编辑控制器包含了两个控制器,增加和修改
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('Process')
        .controller('processAddCtrl', processAddCtrl)
        .controller('processModifyCtrl', processModifyCtrl);

    processAddCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','processService'];
    processModifyCtrl.$inject = ['$state','$stateParams', 'progress', 'ConfirmDialog', 'notify','processService'];


    function processAddCtrl($state, progress, confirm, notify,processService) {
        var vm = this;
        vm.isModify = false;

        vm.model = {};
        vm.fields = [
            {
                key: 'group',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '所属组别',
                    options: [
                        {name: 'A组-芯片FA', value: 'a-fa'},
                        {name: 'B组-芯片Fa', value: 'b-fa'}
                    ]
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '工序名称',
                    required: true,
                    type: 'text',
                    placeholder: '工序名称'
                }
            },
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '工序编码',
                    required: true,
                    type: 'text',
                    placeholder: '两位数字'
                }
            },
            {
                key: 'time',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '标准工时',
                    required: true,
                    type: 'text',
                    placeholder: '标准工时'
                }
            }
        ]
        vm.back = back;
        vm.save=save;

        function back() {
            $state.go('codingManagement.process.list');
        }
        function save() {
            progress.start();
            processService.addProcess(vm.model)
                .then(function(){
                    notify({
                        message: '添加成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.process.list');
        }


    }

    function processModifyCtrl($state,$stateParams,progress, confirm, notify,processService) {
        var vm = this;
        vm.isModify = true;

        vm.model = {};
        vm.fields = [
            {
                key: 'group',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '所属组别',
                    options: [
                        {name: 'A组-芯片FA', value: 'a-fa'},
                        {name: 'B组-芯片Fa', value: 'b-fa'}
                    ]
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '工序名称',
                    required: true,
                    type: 'text',
                    placeholder: '工序名称'
                }
            },
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '工序编码',
                    required: true,
                    type: 'text',
                    placeholder: '两位数字'
                }
            },
            {
                key: 'time',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '标准工时',
                    required: true,
                    type: 'text',
                    placeholder: '标准工时'
                }
            }
        ];
        vm.getProcess=getProcess;
        vm.modifyProcess=modifyProcess;
        vm.back=back;
        vm.save=save;


        function getProcess(){
            var id=$stateParams.id;
            processService.getProcess(id)
                .then(function(data){
                    vm.model=data;
                });
        }
        function modifyProcess(process){
            progress.start();
            processService.modifyProcess(process)
                .then(function(data){
                    $state.go('codingManagement.process.list')
                    progress.stop();
                })
        }
        function back(){
            $state.go('codingManagement.process.list');
        }
        function save(){
            progress.start();
            processService.modifyProcess(vm.model)
                .then(function(){
                    notify({
                        message: '修改成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.process.list');
        }

    }
})()