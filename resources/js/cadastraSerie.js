var serieId = 0;

$(document).ready(function() {
	aplicarEventos();
});

function aplicarEventos()
{
	var me = this;

	$('#linkAdicionarJaVistas').click(function()
	{
		$.post('/marcarseriejavista', {}, 
			function(data)
			{
				debugger
				me.esconderExibirOpcoes(true, false);
			}
		);
	});

	$('#linkAdiconarDesejaVer').click(function()
	{
		$.post('/marcarseriedesejover',{}, 
			function()
			{
				me.esconderExibirOpcoes(false, true);
			}
		);
	});

	$('#linkRemoverJaVistas').click(function()
	{
		$.post('/removerseriejavista',{}, 
			function()
			{
				me.esconderExibirOpcoes(false, false);
			}
		);
	});

	$('#linkRemoverDesejoVer').click(function()
	{
		$.post('/removerseriedesejover',{}, 
			function()
			{
				me.esconderExibirOpcoes(false, false);
			}
		);
	});
}

function esconderExibirOpcoes(marcadaJaVista, marcadaDesejoVer)
{
	if (marcadaJaVista)
	{
		$('#liAdicionarJaVistas').hide();
		$('#linkAdiconarDesejaVer').show();


		$('#liRemoverJaVistas').show();
		$('#liRemoverDesejoVer').hide(); 	
	}
	else if (marcadaDesejoVer)
	{
		$('#liAdicionarJaVistas').show();
		$('#linkAdiconarDesejaVer').hide();

		$('#liRemoverJaVistas').show();
		$('#liRemoverDesejoVer').hide();
	}
	else
	{
		$('#liAdicionarJaVistas').show();
		$('#liAdiconarDesejaVer').hide();

		$('#liRemoverJaVistas').hide();
		$('#liRemoverDesejoVer').hide();
	}
}
