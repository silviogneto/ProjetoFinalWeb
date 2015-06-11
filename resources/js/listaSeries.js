var widthImg 		= 230 + 10,
	qtdRegistros 	= parseInt($('#content').width() / widthImg) * 2;

$('#imgOpcoesSerie').hide();

aplicarEventos();

//retornarSeries();

function aplicarEventos()
{
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

	$('#content').mouseover(function(event)
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
			.css('top', offsetImg.top + 250)
			.css('left', offsetImg.left + 90)
			.css('display', 'block');
	});
}

function retornarSeries()
{
	$('#carrega-series').hide();

	$('#content').append('Carregando...');

	var url = 'localhost:8080:arquivojs.js';
 
 	var pagina = $('#carrega-series').get('pagina');

	$.getJSON(url, {qtdRegistro: qtdRegistros, pagina: pagina}, function(series)
	{
		$('.carregando').fadeOut(function()
		{
	  		for(x in tweets)
	   			$('#lista-tweets').append(
	   				'<img class="poster" src="../resources/img/series/' + series[x].caminhoImagemPoster + '" width="230" height="345" alt="' + series[x].nome + '" itemprop="photo">');

	 		$(this).remove();

	  		$('#carrega-series').data('pagina', pagina + 1).fadeIn();
		});
	});
}