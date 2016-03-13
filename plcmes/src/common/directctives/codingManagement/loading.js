/**
 * Created by kun on 2016/1/22.
 */

var app = angular.module('loading', []);


app
    .controller('loadingCtrl', function ($window, $rootScope, $scope) {

        $scope.loadingShow = false;//初始隐藏

        $rootScope.$on('loading-show', function () {  //接收loading-show并显示加载loading
            $scope.loadingShow=true;
        });

        $rootScope.$on('loading-hide', function () {  //接收loading-hide并隐藏loading
            $window.setTimeout(function () {
                $scope.loadingShow=false;
            }, 500)
        })

    })
    .factory('loadingService', function ($rootScope) {
        return {
            start: function () {
                $rootScope.$emit('loading-show');//向父作用域中传入loaing-show
            },
            stop: function () {
                $rootScope.$emit('loading-hide')//向父作用域中船入loading-hide
            }
        }
    })


