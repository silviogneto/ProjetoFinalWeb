var serieId = 0;

aplicarEventos();

function aplicarEventos()
{
	var me = this;

	$('#linkAdicionarJaVistas').click(function()
	{
		$.post('/marcarseriejavista', {}, 
			function()
			{
				debugger
				me.econderExibirOpcoes(true, false);
			}
		);
	});

	$('#linkAdiconarDesejaVer').click(function()
	{
		var me = this;

		$.post('/marcarseriedesejover',{}, 
			function()
			{
				me.econderExibirOpcoes(false, true);
			}
		);
	});

	$('#linkRemoverJaVistas').click(function()
	{
		var me = this;

		$.post('/removerseriejavista',{}, 
			function()
			{
				me.econderExibirOpcoes(false, false);
			}
		);
	});

	$('#linkRemoverDesejoVer').click(function()
	{
		var me = this;

		$.post('/removerseriedesejover',{}, 
			function()
			{
				me.econderExibirOpcoes(false, false);
			}
		);
	});
}

function econderExibirOpcoes(marcadaJaVista, marcadaDesejoVer)
{
	if (marcadaJaVista)
	{
		$('#linkAdicionarJaVistas').hide();
		$('#linkAdiconarDesejaVer').show();


		$('#linkRemoverJaVistas').show();
		$('#linkRemoverDesejoVer').hide();
	}
	else if (marcadaDesejoVer)
	{
		$('#linkAdicionarJaVistas').show();
		$('#linkAdiconarDesejaVer').hide();

		$('#linkRemoverJaVistas').show();
		$('#linkRemoverDesejoVer').hide();
	}
	else
	{
		$('#linkAdicionarJaVistas').show();
		$('#linkAdiconarDesejaVer').hide();

		$('#linkRemoverJaVistas').hide();
		$('#linkRemoverDesejoVer').hide();
	}
}
