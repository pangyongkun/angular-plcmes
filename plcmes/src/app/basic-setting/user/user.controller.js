/**
 * Created by jerry on 1/29/16.
 */
/**
 * Created by jerry on 1/29/16.
 */
(function () {
    'use strict';
    angular.module('basic-setting.user')
        .controller('BasicSettingUserListCtrl', userList)
        .controller('BasicSettingUserAddCtrl', userAdd)
        .controller('BasicSettingUserMergeCtrl', userMerge);


    userList.$inject = ['basicSettingUsersService', 'progress', 'ConfirmDialog', 'notify', '$state', '$stateParams'];
    function userList(service, progress, confirmDialog, notify, $state, $stateParams) {
        var vm = this;
        var labs = {
            id: '序号',
            username: '用户名',
            realName: '真实姓名',
            role: '角色',
            phone: '联系电话'
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
                vm.users = result.users;
                vm.isLoading = false;
            });
        }

        function deleteOne(user) {
            var messages = ['确认对象信息如下'];
            angular.forEach(user, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + ' : ' + value)
                }
            });
            var modalInstance = confirmDialog.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(user.id).then(function (result) {
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

    userAdd.$inject = ['basicSettingUsersService', '$state', '$stateParams', 'progress', 'notify'];
    function userAdd(service, $state, $stateParams, progress, notify) {
        var vm = this;
        vm.isMerge = false;
        vm.user = {};
        vm.userFields = [
            {
                key: 'username',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '用户名',
                    required: true,
                    minlength: 1,
                    maxlength: 10,
                    placeholder: '长度1-10个字符',
                }
            },
            {
                key: 'realName',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '真实姓名',
                    placeholder: '长度 2-5 字符',
                    minlength: 2,
                    maxlength: 10
                }
            },
            {
                key: 'birthday',
                type: 'datepicker',
                templateOptions: {
                    label: '出生日期',
                    type: 'text'

                }
            },
            {
                key: 'gender',
                type: 'horizontalRadio',
                templateOptions: {
                    required: true,
                    label: '性别',
                    options: [
                        {
                            name: '男',
                            value: 'male'
                        },
                        {
                            name: '女',
                            value: 'female'
                        }
                    ]
                }
            },
            {
                key: 'role',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '角色',
                    options: [
                        {name: '高级管理员', value: '高级管理员'},
                        {name: '超级管理员', value: '超级管理员'}
                    ]
                }


            },
            {
                key: 'password',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '密码',
                    placeholder: '长度 2-5 字符',
                    minlength: 2,
                    maxlength: 10
                }
            },
            {
                key: 'phone',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '联系电话',
                    placeholder: '请输入有效手机号'
                },
                validators: {
                    phone: {
                        expression: function (viewValue, modelValue) {
                            var value = modelValue || viewValue;
                            return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value);
                        },
                        message: '$viewValue + " 不是一个有效的电话号码" '
                    }
                },
            }


        ];
        vm.save = saveSubmit;
        vm.back = service.back;

        //////////////////////////////////////////////////////////////////////////////////
        function saveSubmit() {

            progress.start();
            service.save(vm.user).then(function (result) {
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

    userMerge.$inject = ['basicSettingUsersService', 'mergeUserPrepService', '$state', 'notify', 'progress'];
    function userMerge(service, preService, $state, notify, progress) {
        var vm = this;
        vm.isMerge = true;
        vm.userFields = [
            {
                key: 'username',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '用户名',
                    required: true,
                    minlength: 1,
                    maxlength: 10,
                    placeholder: '长度1-10个字符',
                }
            },
            {
                key: 'realName',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '真实姓名',
                    placeholder: '长度 2-5 字符',
                    minlength: 2,
                    maxlength: 10
                }
            },
            {
                key: 'birthday',
                type: 'datepicker',
                templateOptions: {
                    label: '出生日期',
                    type: 'text'

                }
            },
            {
                key: 'gender',
                type: 'horizontalRadio',
                templateOptions: {
                    required: true,
                    label: '性别',
                    options: [
                        {
                            name: '男',
                            value: 'male'
                        },
                        {
                            name: '女',
                            value: 'female'
                        }
                    ]
                }
            },
            {
                key: 'role',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '角色',
                    options: [
                        {name: '高级管理员', value: '高级管理员'},
                        {name: '超级管理员', value: '超级管理员'}
                    ]
                }


            },
            {
                key: 'realName',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '密码',
                    placeholder: '长度 2-5 字符',
                    minlength: 2,
                    maxlength: 10
                }
            },
            {
                key: 'phone',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '联系电话',
                    placeholder: '请输入有效手机号',
                    required:true
                },
                //validators: {
                //    phone: {
                //        expression: function (viewValue, modelValue) {
                //            var value = modelValue || viewValue;
                //            return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value);
                //        },
                //        message: '$viewValue + " 不是一个有效的电话号码"'
                //    }
                //},
            }


        ];
        vm.user = preService.user;
        vm.merge = mergeSubmit;
        vm.back = service.back;
        //////////////////////////////////////////////////////////////////////////////////
        function mergeSubmit() {
            progress.start();
            service.merge(vm.user).then(function (result) {
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