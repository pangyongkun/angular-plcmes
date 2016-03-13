/**
 * Created by jerry on 1/29/16.
 */

(function () {
    'use strict';
    angular.module('sample')
        .controller('SampleListCtrl', sampleList)
        .controller('SampleEditCtrl', sampleEdit)
        .controller('SampleAddCtrl', sampleAdd);

    sampleList.$inject = ['SampleService', 'progress', 'ConfirmDialog', 'notify'];
    function sampleList(service, progress, confirm, notify) {
        var vm = this;
        var labs = {
            id: '序号',
            username: '角色名',
            realName: '真实姓名',
            role: '角色',
            phone: '联系电话'
        };
        //恢复现场参数
        var lastParams = service.getLastStateParams();
        vm.users = {};
        vm.isLoading = false;
        vm.paginationConf = {
            currentPage: lastParams.page ? lastParams.page : 1,
            itemsPerPage: lastParams.pageSize ? lastParams.pageSize : 10,
            totalItems: 0,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };
        vm.deleteOne = deleteOne;

        ///////////////////////////////////////
        ///////////////////////////////////////////
        /**
         *
         */
        function refresh() {
            vm.isLoading = true;
            service.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功
                    vm.paginationConf.totalItems = result.totalItems;
                    vm.users = result.users;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        /**
         *
         * @param user
         */
        function deleteOne(user) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(user, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });

            var modalInstance = confirm.openDialog(messages);

            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    progress.start();
                    service.deleteOne(user.id).then(function (result) {
                        progress.stop();
                        notify({
                            message: '删除成功',
                            duration: 2000,
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

        /**
         *
         * @param targetPage
         * @param pageSize
         * @param params
         * @returns {*}
         */
        function paginationQuery(targetPage, pageSize, params) {
            return service.getPage(targetPage, pageSize, params);
        }


    }


    /**
     *
     * @type {string[]}
     */
    sampleEdit.$inject = ['SampleService'];
    function sampleEdit(service) {

    }


    sampleAdd.$inject = ['SampleService', '$state', '$timeout', '$sce', '$http', '$q', 'progress', 'notify'];
    /**
     *
     * @param service
     * @param $state
     * @param $timeout
     * @param $sce
     * @param $http
     * @param $q
     * @param progress
     * @param notify
     */
    function sampleAdd(service, $state, $timeout, $sce, $http, $q, progress, notify) {
        var vm = this;
        vm.isMerge = $state.current.data.isMerge;
        vm.user = {};
        vm.picFile = '';
        vm.existingUsers = [
            'jerry',
            'tom'];
        vm.fields = [

            {
                type: 'datepicker',
                templateOptions: {
                    label: '选择日期',
                    type: 'text',

                }
            },
            {
                key: 'timeStamp',
                type: 'timepicker',
                templateOptions: {
                    label: '选取时间'
                }

            },


            {
                key: 'realName',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '真实姓名',
                    required: true,
                    type: 'text',
                    minlength: 2,
                    placeholder: '请输入若干字符'

                },
                asyncValidators: {
                    uniqueUsername: {
                        expression: function ($viewValue, $modelValue, scope) {
                            scope.options.templateOptions.loading = true;
                            return $timeout(function () {
                                scope.options.templateOptions.loading = false;
                                if (vm.existingUsers.indexOf($viewValue) !== -1) {
                                    throw new Error('taken');
                                }
                            }, 1000);
                        },
                        message: '"该用户名已被使用"'
                    }
                }
            },
            {
                key: 'username',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '用户名',
                    required: true,
                    type: 'text',
                    minlength: 1,
                    maxlength: 6,
                    placeholder: '请输入1-6个字符'
                }
            },
            {
                key: 'birthday',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    label: '出生日期',
                    required: true,
                    type: 'date'
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
                    required: true,
                    label: '密码',
                    minlength: 6,
                    maxlength: 12,
                    placeholder: '请输入6-20位字符,至少包含字母和数字'
                }
            },
            {
                key: 'phone',
                type: 'bootstrapHorizontalInput',
                templateOptions: {
                    required: true,
                    label: '联系方式',
                    type: 'text'
                }

            },
            {
                template: '<br><div class="col-sm-3"></div><div class="col-sm-4 text-info" style="height: 20px;font-size: 20px">收货地址</div><br><br>'
            },
            {
                key: 'destination.province',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '请选择省份',
                    options: [],
                    valueProp: 'name',
                    labelProp: 'name',
                    placeholder: '请选择省份'
                },
                controller: /* @ngInject */function ($scope, SampleService) {

                    $scope.to.loading = SampleService.getDestinationProvince().then(function (resp) {
                        $scope.to.options = resp;

                        return resp;
                    });
                }
            },
            {
                key: 'destination.city',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '请选择城市',
                    options: [],
                    valueProp: 'name',
                    labelProp: 'name',
                    placeholder: '请选择城市'
                },
                controller: /* @ngInject */function ($scope, SampleService) {
                    $scope.$watch('model.destination.province', function (newValue, oldValue, theScope) {
                        if (newValue !== oldValue) {
                            // reset this select
                            if ($scope.model[$scope.options.key] && oldValue) {
                                $scope.model[$scope.options.key] = '';
                            }
                            $scope.to.loading = SampleService.getDestinationCity(newValue).then(function (resp) {
                                $scope.to.options = resp;
                            });

                        }
                    })
                }

            },
            {
                key: 'destination.district',
                type: 'horizontalSelect',
                templateOptions: {
                    required: true,
                    label: '请选择地区',
                    options: [],
                    valueProp: 'name',
                    labelProp: 'name'
                },
                controller: /* @ngInject */function ($scope, SampleService) {
                    $scope.$watch('model.destination.city', function (newValue, oldValue, theScope) {
                        if (newValue !== oldValue) {


                            // reset this select
                            if ($scope.model[$scope.options.key] && oldValue) {
                                $scope.model[$scope.options.key] = [''];

                            }


                            $scope.to.loading = SampleService.getDestinationDistrict(newValue).then(function (resp) {
                                $scope.to.options = resp;

                            });

                        }
                    })
                }
            },


            {
                key: 'photo',
                type: 'headerPic'
            },
            {
                template: '<br>'
            },

            {
                type: 'fileUpload',
                templateOptions: {
                    label: '请上传照片',
                    type: 'file',
                    accept: 'image/*'
                }
            },
            {
                template: '<br>'
            },
            {
                type: 'horizontalMultiCheckbox',
                templateOptions: {
                    label: '爱好',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [
                        {name: '足球'},
                        {name: '篮球'},
                        {name: '游泳'}
                    ]
                }
            },
            {
                template: '<br>'
            },
            {
                type: 'horizontalCheckbox',
                templateOptions: {
                    label: '请同意我们的协议',
                    required: true
                }
            },
            {
                key: 'singleOptionAsync',
                type: 'ui-select-single-search',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                    label: '选取城市',
                    valueProp: 'formatted_address',
                    labelProp: 'formatted_address',
                    placeholder: 'Search',
                    options: [],
                    refresh: refreshAddresses,
                    refreshDelay: 0
                }
            },
            {
                key: 'text',
                type: 'UEditor'
            }


        ];

        vm.save = submit;
        vm.getHtml = getHtml;
        vm.back = service.back;

        vm.originalFields = angular.copy(vm.fields);
        //////////////////////////////////////////////
        function getHtml() {
            return $sce.trustAsHtml(vm.user.text);
        }

        function submit() {
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
                var stateParams = service.getLastStateParams();
                $state.go('sample-list');
            }, function (err) {

            });
        }


        function refreshAddresses(address, field) {
            var promise;
            if (!address) {
                promise = $q.when({data: {results: []}});
            } else {
                var params = {address: address, sensor: false};
                var endpoint = '//maps.googleapis.com/maps/api/geocode/json';
                promise = $http.get(endpoint, {params: params});
            }
            return promise.then(function (response) {
                field.templateOptions.options = response.data.results;
            });
        }

    }

})();