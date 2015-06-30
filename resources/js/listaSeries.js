var widthImg 		= 230 + 10,
	qtdRegistros 	= parseInt($('#content').width() / widthImg),
	textoPesquisa 	= '';

$(document).ready(function() {
	$('#imgOpcoesSerie').hide();

	aplicarEventos();
	aplicarEventosPoster();
	retornarSeries();
});

function aplicarEventos()
{
	$('#carrega-series').click(function()
	{
		retornarSeries();
	});

	$('#frmTextoPesquisa').keypress(function(e) {
		if (e.which === 13)
		{
			e.preventDefault();

			var texto = $(this).val();

			if (texto !== textoPesquisa)
			{
				textoPesquisa = texto;
				$('#content').empty();
				retornarSeries(0);
			}
		}
	});
}

function aplicarEventosPoster()
{
	$(".poster").click(function()
	{
		window.location.href = "/series/"  + $(this).data('serieid'); 
	});
	
	/*$('#imgOpcoesSerie').mouseleave(function()
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
	});*/
}

function retornarSeries(pagina)
{
	$('#carrega-series').hide();
 
 	var pagina = (pagina >= 0) ? pagina : Number($('#carrega-series').data('pagina')) || 0;

	$.getJSON('/retornarseries', {
		pagina: pagina,
		qtdRegistros: qtdRegistros,
		textoPesquisa: textoPesquisa
	}, function(resultado)
	{
		var serie;
		
  		for(var i = 0, len = resultado.serie.length; i < len; i++)
  		{
  			serie = resultado.serie[i];

   			$('#content').append(
   				'<img class="poster" data-serieid="' + serie.Id + '" src="/img/series/' + serie.ImgPoster + '" width="230" height="345" alt="' + serie.Nome + '" itemprop="photo" />');
   		}

 		$(this).remove();

  		$('#carrega-series').data('pagina', pagina + 1).fadeIn();

  		aplicarEventosPoster();
	});
}