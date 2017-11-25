

var app = angular.module("manage", []);

//Controller Part
app.controller("UserController", function($scope, $http) {


	$scope.users = [];
	$scope.userForm = {
			userid : -1,
			username : "",
			password : "",
			status : "",
			result : ""
	};

	$scope.checkAll = function () {
	};

//	_refreshuserData();



	$scope.createUser = function() {
		var method = "";
		var url = "";
		method = "POST";
		url = 'http://localhost:8080/user';
		$scope.userForm.status = "Activated";

		$http({
			method : method,
			url : url,
			data : angular.toJson($scope.userForm),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function successCallback(response) {
			_refreshuserData();
			$scope.userForm.response = "User created successfully..";
		}, function errorCallback(response) {
			alert(JSON.stringify(response));
			console.log(response.statusText);
		});

	};


	$scope.showAll = function() {

		_refreshuserData();

	};

	$scope.updateUser = function() {
		var method = "";
		var url = "";

		method = "PUT";
		url = 'http://localhost:8080/user';

		$http({
			method : method,
			url : url,
			data : angular.toJson($scope.userForm),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function successCallback(response) {
			_refreshuserData();
			$scope.userForm.response = "User updated successfully..";
		}, function errorCallback(response) {
			alert(JSON.stringify(response));
			console.log(response.statusText);
		});

	};


	$scope.findUser = function() {
		var method = "";
		var url = "";

		method = "GET";

		url = 'http://localhost:8080/user?username=' + $scope.userForm.username;

		$http({
			method : method,
			url : url,
			data : angular.toJson($scope.userForm),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.userForm = response.data;
			$scope.userForm.response = "Found user..";
		}, function errorCallback(response) {
			alert(JSON.stringify(response));
			console.log(response.statusText);
		});

	};

	$scope.deleteUser = function() {

		$http({
			method : 'DELETE',
			url : 'http://localhost:8080/user?userid=' + $scope.userForm.userid,
			data : angular.toJson($scope.userForm),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.users = response.data;
			$scope.userForm.response = "Deleted User successfully..";
		}, function errorCallback(response) {
			alert(JSON.stringify(response));
			console.log(response.statusText);
		});
	};

	function _refreshuserData() {
		$http({
			method : 'GET',
			url : 'http://localhost:8080/user?username=' + $scope.userForm.username
		}).then(function successCallback(response) {
			$scope.users = response.data;
		}, function errorCallback(response) {
			alert(JSON.stringify(response));
			console.log(response.statusText);
		});
	}

	function _success(response) {
		_refreshuserData();
		_clearFormData()
	}

	function _error(response) {
		alert(JSON.stringify(response));
		console.log(response.statusText);
	}

	//Clear the form
	function _clearFormData() {
		$scope.userForm.userid = -1;
		$scope.userForm.username = "";
		$scope.userForm.password = "";
		$scope.userForm.status = "";
		$scope.userForm.response = "";

	}

});
