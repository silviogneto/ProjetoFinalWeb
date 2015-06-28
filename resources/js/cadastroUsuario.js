
$(document).ready(function() {
	$('#frmUsuario').submit(function(e) {
		e.preventDefault();

		var frm = $(this),
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
				nome: nome,
				email: email,
				login: login,
				senha: senha
			},
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				$('#btnSalvar').attr("disabled", "disabled");
			}
		})
		.done(function() {
			alert('Usuario Cadastrado');
			window.location.href = '/';
		});
	});
});