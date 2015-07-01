var widthImg 		= 230 + 10,
	qtdRegistros 	= parseInt($('.destaqueUltimasSeries').width() / widthImg);

$(document).ready(function() {
	retornarSeries();
});

function retornarSeries()
{
	$.getJSON('/retornarultimasseries', {
		qtdRegistros: qtdRegistros
	}, function(resultado)
	{
		var serie;
		
  		for(var i = 0, len = resultado.serie.length; i < len; i++)
  		{
  			serie = resultado.serie[i];

   			$('.destaqueUltimasSeries').append(
   				'<img class="poster" data-serieid="' + serie.Id + '" src="/img/series/' + serie.ImgPoster + '" width="230" height="345" alt="' + serie.Nome + '" itemprop="photo" />');
   		}

  		aplicarEventosPoster();
	});
}

function aplicarEventosPoster()
{
	$(".poster").click(function()
	{
		window.location.href = "/series/"  + $(this).data('serieid'); 
	});
}