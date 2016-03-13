/**
 * Created by kun on 2016/2/1.
 */

(function () {
    'use strict';
    angular.module('Statics')
        .controller('reportFormCtrl', reportFormCtrl);

    function reportFormCtrl() {
        var vm = this;
        vm.addPoints = function () {
            var seriesArray = vm.chartConfig.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        vm.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            vm.chartConfig.series.push({
                data: rnd
            })
        }

        vm.removeRandomSeries = function () {
            var seriesArray = vm.chartConfig.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1)
        }

        vm.setLineBar = function () {
            this.chartConfig.options.chart.type === 'line'
            this.chartConfig.options.chart.type = 'bar'
        }
        vm.setLine=function(){
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
        vm.setArea=function(){
            this.chartConfig.options.chart.type='area';
        }

        vm.toggleLoading = function () {
            this.chartConfig.loading = !this.chartConfig.loading
        }


        vm.chartConfig = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            title: {
                text: '中天宽带信息采集系统'
            },

            loading: false
        }

        vm.chartConfig1 = {
            options: {
                chart: {
                    type: 'pie'
                }
            },
            series: [{
                data: [10, 15, 12, 50, 7]
            }],
            title: {
                text: '中天宽带信息采集系统'
            },

            loading: false
        }

        vm.chartConfig2 = {
            options: {
                chart: {
                    type: 'spline'
                }
            },
            series: [{
                data: [10, 15, 12, 50, 7]
            }],
            title: {
                text: '中天宽带信息采集系统'
            },

            loading: false
        }
        vm.chartConfig3 = {
            options: {
                chart: {
                    type: 'area'
                }
            },
            series: [{
                data: [10, 15, 12, 50, 7]
            }],
            title: {
                text: '中天宽带信息采集系统'
            },

            loading: false
        }


    }
})()