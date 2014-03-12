/*global angular*/
'use strict';

angular.module('ui.boxaccordion', ['ngAnimate'])
    .controller('BoxAccordionController', ['$scope', function ($scope) {
        this.groups = [];

        this.closeOthers = function (openGroup) {
            angular.forEach(this.groups, function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        };
    
        this.addGroup = function (group) {
            var that = this;
            this.groups.push(group);
            group.$on('$destroy', function (event) {
                that.removeGroup(group);
            });
        };
        
        this.removeGroup = function (group) {
            var index = this.groups.indexOf(group);
            if (index !== -1) {
                this.groups.splice(this.groups.indexOf(group), 1);
            }
        };
    }])

    .directive('boxAccordion', function () {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'BoxAccordionController',
            templateUrl: 'partials/boxAccordion.html'
        };
    })

    .directive('boxAccordionGroup', function ($animate) {
        return {
            restrict: 'E',
            require: '^boxAccordion',
            transclude: true,
            replace: true,
            scope: { heading: '@' },
            controller: function () {
                this.setHeading = function (newHeading) {
                    this.heading = newHeading;
                };
                this.bodyStyle = {};
            },
            templateUrl: 'partials/boxAccordionGroup.html',
            link: function (scope, element, attrs, accordionCtrl) {
                accordionCtrl.addGroup(scope);
                scope.isOpen = false;
                scope.$watch('isOpen', function (value) {
                    if (value) {
                        accordionCtrl.closeOthers(scope);
                        element.css("height", "775px");
                        scope.bodyStyle = {'height' : '500px'};
                    } else {
                        element.css("height", "250px");
                        scope.bodyStyle = {};
                    }
                });
            }
        };
    })
    
    .directive('boxAccordionHead', function () {
        return {
            restrict: 'AE',
            require: '^boxAccordionGroup',
            replace: true,
            template: '',
            transclude: true,
            compile: function (element, attr, transclude) {
                return function link(scope, element, attr, accordionGroupCtrl) {
                    accordionGroupCtrl.setHeading(transclude(scope, function () {}));
                };
            }
        };
    })

    .directive('accordionTransclude', function () {
        return {
            require: '^boxAccordionGroup',
            link: function (scope, element, attr, controller) {
                scope.$watch(function () { return controller[attr.accordionTransclude]; }, function (heading) {
                    if (heading) {
                        element.html('');
                        element.append(heading);
                    }
                });
            }
        };
    });