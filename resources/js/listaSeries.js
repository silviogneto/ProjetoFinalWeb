var widthImg 		= 230 + 10,
	qtdRegistros 	= parseInt($('#content').width() / widthImg) * 2;

$('#imgOpcoesSerie').hide();

aplicarEventos();

//retornarSeries();

function aplicarEventos()
{
	$(".poster").click(function()
	{
		window.location.href = "/series/"  + $(this).data('serieid'); 
	});

	$('#carrega-series').click(function()
	{
		retornarSeries();
	});

	$('#imgOpcoesSerie').mouseleave(function()
	{
		$('#menuOpcoesSerie').css('display', 'none');
	});

	$('#imgOpcoesSerie').click(function()
	{
		var offsetImg = $(this).offset();

		$('#menuOpcoesSerie')
			.css('top', offsetImg.top - 50)
			.css('left', offsetImg.left + 40)
			.css('display', 'block');
	});

	$('#content').mouseenter(function(event)
	{
		$('#imgOpcoesSerie').css('display', 'none');		
	});

	$('#menuOpcoesSerie').mouseenter(function()
	{
		$('#menuOpcoesSerie').css('display', 'block');
	}).mouseleave(function(event)
	{
		$('#menuOpcoesSerie').css('display', 'none');		
	});

	$('.poster').mouseenter(function(event)
	{
		var offsetImg = $(this).offset();
		
		$('#imgOpcoesSerie')
			.css('display', 'block')
			.css('top', offsetImg.top + 250)
			.css('left', offsetImg.left + 90)
			.data('serieId', $(this).data('serieid'));
	});

	$('#linkAdicionrJaVistos').click(function()
	{
		var serieId = $('#imgOpcoesSerie').data('serieId');

		alert('série ' + serieId + ' marcar já vistos');

		/*var url = 'localhost:8080:arquivojs.js';

		$.post(url,{
			metodo: 'marcarComoJaVisto',
			serieId: serieid
		}, function()
		{
			//marcar em tela como já visto
		});*/
	});

	$('#linkAdiconarDesejoVer').click(function()
	{
		var serieId = $('#imgOpcoesSerie').data('serieId');

		alert('série ' + serieId + ' marcar quero ver');

		var url = 'localhost:8080:arquivojs.js';

		/*$.post(url,{
			metodo: 'marcarComoDesejoVer',
			serieId: serieid
		}, function()
		{
			//marcar em tela como já visto
		});*/
	});

	$('#frmTextoPesquisa').keypress(function(e) {
		if (e.which === 13)
		{
			e.preventDefault();

			var textoPesquisa = $(this).val();

			alert('texto pequisado ' + textoPesquisa);

			//$('#lista-tweets').reset();
			//retornarSeries(1);
		}
	});
}

function retornarSeries(pagina)
{
	$('#carrega-series').hide();

	$('#content').append('Carregando...');

	var url = 'localhost:8080:arquivojs.js';
 
 	var pagina = (pagina > 0) ? pagina : $('#carrega-series').get('pagina');

	$.getJSON(url, {qtdRegistro: qtdRegistros, pagina: pagina}, function(series)
	{
		$('.carregando').fadeOut(function()
		{
			var serie;

	  		for(x in tweets)
	  		{
	  			serie = series[x];
	   			$('#lista-tweets').append(
	   				'<img class="poster" data-serieid="' + serie.id + '" src="resources/img/series/' + serie.caminhoImagemPoster + '" width="230" height="345" alt="' + serie.nome + '" itemprop="photo">');
	   		}

	 		$(this).remove();

	  		$('#carrega-series').data('pagina', pagina + 1).fadeIn();
		});
	});
}