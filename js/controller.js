angular.module('app.controllers', [])

.controller('APICtrl', function ($scope, $rootScope, Server) {
	$rootScope.btnLabel ="Editar";//variavel global
	
	Server.searchOffers().then(function (dados) {
		if (dados.statusText == 'error') {
			$scope.itens = [];
		} else {
			$scope.itens = dados.response.itens;
		}
	});
});