'use strict';

/* Controllers */

angular.module('myApp.controllers', ['firebase'])
.controller('EmployeeList', ['$scope','$firebase', function($scope, $firebase) {
	var ref = new Firebase('https://angular-clock.firebaseio.com/employees');
	$scope.employees = $firebase(ref.limit(15));
	$scope.departments=[{"name":"Creative"},{"name":"Sales"}];
	$scope.currentUser = $scope.employees.$child('-JELMvaMgxgDtAGdnvuy');
	$scope.titles=[{"name":"Manager"},{"name":"Sales Guy"}];

	$scope.clockIn = function(status){
		$scope.currentUser.status=status;
		$scope.currentUser.statusType = true;
		$scope.currentUser.lastTime=Firebase.ServerValue.TIMESTAMP;
		$scope.currentUser.$save();
		$scope.currentUser.$child('clocks').$add({'type': status, 'time': Firebase.ServerValue.TIMESTAMP});
	};
	$scope.clockOut = function(status){
		$scope.currentUser.status=status;
		$scope.currentUser.statusType = false;
		$scope.currentUser.lastTime=Firebase.ServerValue.TIMESTAMP;
		$scope.currentUser.$save();
		$scope.currentUser.$child('clocks').$add({'type': status, 'time': Firebase.ServerValue.TIMESTAMP});

	};
	$scope.selectEmployee = function(employee){
		$scope.currentUser = $scope.employees.$child(employee);

	};

	$scope.addEmployee = function(form){
		var newEmployee = {"name":form.newName, "department": form.newDepartment, "title": form.newTitle, "isManager": form.isManager};
		$scope.employees.$add(newEmployee);
	};
}])
.controller('TimeCards', ['$scope','$firebase',function($scope, $firebase) {
	var ref = new Firebase('https://angular-clock.firebaseio.com/employees');
	$scope.employees = $firebase(ref.limit(15));
	$scope.departments=[{"name":"Creative"},{"name":"Sales"}];
	$scope.titles=[{"name":"Manager"},{"name":"Sales Guy"}];

	$scope.removeClock = function(employee, clock){
		var clockIn = $scope.employees.$child(employee).$child('clocks').$child(clock);
		console.log(clockIn);
		clockIn.$remove();
	};

}])
.controller('SetUp', ['$scope',function($scope) {
	$scope.departments=[{"name":"Creative"},{"name":"Sales"}];
	$scope.titles=[{"name":"Manager"},{"name":"Sales Guy"}];
}]);