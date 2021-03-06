/*global angular*/
'use strict';

angular.module('ui.boxaccordion', ['duScroll'])
    .controller('BoxAccordionController', ['$scope', function ($scope) {
        $scope.groups = [];

        this.closeOthers = function (openGroup) {
            angular.forEach($scope.groups, function (group) {
                if (group !== openGroup) {
                    group.close();
                }
            });
        };

        this.addGroup = function (groupScope) {
            $scope.groups.push(groupScope);
        };
    }])

    .directive('boxAccordion', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            controller: 'BoxAccordionController',
            templateUrl: 'boxAccordion.html',
        };
    })

    .controller('BoxAccordionGroupController', ['$scope', function ($scope) {
        $scope.header = null;
        $scope.body = null;

        this.setHeader = function (headerScope) {
            $scope.header = headerScope;
        };

        this.setBody = function (bodyScope) {
            $scope.body = bodyScope;
        };

        $scope.close = function () {
            $scope.body.isOpen = false;
            $scope.isOpen = false;
        };

        $scope.open = function () {
            $scope.body.isOpen = true;
            $scope.isOpen = true;
        };

        this.toggle = function () {
            if ($scope.isOpen) {
                $scope.close();
            } else {
                $scope.open();
            }
        };

    }])

    .directive('boxAccordionGroup', function ($document) {
        return {
            restrict: 'E',
            require: '^boxAccordion',
            replace: true,
            templateUrl: 'boxAccordionGroup.html',
            transclude: true,
            scope: true,
            controller: 'BoxAccordionGroupController',
            link: function (scope, element, attrs, accordionCtrl) {
                scope.isOpen = false;
                accordionCtrl.addGroup(scope);
                scope.$watch('isOpen', function (value) {
                    if (value) {
                        accordionCtrl.closeOthers(scope);
                        element.css('height', '770px');
                        $document.scrollTo( 0, element[0].offsetTop, 200 )
                    } else {
                        element.css('height', '250px');
                    }
                });
            }
        };
    })

    .directive('boxAccordionHead', function () {
        return {
            restrict: 'AE',
            require: '^boxAccordionGroup',
            templateUrl: 'boxAccordionHead.html',
            transclude: true,
            replace: true,
            link: function (scope, element, attrs, accordionGroupCtrl) {
                accordionGroupCtrl.setHeader(scope);
                scope.toggle = function () {
                    accordionGroupCtrl.toggle();
                };
                attrs.$observe('color', function (value) {
                    element.css('background-color', value);
                });
            },
        };
    })

    .directive('boxAccordionBody', function () {
        return {
            restrict: 'AE',
            require: '^boxAccordionGroup',
            templateUrl: 'boxAccordionBody.html',
            transclude: true,
            link: function (scope, element, attrs, accordionGroupCtrl) {
                scope.toggle = function () {
                    accordionGroupCtrl.toggle();
                };
                accordionGroupCtrl.setBody(scope);
            }
        };
    });
angular.module('ui.boxaccordion').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('boxAccordion.html',
    "<div class=\"box-accordion\" ng-transclude>\n" +
    "</div>"
  );


  $templateCache.put('boxAccordionBody.html',
    "<div>\n" +
    "<div class=\"box-accordion-triangle\" ng-show=\"isOpen\"></div>\n" +
    "<div class=\"box-accordion-body\" ng-show=\"isOpen\">\n" +
    "\t<div class=\"box-accordion-close\" ng-click=\"toggle()\"></div>\n" +
    "\t<div class=\"box-accordion-body-inner\" ng-transclude></div>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('boxAccordionGroup.html',
    "<div class=\"box-accordion-group\" ng-transclude>\n" +
    "</div>"
  );


  $templateCache.put('boxAccordionHead.html',
    "<div class=\"box-accordion-head\" ng-click=\"toggle()\" ng-transclude>\n" +
    "</div>"
  );

}]);
