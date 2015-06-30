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
				me.esconderExibirOpcoes(true, false);
			}
		);
	});

	$('#linkAdicionarDesejoVer').click(function()
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
		$('#liAdicionarDesejoVer').show();


		$('#liRemoverJaVistas').show();
		$('#liRemoverDesejoVer').hide(); 	
	}
	else if (marcadaDesejoVer)
	{
		$('#liAdicionarJaVistas').show();
		$('#liAdicionarDesejoVer').hide();

		$('#liRemoverJaVistas').hide();
		$('#liRemoverDesejoVer').show();
	}
	else
	{
		$('#liAdicionarJaVistas').show();
		$('#liAdicionarDesejoVer').show();

		$('#liRemoverJaVistas').hide();
		$('#liRemoverDesejoVer').hide();
	}
}
