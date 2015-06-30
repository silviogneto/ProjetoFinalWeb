
$(document).ready(function() {
	$('#frmUsuario').submit(function(e) {
		e.preventDefault();

		var frm = $(this),
			id = $('#inputId').val(),
			nome = $('#inputNome').val(),
			email = $('#inputEmail').val(),
			login = $('#inputLogin').val(),
			senha = $('#inputSenha').val(),
			confSenha = $('#inputConfirmarSenha').val();

		if (senha != confSenha) {
			alert('A senha não confere');
			return;
		}

		$.ajax({
			url: frm.attr('action'),
			method: 'PUT',
			data: {
				id: id,
				nome: nome,
				email: email,
				login: login,
				senha: senha
			},
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				$('#btnSalvar').prop("disabled", true);

				if (id != 0) {
					$('#btnExcluir').prop('disabled', true);
				}
			}
		})
		.done(function() {
			$('#btnSalvar').prop("disabled", false);

			if (id != 0) {
				$('#btnExcluir').prop('disabled', false);
				window.location.href = '/usuario';
			} else {
				alert('Usuario Cadastrado');
				window.location.href = '/';	
			}
		});
	});

	$('#btnExcluir').on('click', function(e) {
		e.preventDefault();

		var usuId = $('#inputId').val();

		$.ajax({
			url: '/usuario/'.concat(usuId),
			method: 'DELETE',
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				$('#btnSalvar').prop("disabled", true);
				$('#btnExcluir').prop('disabled', true);
			}
		})
		.done(function() {
			$('#btnSalvar').prop("disabled", false);
			$('#btnExcluir').prop('disabled', false);

			window.location.href = '/usuario';
		});
	});
});