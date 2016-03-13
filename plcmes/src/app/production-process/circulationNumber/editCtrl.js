/**
 * Created by kun on 2016/1/30.
 */

(function () {
    'use strict';
    angular.module('CirculationNumber')
        .controller('circulationNumberAddCtrl', circulationNumberAddCtrl)
        .controller('circulationNumberModifyCtrl', circulationNumberModifyCtrl)
        .controller('circulationNumberPrintCtrl', circulationNumberPrintCtrl);

    circulationNumberAddCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify'];
    circulationNumberModifyCtrl.$inject = ['$state','$stateParams', 'progress', 'ConfirmDialog', 'notify'];
    circulationNumberPrintCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify'];


    function circulationNumberAddCtrl($state, progress, confirm, notify) {
        var vm = this;
        vm.edit = 'add';

        vm.model = {};
        vm.fields = [
            {
                key: 'startNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '起始流转编号',
                }
            },
            {
                key: 'total',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '编号总数',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '编号总数'
                }
            },
            {
                key: 'endNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '结束流程编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '结束流程编号'
                }
            },
            {
                key: 'remark',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '备注',
                    required: true,
                    type: 'text',
                    placeholder: '备注'
                }
            }


        ];
        vm.back = back;
        vm.save=save;

        function back() {
            $state.go('productionProcess.circulationNumber.list');
        }
        function save() {
            $state.go('productionProcess.circulationNumber.list');
        }

    }

    function circulationNumberModifyCtrl($state,$stateParams,progress, confirm, notify) {
        var vm = this;
        vm.edit = 'modify';

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
                    minlength: 1,
                    maxlength: 6,
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
                    minlength: 1,
                    maxlength: 3,
                    placeholder: '不良原因编码'
                }
            }


        ];
        vm.getProcess=getProcess;
        vm.modifyProcess=modifyProcess;
        vm.back = back;
        vm.save=save;

        function getProcess(){
            var id=$stateParams.id;

        }
        function modifyProcess(process){
            progress.start();

        }


        function back() {
            $state.go('productionProcess.circulationNumber.list');
        }
        function save() {
            $state.go('productionProcess.circulationNumber.list');
        }

    }

    function circulationNumberPrintCtrl($state, progress, confirm, notify) {
        var vm = this;
        vm.edit = 'print';

        vm.model = {};
        vm.fields = [
            {
                key: 'startNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '起始流转编号',
                }
            },
            {
                key: 'total',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '编号总数',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '编号总数'
                }
            },
            {
                key: 'endNumber',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '结束流程编号',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '结束流程编号'
                }
            },
           ];
        vm.back = back;
        vm.save=save;

        function back() {
            $state.go('productionProcess.circulationNumber.list');
        }
        function save() {
            $state.go('productionProcess.circulationNumber.list');
        }
    }
})()

