angular.module('app.services', [])
	.constant('APIUrl', 'http://localhost/ControleApp/WebService.asmx/AgendamentosUsuario?cod_pessoal=48')
	.factory('Server', function ($resource, $q, APIUrl) {
		var res = $resource(APIUrl, { format: 'json', jsoncallback: 'JSON_CALLBACK' }, { 'load': { 'method': 'JSONP' } });
		return {
			searchOffers: function () {
				var q = $q.defer();
				res.load({
					action: 'searchOffers'
				}, function (e) {
					q.resolve(e);
				}, function (e) {
					q.resolve(e);
				})
				return q.promise;
			}
		}
	});