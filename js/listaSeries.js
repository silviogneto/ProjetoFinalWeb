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
		event.prevenDefault();
	});

	$('.poster').mouseover(function(event)
	{
		event.stopImmediatePropagation();

		var offsetImg = $(this).offset();

		$('#imgOpcoesSerie')
			.css('top', offsetImg.top + 50)
			.css('left', offsetImg.left + 90)
			.show();

	}).mouseleave(function(event)
	{
		event.stopImmediatePropagation();
		
		$('#imgOpcoesSerie').hide();
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
