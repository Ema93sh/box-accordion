/*global angular*/
'use strict';

angular.module('testModule', ['ui.boxaccordion'])
     .controller('testController', ['$scope', function ($scope) {
        $scope.items = [{
            color: "#CC0066",
            title: " Rent",
            description: "Test description"
        }, {
            color: "#00CCFF",
            title: "Internet",
            description: "Test description"
        }, {
            color: "#66FF66",
            title: "Food & Dining",
            description: "Test description"
        }, {
            color: "#66CCFF",
            title: "Health & Fitness",
            description: "Test description"
        }, {
            color: "#FFCC99",
            title: "Doctor",
            description: "Test description"
        }, {
            color: "#CC00FF",
            title: "Books",
            description: "Test description"
        }, {
            color: "#FF9933",
            title: "Travel",
            description: "Test description"
        }, {
            color: "#FF3399",
            title: "Student Loan",
            description: "Test description"
        }, {
            color: "#99FF99",
            title: "Gas & Fuel",
            description: "Test description"
        }, {
            color: "#FF5050",
            title: "Auto Insurance",
            description: "Test description"
        }, {
            color: "#FF0066",
            title: "Credit Card Payment",
            description: "Test description"
        }, {
            color: "#00FFFF",
            title: "Television",
            description: "Test description"
        }, {
            color: "#99CCFF",
            title: "Entertainment",
            description: "Test description"
        }, {
            color: "#600924",
            title: "Groceries",
            description: "Test description"
        }, {
            color: "#00CC99",
            title: "Charity",
            description: "Test description"
        }];
    }]);