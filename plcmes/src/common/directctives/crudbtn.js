/**
 * Created by jerry on 1/29/16.
 */
angular.module('directives.crud.buttons', [])

    .directive('crudButtons', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="btn-group">' +
            '  <button type="button" class="btn btn-info btn-round"  ng-click="vm.info()">详情</button>' +
            '  <button type="button" class="btn btn-warning btn-round" ng-click="vm.merge()" >修改</button>' +
            '  <button type="button" class="btn btn-danger btn-round" ng-click="vm.deleteOne()">删除</button>' +
            '</div>'
        };
    });