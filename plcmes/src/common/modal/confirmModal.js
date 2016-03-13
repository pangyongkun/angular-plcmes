/**
 * Created by jerry on 1/21/16.
 */

(function () {
    "use strict";
    angular.module('confirmModalModule', [])
        .controller('ConfirmModalCtrl', confirmModalInstance)
        .controller('CutHeaderPicCtrl', cutHeaderPic)
        .controller('PrintCodeCtrl', printDialogCtrl)
        .factory('ConfirmDialog', injectConfirmModal);

    confirmModalInstance.$inject = ['$uibModalInstance', 'messages'];
// Please note that $modalInstance represents a modal window (instance) dependency.
    function confirmModalInstance($uibModalInstance, messages) {
        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        vm.messages = messages;


        ///////////////////////////////////////////////
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close(true);
        }
    }


    cutHeaderPic.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'picFile'];
    function cutHeaderPic($scope, $uibModalInstance, $uibModal, picFile) {

        var reader = new FileReader();

        //$scope.picFile = reader.result;
        reader.onload = loadCallBack;

        reader.readAsDataURL(picFile);
        console.log(reader);
        //console.log(reader.result);


        $scope.ok = ok;
        $scope.cancel = cancel;


        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        function loadCallBack(evt) {
            var result = evt.target.result;
            console.log(result);
        }

        function ok() {
            $uibModalInstance.close(vm.croppedDataUrl);
        }


        function cancel() {
            $uibModalInstance.dismiss('cancel')
        }


    }

    printDialogCtrl.$inject = ['$scope', '$uibModalInstance', 'progress', 'codes'];
    function printDialogCtrl($scope, $uibModalInstance, progress, codes) {
        progress.showCover();
        //webSocket
        $scope.codes = codes;
        $scope.index = 1;

        /////////////////////
        function cancel() {
            progress.dismissCover();
            $uibModalInstance.dismiss(false);
        }

        function ok() {
            progress.dismissCover();
            $uibModalInstance.close(true);
        }

    }

    injectConfirmModal.$inject = ['$uibModal'];
    function injectConfirmModal($uibModal) {

        var confirmDialog = {
            openDialog: openDialog,
            openCutPIcModal: openCutPIcModal,
            printDialog: printDialog
        };
        return confirmDialog;


        //////////////////////////////////////
        function openCutPIcModal(picFile) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'common/modal/shortCutModal.html',
                controller: 'CutHeaderPicCtrl',
                size: 'md',
                resolve: {
                    picFile: function () {
                        return picFile;
                    }
                }
            })
        }

        function openDialog(messages) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'common/modal/confirmDialog.html',
                controller: 'ConfirmModalCtrl',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    messages: function () {
                        return messages;
                    }
                }
            });
        }

        function printDialog(codes) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'common/modal/printDialog.html',
                controller: 'PrintCodeCtrl',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    codes: function () {
                        return codes;
                    }
                }
            });
        }


    }

})();