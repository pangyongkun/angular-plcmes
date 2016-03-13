/**
 * Created by jerry on 1/31/16.
 */

(function () {
    'use strict';
    angular.module('anti-counterfeit')
        .controller('AntiCounterCtrl', antiCounter);


    antiCounter.$inject = ['AntiCounterService'];
    function antiCounter(service) {
        var vm = this;

        vm.getInfo = getInfo;
        vm.messages = {};
        vm.isloading = false;

        function getInfo() {
            vm.show = false;
            vm.tipMessage = '正在加载...';
            vm.tip = true;
            if (vm.serial) {

                service.getInfo(vm.serial).then(function (result) {
                    if (result.productBoole) {
                        vm.messages = result;
                        vm.isTrue = true;
                        vm.show = true;
                    } else {
                        vm.isTrue = false;
                        vm.show = true;
                    }
                    vm.tip = false;
                }, function () {
                    vm.tip = false;
                })
            } else {
                vm.tipMessage = '请输入产品出厂编号';
                vm.tip = true;
            }
        }

    }

})();