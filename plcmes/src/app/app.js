(function () {
    var app = angular
        .module('mainApp', [

            'tm.pagination',
            'ui.router',
            'ngMessages',

            'restangular',
            'ngAnimate',

            'progress',
            'formly',
            'formlyBootstrap',
            'ui.bootstrap',


            'formSetting',


            'ngDialog',
            'dialogs.main',
            'pascalprecht.translate',
            'confirmModalModule',
            'ngNotify',
            'cgNotify',
            'ngRap',

            'ngFileUpload',
            'ngImgCrop',
            'ui.select',
            'ng.ueditor',
            'ngSanitize',
            'ui.bootstrap.datetimepicker',


            'directives.crud.buttons',
            'sample',//示例
            'basic-setting',//基本设置
            'produce-process-pre-management',//生产流程准备
            'raw-material-processing',//原材料加工流程管理
            'anti-counterfeit',//防伪查询
            'codeBar',//条形码打印


            'CodingManagement',    //系统编码
            'ProductionProcess',    //主生产工序
            'DataAcquisition',   //生产数据采集
            'Statics',
            "highcharts-ng"


        ]);
    app.run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

    });


    //for test
    app.config(['$httpProvider', 'ngRapProvider', function (httpProvider, ngRapProvider) {
        ngRapProvider.script = 'http://rap.taobao.org/rap.plugin.js?projectId=1290';
        ngRapProvider.enable({
            mode: 3
        });
        httpProvider.interceptors.push('rapMockInterceptor');
    }]);

})();