/**
 * 编辑控制器包含了两个控制器,增加和修改
 * Created by kun on 2016/1/29.
 */

(function () {
    'use strict';
    angular.module('CirculationNumberAssociate')
        .controller('circulationNumberAssociateAddCtrl', circulationNumberAssociateAddCtrl)
        .controller('circulationNumberAssociateModifyCtrl', circulationNumberAssociateModifyCtrl);

    circulationNumberAssociateAddCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify'];
    circulationNumberAssociateModifyCtrl.$inject = ['$state', '$stateParams', 'progress', 'ConfirmDialog', 'notify'];


    function circulationNumberAssociateAddCtrl($state, progress, confirm, notify) {
        var vm = this;
        vm.isModify = false;

        vm.model = {};
        vm.fields = [
            {
                key: 'number',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '流转编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '流转编号'
                }
            },
            {
                key: 'JYBath',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '晶圆批次编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '晶圆批次编号'
                }
            },

            {
                key: 'FANumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'FA编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: 'FA编号'
                }
            },


            {
                key: 'DXBath',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '单纤批次',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '单纤批次'
                }
            }
            ,
            {
                key: 'person',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '关联人',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '关联人'
                }
            }


        ];
        vm.back = back;
        vm.save = save;

        function back() {
            $state.go('productionProcess.circulationNumberAssociate.list');
        }

        function save() {
            $state.go('productionProcess.circulationNumberAssociate.list');
        }

    }

    function circulationNumberAssociateModifyCtrl($state, $stateParams, progress, confirm, notify) {
        var vm = this;
        vm.isModify = true;

        vm.model = {};
        vm.fields = [
            {
                key: 'number',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '流转编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '流转编号'
                }
            },
            {
                key: 'JYBath',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '晶圆批次编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '晶圆批次编号'
                }
            },
            {
                key: 'FANumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: 'FA编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: 'FA编号'
                }
            },
            {
                key: 'DXBath',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '单纤批次',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '单纤批次'
                }
            }
            ,
            {
                key: 'person',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '关联人',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 7,
                    placeholder: '关联人'
                }
            }


        ];
        vm.getCirculationNumberAssociate = getCirculationNumberAssociate;
        vm.save = modifyCirculationNumberAssociate;
        vm.back = back;
        vm.save = save;


        function getCirculationNumberAssociate() {
            var id = $stateParams.id;

        }

        function modifyCirculationNumberAssociate() {
            $state.go('productionProcess.circulationNumberAssociate.list');

        }

        function back() {
            $state.go('productionProcess.circulationNumberAssociate.list');
        }

        function save() {
            $state.go('productionProcess.circulationNumberAssociate.list');
        }

    }
})()
