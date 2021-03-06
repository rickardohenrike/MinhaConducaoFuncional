function listarEstudantes() {

	firebase.database().ref("estudante")
		.on("value", function (estudante) {

			var html = "";

			estudante.forEach(function (estudante) {

				html += '<tr>' +
					'<td><button onclick=\'addRota("' + estudante.key + '")\' class="btn btn-default">Add na Rota <span class=" glyphicon glyphicon-plus"></span></button></td>' +
					'<td>' + estudante.val().nomeest + '</td>' +
					'<td>' + estudante.val().endereco + '</td>' +
					'<td>' + estudante.val().datanasc + '</td>' +
					'<td>' + estudante.val().escola + '</td>' +
					'<td><button onclick=\'verResponsavel("' + estudante.key + '")\' class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></button></td>' +
					'<td><button onclick=\'editarContatoEstudante("' + estudante.key + '")\' class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></button></td>' +
					'<td><button onclick=\'removerEstudante("' + estudante.key + '")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>' +
					'</tr>';

			});

			$("#conteudoTabelaContatosEstudante").html(html);

		});

}


function addRota(estudante){

var estudanteRota = {
    cod_estudante : estudante
  }

  if (estudanteRota == estudante ){
    alert("Já existe ");

}
  firebase.database().ref("rota").push(estudanteRota)
	.then(function(result){
  console.log(result.key);

			alert("Adicionado com Sucesso!");


		})
		.catch(function (error) {

			alert("Erro ao adicionar");
			console.log(error.message);

		});

};

function verResponsavel(id_estudante) {

	localStorage.setItem('id_estudante', id_estudante);
	location.href = "listarresponsavel.html";

}

function removerEstudante(id_estudante) {

	var deseja_apagar = confirm("Deseja apagar?");

	if (deseja_apagar == false) {
		return false;
	}

	firebase.database().ref("estudante")
		.orderByChild('cod_estudante').equalTo(id_estudante).on("value", function (snapshot) {

			console.log(snapshot.key)

			firebase.database().ref("rota/" + snapshot.key).remove()
				.then(function (result) {
					console.log("Rota removida com Sucesso!");
					firebase.database().ref("estudante/" + id_estudante).remove()
						.then(function (result) {

							alert("Removido com Sucesso!");

						})
						.catch(function (error) {

							alert("Erro ao remover");
							console.log(error.message);

						});
				})
				.catch(function (error) {

					alert("Erro ao remover");
					console.log(error.message);

				});

		});



};

function editarContatoEstudante(id_estudante) {

	localStorage.setItem("id_estudante", id_estudante);
	location.href = "editarestudante.html";

}
function obterContatoEstudante() {

	var id_estudante = localStorage.getItem("id_estudante");

	firebase.database().ref("estudante/" + id_estudante)
		.once("value", function (estudante) {


			$("#nomeest").val(estudante.val().nomeest);
			$("#datanasc").val(estudante.val().datanasc);
			$("#escola").val(estudante.val().escola);
			$("#endereco").val(estudante.val().endereco);

		});

}

function confirmarEditarContatoEstudante() {

	var id_estudante = localStorage.getItem("id_estudante");


	let nomeest = $("#nomeest").val();
	let datanasc = $("#datanasc").val();
	let escola = $("#escola").val();
	let endereco = $("#endereco").val();


	var estudante = {


		nomeest: nomeest,
		datanasc: datanasc,
		escola: escola,
		endereco: endereco
	};

	firebase.database().ref("estudante/" + id_estudante).update(estudante)
		.then(function (result) {

			alert("Atualizado com Sucesso!");
			location.href = "listarestudantes.html";

		})
		.catch(function (error) {

			alert("Erro ao atualizar");
			console.log(error.message);

		});

}
