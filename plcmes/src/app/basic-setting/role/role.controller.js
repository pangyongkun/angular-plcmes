/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('basic-setting.role')
        .controller('BasicSettingRoleListCtrl', roleList)
        .controller('BasicSettingRoleAddCtrl', roleAdd)
        .controller('BasicSettingRoleMergeCtrl', roleMerge);


    roleList.$inject = ['basicSettingRolesService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function roleList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            name: '角色名',
            description: '描述'
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
            });
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage);
        }

        function paginationQuery(targetPage, itemsPerpage, params) {
            vm.isLoading = true;
            service.paginationQuery(targetPage, itemsPerpage, params).then(function (data) {
                vm.paginationConf.totalItems = data.totalNumber;
                vm.roles = data.roles;
                vm.isLoading = false;
            });
        }

        function deleteOne(role) {
            var messages = ['确认对象信息如下'];
            angular.forEach(role, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + ' : ' + value)
                }

            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(role.id).then(function (result) {
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

    roleAdd.$inject = ['basicSettingRolesService', '$state', '$stateParams', 'progress', 'notify'];
    function roleAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.role = {};
        vm.fields = [
            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '角色名',
                    required: true,
                    minlength: 1,
                    maxlength: 10,
                    placeholder: '长度1-10个字符',
                    //"addonLeft": {
                    //    "class": "glyphicon glyphicon-user"
                    //}
                }
            },
            {
                key: 'description',
                type: 'horizontalTextarea',
                templateOptions: {
                    label: '权限说明',
                    placeholder: '描述一下这个权限',
                    rows: 5
                }
            },
            {
                type: 'horizontalMultiCheckbox',
                key: 'permissions',
                templateOptions: {
                    label: '权限设置',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [
                        {name: '系统基本设置'},
                        {name: '系统编码管理'},
                        {name: '生产准备流程管理'},
                        {name: '原材料加工流程'},
                        {name: '生产流程管理'},
                        {name: '生产数据采集管理'},
                        {name: '数据统计分析管理'}
                    ]
                }
            },


        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.role).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '添加角色成功',
                        duration: 2000,
                        position: 'center',
                        classes: 'alert-danger'
                    });
                service.back();
            }, function (err) {

            });
        }


    }

    roleMerge.$inject = ['basicSettingRolesService', 'mergeRolePrepService', '$state', 'notify', 'progress'];
    function roleMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;
        vm.fields = [
            {
                key: 'id',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '编号',
                    disabled: true
                }


            },

            {
                key: 'name',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '角色名',
                    required: true,
                    minlength: 1,
                    maxlength: 10,
                    placeholder: '长度1-10个字符',
                    //"addonLeft": {
                    //    "class": "glyphicon glyphicon-user"
                    //}
                }
            },
            {
                key: 'description',
                type: 'horizontalTextarea',
                templateOptions: {
                    label: '权限说明',
                    placeholder: '描述一下这个权限',
                    rows: 5
                }
            },
            {
                type: 'horizontalMultiCheckbox',
                key: 'permissions',
                templateOptions: {
                    label: '权限设置',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [
                        {name: '系统基本设置'},
                        {name: '系统编码管理'},
                        {name: '生产准备流程管理'},
                        {name: '原材料加工流程'},
                        {name: '生产流程管理'},
                        {name: '生产数据采集管理'},
                        {name: '数据统计分析管理'}
                    ]
                }
            }

        ];
        vm.role = preService.role;

        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.role).then(function (result) {
                progress.stop();
                notify(
                    {
                        message: '修改角色成功',
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