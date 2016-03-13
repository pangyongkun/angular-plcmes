/**
 * Created by kun on 2016/1/29.
 */
(function () {
    'use strict';
    angular.module('Material')
        .controller('materialListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify','materialService'];

    function listCtrl($state, progress, confirm, notify,materialService) {
        var vm = this;
        var labs = {
            id: '序号',
            code: '物料编码',
            name: '物料名称',
            pattern: '规格型号',
            unit: '单位',
            time:'编码时间'
        };
       /* var materials = [
            {
                "id": 1,
                "code": "0001",
                "name": "晶圆",
                "pattern": "1分12",
                "unit": "个",
                "time": "2015-8-10 12:00:00"
            },
            {
                "id": 2,
                "code": "0002",
                "name": "晶圆",
                "pattern": "1分8",
                "unit": "个",
                "time": "2015-8-10 12:00:00"
            },
            {
                "id": 3,
                "code": "0003",
                "name": "芯片",
                "pattern": "1分8",
                "unit": "只",
                "time": "2015-8-10 12:00:00"
            }
        ]*/
        vm.materials = "";
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };

        vm.addMaterial = addMaterial;
        vm.deleteMaterial = deleteMaterial;
        vm.modifyMaterial = modifyMaterial;


        function addMaterial() {
            $state.go('codingManagement.material.add')
        }

        function deleteMaterial(material) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(material, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------
                    progress.start();
                    materialService.deleteMaterial(material.id)
                        .then(function(data){
                            progress.stop();
                            notify({
                                message: '删除成功',
                                duration: 2000,
                                position: 'center',
                                classes: 'alert-success'
                            });
                            refresh();
                        })

                    /////////////////////////////////////////
                }
            });
        }

        function modifyMaterial(material) {
            $state.go('codingManagement.material.modify', {id: material.id});
        }

        function refresh() {
            vm.isLoading = true;
            materialService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.materials = result.materials;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return materialService.getPage(targetPage, pageSize, params);
        }

    }
})()
