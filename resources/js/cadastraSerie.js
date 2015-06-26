var serieId = 0;

aplicarEventos();

function aplicarEventos()
{
	$('#linkAdicionrJaVistos').click(function()
	{
		alert('série ' + serieId + ' marcar já vistos');

		var url = 'localhost:8080:arquivojs.js';

		/*$.post(url,{
			metodo: 'marcarComoJaVisto',
			serieId: serieid
		}, function()
		{
			//marcar em tela como já visto
		});*/
	});

	$('#linkAdiconarDesejoVer').click(function()
	{
		alert('série ' + serieId + ' marcar quero ver');

		var url = 'localhost:8080:arquivojs.js';

		/*$.post(url,{
			metodo: 'marcarComoDesejoVer',
			serieId: serieid
		}, function()
		{
			//marcar em tela como já deseja ver
		});*/
	});
}
