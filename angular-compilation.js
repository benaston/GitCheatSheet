function compile(options) {
	var $injector, $compile, $rootScope, $scope, el;

	angular.module('test', [myModule.name]);
	$injector = angular.injector(['ng', 'test']);
	$compile = $injector.get('$compile');
	$rootScope = $injector.get('$rootScope');
	$scope = $rootScope.$new();
	$scope.context = {};
	el = $compile(HTML)($scope);
	$rootScope.$digest();

	return el;
}
