/**
 * Created by kun on 2016/1/29.
 */
(function () {
    'use strict';
    angular.module('CirculationNumberAssociate')
        .controller('circulationNumberAssociateListCtrl', listCtrl);

    listCtrl.$inject = ['$state', 'progress', 'ConfirmDialog', 'notify', 'circulationNumberAssociateService'];

    function listCtrl($state, progress, confirm, notify, circulationNumberAssociateService) {
        var vm = this;
        var labs = {
            id: '序号',
            number: '流转编号',
            JYBath: '晶圆批次',
            DXBath: '单纤批次',
            person: '关联人',
            time: "关联时间",
            times: "关联次数"
        };
        /*var circulationNumberAssociates = [
         {
         "id": 1,
         "number": "ZTKD1507000001",
         "JYBath": "123131",
         "FANumber": "321313",
         "DXBath": "431313",
         "person": "李工",
         "time": "2015-8-10 14:00:01",
         "times": 2
         },
         {
         "id": 5,
         "number": "ZTKD1507000002",
         "JYBath": "123131",
         "FANumber": "321313",
         "DXBath": "431313",
         "person": "李工",
         "time": "2015-8-10 14:00:01",
         "times": 5
         }
         ]*/
        vm.circulationNumberAssociates = "";
        vm.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 1,
            //ajax请求
            onChange: function () {
                refresh();
            }
        };

        vm.addCirculationNumberAssociate = addCirculationNumberAssociate;
        vm.deleteCirculationNumberAssociate = deleteCirculationNumberAssociate;
        vm.modifyCirculationNumberAssociate = modifyCirculationNumberAssociate;


        function addCirculationNumberAssociate() {
            $state.go('productionProcess.circulationNumberAssociate.add')
        }

        function deleteCirculationNumberAssociate(circulationNumberAssociate) {
            var messages = ['请确认删除对象信息如下:'];
            angular.forEach(circulationNumberAssociate, function (value, key) {
                if (labs[key]) {
                    messages.push(labs[key] + " : " + value);
                }
            });
            var modalInstance = confirm.openDialog(messages);
            modalInstance.result.then(function (flag) {
                if (flag == true) {
                    //-------如果确定,则执行删除操作-------------

                    progress.start();
                    circulationNumberAssociateService.deleteCirculationNumberAssociate(circulationNumberAssociate.id)
                        .then(function(data){
                            notify({
                                message: '删除成功',
                                duration: 2000,
                                position: 'center',
                                classes: 'alert-success'
                            });
                            progress.stop();
                        },function(reason){
                            progress.stop();
                        })


                    /////////////////////////////////////////
                }
            });
        }

        function modifyCirculationNumberAssociate(circulationNumberAssociate) {
            $state.go('productionProcess.circulationNumberAssociate.modify', {id: circulationNumberAssociate.id});
        }

        function refresh() {
            vm.isLoading = true;
            circulationNumberAssociateService.setLastStateParams(vm.paginationConf.currentPage, vm.itemsPerPage);
            paginationQuery(vm.paginationConf.currentPage, vm.paginationConf.itemsPerPage).then(
                function (result) {
                    //成功

                    vm.paginationConf.totalItems = result.totalItems;
                    vm.circulationNumberAssociates = result.circulationNumberAssociates;
                    vm.isLoading = false;
                },
                function () {
                    //失败
                });
        }

        function paginationQuery(targetPage, pageSize, params) {
            return circulationNumberAssociateService.getPage(targetPage, pageSize, params);
        }


    }
})()