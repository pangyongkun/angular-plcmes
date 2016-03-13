/**
 * Created by jerry on 16/3/3.
 */
(function () {
    'use strict';
    angular.module('codeBar').controller('CodeBarCtrl', codeBarCtrl);

    codeBarCtrl.$inject = ['ConfirmDialog'];
    function codeBarCtrl(confirmDialog) {
        var vm = this;
        vm.codes = [];
        vm.codes[0] = '';
        vm.add = addCode;
        vm.printCode = printCode;
        vm.remove = remove;

        /////////////////////////////////////////////////////

        function remove(index) {
            vm.codes.splice(index, 1);
        }

        function addCode() {
            vm.codes.push('');
        }

        function printCode() {
            for (var index in vm.codes) {
                if (vm.codes[index] == '') {
                    alert('确保输入条形码');
                    return;
                }
            }


            var modalInstance = confirmDialog.printDialog(vm.codes);



        }
    }
})();