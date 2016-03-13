/**
 * Created by jerry on 1/19/16.
 *
 */


(function () {
    'use strict';
    var app = angular.module('formSetting', [], function config(formlyConfigProvider) {


        formlyConfigProvider.setWrapper([

            {
                name: 'horizontalInputWrapper',
                templateUrl: 'common/form/customInputWrapper.html'
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
                templateUrl: 'common/form/horizontalBootstrapWrapper.html'
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
                templateUrl: 'common/form/horizontalBootstrapWrapper.html'
            },
            {
                name: 'horizontalBootstrapSimple',
                templateUrl: 'common/form/horizontalBootstrapSimple.html'
            }
        ]);


        formlyConfigProvider.setType(
            [
                {
                    name: 'customHorizontalInputWrapper',
                    templateUrl: 'common/form/customInputWrapper.html',
                    wrapper: ['horizontalInputWrapper']
                },

                {
                    name: 'bootstrapHorizontalInput',
                    extends: 'input',
                    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
                },
                {
                    name: 'bootstrapHorizontalInput2',
                    extends: 'input',
                    wrapper: ['horizontalBootstrapSimple', 'bootstrapHasError']
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
                    name: 'horizontalSelect2',
                    extends: 'select',
                    wrapper: ['horizontalBootstrapSimple', 'bootstrapHasError']
                },
                {
                    name: 'fileUpload',
                    templateUrl: 'common/form/fileInput.html',
                    wrapper: ['horizontalInputWrapper', 'bootstrapHasError']
                },
                {
                    name: 'horizontalMultiCheckbox',
                    extends: 'multiCheckbox',
                    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
                },
                {
                    name: 'ui-select-single-search',
                    templateUrl: 'common/form/customTemplate/ui-select-single-search.html',
                    extends: 'select',
                    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
                },
                {
                    name: 'ui-select-single-search-2',
                    templateUrl: 'common/form/customTemplate/ui-select-search.html',
                    extends: 'select',
                    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']

                },
                {
                    name: 'datepicker',
                    templateUrl: 'common/form/customTemplate/datePicker.html',
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
                    template: '<uib-timepicker show-meridian="false" ng-model="model[options.key]"></uib-timepicker><button type="button" ng-click="timepicker.nowTime()" class="btn btn-info2 btn-round">当前时间</button>',
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
                    name: 'abreastDatepicker',
                    templateUrl: 'common/form/customTemplate/datePicker.html',
                    wrapper: ['horizontalBootstrapSimple', 'bootstrapHasError'],
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
                    name: 'dateTimepicker',
                    templateUrl: 'common/form/customTemplate/dateTimepicker.html',
                    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']

                },
                {
                    name: 'dateTimepicker2',
                    templateUrl: 'common/form/customTemplate/dateTimepicker.html',
                    wrapper: ['horizontalBootstrapSimple', 'bootstrapHasError']

                },

                {
                    name: 'abreastTimepicker',
                    template: '<uib-timepicker show-meridian="false" ng-model="model[options.key]"></uib-timepicker><button type="button" ng-click="timepicker.nowTime()" class="btn btn-info2 btn-round">当前时间</button>',
                    wrapper: ['horizontalBootstrapSimple', 'bootstrapHasError'],
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
                    name: 'headerPic',
                    templateUrl: 'common/form/customTemplate/headerPictureCut.html',

                    defaultOptions: {
                        templateOptions: {
                            cutArea: false
                        }
                    },
                    controller: ['$scope', 'Upload', function ($scope, upload) {
                        $scope.$watch('picFile', function (newValue, oldValue, theScope) {
                            $scope.headerCut = {};
                            if (newValue) {
                                $scope.to.cutArea = true;
                            }
                            $scope.confirmCut = confirmCut;
                            $scope.cancelCut = cancelCut;
                            ////////////////////////////////////////////////////////////////////////////////////////////
                            ////////////////////////////////////////////////////////////////////////////////////////////
                            function confirmCut() {
                                //var data = upload.dataUrltoBlob();
                                try {
                                    $scope.options.value($scope.croppedDataUrl);
                                    $scope.to.cutArea = false;
                                }
                                catch (err) {
                                    console.log(err);
                                }
                            }

                            function cancelCut() {
                                $scope.to.cutArea = false;
                            }
                        });
                    }]
                },
                {
                    name: 'UEditor',
                    template: '<div class="ueditor" config="config" ng-model="model[options.key]"></div>',
                    controller: ['$scope', function ($scope) {
                        $scope.config = {
                            toolbars: [
                                ['fullscreen', 'source', 'undo', 'redo'],
                                ['attachment', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                            ]
                        }
                    }],
                    wrapper: ['horizontalBootstrapLabel']

                },
                {
                    name: 'dateShow',
                    templateUrl: 'common/form/customTemplate/divdateShow.html'
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

    });


})();
