/**
 * Created by FrankLiu on 12/17/2014.
 */

(function () {
    angular.module('progress', [])
        .factory('progress', progressService)
        .controller('progressBarCtrl', processController);


    progressService.$inject = ['$rootScope'];
    function progressService($rootScope) {
        return {
            start: function () {
                $rootScope.$emit('progress-bar-start');
            },
            stop: function () {
                $rootScope.$emit('progress-bar-stop');
            },
            showCover: function () {
                $rootScope.$emit('cover-show');
            },
            dismissCover: function () {
                $rootScope.$emit('cover-dismiss')
            }
        };

    }

    processController.$inject = ['$scope', '$rootScope', '$window'];
    function processController($scope, $rootScope, $window) {
        var timerId;

        function clearTimer() {
            if (timerId) {
                $window.clearTimeout(timerId);
                timerId = undefined;
            }
        }

        function startCore() {
            $scope.shown = true;
            clearTimer();
        }

        function stopCore() {
            $scope.shown = false;
            clearTimer();
        }

        function start() {
            clearTimer();
            timerId = $window.setTimeout(function () {
                $scope.$apply(startCore);
            }, 500);
        }

        function stop() {
            clearTimer();
            stopCore();
        }

        function showCover() {
            $scope.coverShow = true;
        }

        function dismissCover() {
            $scope.coverShow = false;
        }

        $scope.shown = false;
        $scope.coverShow = false;
        $rootScope.$on('progress-bar-start', start);
        $rootScope.$on('progress-bar-stop', stop);
        $rootScope.$on('cover-show', showCover);
        $rootScope.$on('cover-dismiss', dismissCover);
    }
})();