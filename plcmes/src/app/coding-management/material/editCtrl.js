/**
 * Created by kun on 2016/1/29.
 */

/**
 * 编辑控制器包含了两个控制器,增加和修改
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('Material')
        .controller('materialAddCtrl', materialAddCtrl)
        .controller('materialModifyCtrl', materialModifyCtrl);

    materialAddCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','materialService'];
    materialModifyCtrl.$inject = ['$state','$stateParams', 'progress', 'ConfirmDialog', 'notify','materialService'];


    function materialAddCtrl($state, progress, confirm, notify,materialService) {
        var vm = this;
        vm.isModify = false;

        vm.model = {};
        vm.fields = [
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '物料编码',
                    required: true,
                    type: 'text',
                    placeholder: '物料编码'
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '物料名称',
                    required: true,
                    type: 'text',
                    placeholder: '物料名称'
                }
            },
            {
                key: 'pattern',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '规格型号',
                    required: true,
                    type: 'text',
                    placeholder: '规格型号'
                }
            },
            {
                key: 'unit',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '单位',
                    required: true,
                    type: 'text',
                    placeholder: '单位'
                }
            }


        ];
        vm.back = back;
        vm.save=save;

        function back() {
            $state.go('codingManagement.material.list');
        }
        function save(){
            progress.start()
            materialService.addMaterial(vm.model)
                .then(function(){
                    notify({
                        message: '添加成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.material.list');
        }


    }

    function materialModifyCtrl($state,$stateParams,progress, confirm, notify,materialService) {
        var vm = this;
        vm.isModify = true;

        vm.model = {};
        vm.fields = [
            {
                key: 'code',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '物料编码',
                    required: true,
                    type: 'text',
                    placeholder: '物料编码'
                }
            },
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '物料名称',
                    required: true,
                    type: 'text',
                    placeholder: '物料名称'
                }
            },
            {
                key: 'pattern',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '规格型号',
                    required: true,
                    type: 'text',
                    placeholder: '规格型号'
                }
            },
            {
                key: 'unit',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '单位',
                    required: true,
                    type: 'text',
                    placeholder: '单位'
                }
            }


        ];

        vm.getMaterial=getMaterial;
        vm.back=back;
        vm.save=back;


        function getMaterial(){
            var id=$stateParams.id;
            materialService.getMaterial(id)
                .then(function(data){
                    vm.model=data;
                })
        }
        function back(){
            $state.go('codingManagement.material.list');
        }
        function save(){
            progress.start()
            materialService.modifyMaterial(vm.model)
                .then(function(){
                    notify({
                        message: '修改成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-success'
                    });
                    progress.stop();
                })
            $state.go('codingManagement.material.list');
        }



    }
})()
