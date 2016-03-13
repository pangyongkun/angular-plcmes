/**
 * Created by jerry on 1/19/16.
 *
 */


(function () {
    'use strict';
    var app = angular.module('formSetting');
    app.config(function (formlyConfigProvider) {

        formlyConfigProvider.setType(
            [
                {
                    name: 'customInput',
                    templateUrl: 'partials/formTemplate/input-template1.html',
                    wrapper: ['customWrapper']
                },
                {
                    name: 'customCheckBox',
                    templateUrl: 'partials/formTemplate/checkbox-template.html',
                    wrapper: ['customCheckBoxWrapper']
                }


            ]
        );


        formlyConfigProvider.setWrapper([

            {
                name: 'customWrapper',
                templateUrl: 'partials/formTemplate/wrapperTemplate/customWrapper.html'
            },
            {
                name: 'customCheckBoxWrapper',
                templateUrl: 'partials/formTemplate/wrapperTemplate/customCheckBoxWrapper.html'
            }
        ]);


    })

    /*var app = angular.module('formSetting', [], function config(formlyConfigProvider) {


     formlyConfigProvider.setWrapper([

     {
     name: 'horizontalInputWrapper',
     templateUrl: 'js/components/form/customInputWrapper.html'
     },
     {
     name: 'checkBoxWrapper',
     template: [
     '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
     '<label for="{{::id}}">',
     '<formly-transclude></formly-transclude>',
     '</label>',
     '</div>'
     ].join(' ')
     }, {
     name: 'horizontalBootstrapLabel',
     templateUrl: 'js/components/form/horizontalBootstrapWrapper.html'
     },
     {
     name: 'horizontalCheckboxWrapper',
     template: [
     '<div class="col-sm-offset-3 col-sm-8">',
     '<formly-transclude></formly-transclude>',
     '</div>'
     ].join(' ')
     }, {
     name: 'horizontalRadioGroup',
     templateUrl: 'js/components/form/horizontalBootstrapWrapper.html'
     }, {
     name: 'customWrapper',
     templateUrl: 'partials/formTemplate/wrapperTemplate/customWrapper.html'
     },{
     name:'customCheckBoxWrapper',
     templateUrl:'partials/formTemplate/wrapperTemplate/customCheckBoxWrapper.html'
     }
     ]);


     formlyConfigProvider.setType(
     [
     {
     name: 'customHorizontalInputWrapper',
     templateUrl: 'js/components/form/customInputWrapper.html',
     wrapper: ['horizontalInputWrapper']
     },

     {
     name: 'bootstrapHorizontalInput',
     extends: 'input',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
     },
     {
     name: 'horizontalCheckbox',
     extends: 'checkbox',
     wrapper: ['horizontalCheckboxWrapper']

     },
     {
     name: 'horizontalRadio',
     extends: 'radio',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']

     },
     {
     name: 'horizontalTextarea',
     extends: 'textarea',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
     },
     {
     name: 'horizontalSelect',
     extends: 'select',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
     },
     {
     name: 'fileUpload',
     templateUrl: 'js/components/form/fileInput.html',
     wrapper: ['horizontalInputWrapper', 'bootstrapHasError']
     },
     {
     name: 'horizontalMultiCheckbox',
     extends: 'multiCheckbox',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
     },
     {
     name: 'ui-select-single-search',
     templateUrl: 'js/components/form/customTemplate/ui-select-single-search.html',
     extends: 'select',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
     },
     {
     name: 'ui-select-single-search-2',
     templateUrl: 'js/components/form/customTemplate/ui-select-search.html',
     extends: 'select',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']

     },
     {
     name: 'datepicker',
     templateUrl: 'js/components/form/customTemplate/datePicker.html',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
     defaultOptions: {
     templateOptions: {
     datepickerOptions: {
     format: 'yyyy.MM.dd',
     initDate: new Date()
     }
     }
     },
     controller: ['$scope', function ($scope) {
     $scope.datepicker = {};

     $scope.datepicker.opened = false;

     $scope.datepicker.open = function ($event) {
     $scope.datepicker.opened = !$scope.datepicker.opened;
     };
     }]

     },
     {
     name: 'timepicker',
     template: '<timepicker show-meridian="false" ng-model="model[options.key]"></timepicker><button type="button" ng-click="timepicker.nowTime()" class="btn btn-info2">当前时间</button>',
     wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
     defaultOptions: {
     templateOptions: {
     datepickerOptions: {}
     }
     },
     controller: ['$scope', function ($scope) {
     $scope.timepicker = {};
     $scope.timepicker.nowTime = function () {
     var newDate = new Date();
     $scope.options.value(newDate);//设置当前值

     }
     }]
     },
     {
     name: 'customInput',
     templateUrl: 'partials/formTemplate/input-template1.html',
     wrapper: ['customWrapper']
     },
     {
     name:'customCheckBox',
     templateUrl:'partials/formTemplate/checkbox-template.html'
     }


     ]
     );
     });

     app.run(function (formlyConfig, formlyValidationMessages) {
     formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
     formlyValidationMessages.addStringMessage('maxlength', 'Your input is WAAAAY too long!');
     formlyValidationMessages.messages.pattern = function (viewValue, modelValue, scope) {
     return viewValue + ' 无效';
     };
     formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');

     });*/


})();
