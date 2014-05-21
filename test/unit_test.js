describe("BoxAccordion", function() {
	var $scope, boxAccordionController;
	beforeEach(module('ui.boxaccordion'));

	beforeEach(function() {
        inject(['$rootScope', '$controller', function($rootScope, $controller) {
			$scope = $rootScope.$new();
			boxAccordionController = $controller("BoxAccordionController", {$scope: $scope});
			boxAccordionGroupController = $controller("BoxAccordionGroupController", {$scope: $scope});
		}]);
	});


	describe("controller", function() {
		describe("BoxAccordionController", function() {
			it("should close other groups", function() {
				var group1 = jasmine.createSpyObj('group1', ['close']);
				var group2 = jasmine.createSpyObj('group2', ['close']);
				$scope.groups = [group1, group2];
				boxAccordionController.closeOthers(group1);
				expect(group2.close).toHaveBeenCalled();
			});

			it("should add group", function() {
				var group1 = jasmine.createSpy();
				boxAccordionController.addGroup(group1);
				expect($scope.groups).toEqual([group1]);
			});
		});

		describe("BoxAccordionGroupController", function() {
			it("should toggle open and close", function(){
				$scope.body = jasmine.createSpy();
				boxAccordionGroupController.toggle();
				expect($scope.isOpen).toBe(true);
				expect($scope.body.isOpen).toBe(true);

				boxAccordionGroupController.toggle();
				expect($scope.isOpen).toBe(false);
				expect($scope.body.isOpen).toBe(false);
			});
		});

	});

	describe("directive", function() {
		var $compile;
		beforeEach(inject(function(_$compile_) {
             $compile = _$compile_;
         }));

		it("should render header color", function() {
			var element = angular.element("<box-accordion>" + 
					"<box-accordion-group>" + 
					"<box-accordion-head color='red'>" +
						"<span class='title'>Header</span>" + 
					"</box-accordion-head>" +
					"<box-accordion-body>" +
						"<h3>Body</h3>" +
					"</box-accordion-body>" +
					"</box-accordion-group>" +
				"</box-accordion>");
			$compile(element)($scope);
			$scope.$digest();
			var template = element.html();
			expect(template).toContain("background-color: red;");
		});


	});
});