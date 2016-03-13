/**
 * Created by jerry on 1/29/16.
 * 全局后退
 * controller 注入 backup 服务
 * 调用backup.back()
 *
 */

angular.module('service.backup', [])
    .factory('backup', backup);

backup.$inject = ['$state'];
function backup( $state) {
    var backupState = '';
    var backupParams = '';
    var backup = {
        back: back,
        setBackup: setBackup
    };
    return backup;


    ///
    function back() {
        $state.go(backupState, backupParams);
    }

    function setBackup(evt, toState, toParams, fromState, fromParams) {
        backupState = fromState;
        backupParams = fromParams;
    }


}