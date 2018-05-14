
function cadastrarContato() {

	var nome = $("#nome").val();
	var telefone = $("#telefone").val();
	var email = $("#email").val();
	var endereco = $("#endereco").val();
    var nomeest = $("#nomeest").val();
	var datanasc = $("#datanasc").val();
	var escola = $("#escola").val();
	
	var responsavel = {
		nome: nome,
		telefone: telefone,
		email: email,

	};

  var estudante = {
		
		nomeest: nomeest,
		datanasc: datanasc,
    escola: escola,
    endereco: endereco
  };
  
  firebase.database().ref("estudante").push(estudante)
	.then(function(result){



	})
	.catch(function(error){


	});

	firebase.database().ref("responsavel").push(responsavel)
	.then(function(result){

		alert("Cadastrado com Sucesso!");
		location.href = "listarestudantes.html";

	})
	.catch(function(error){

		alert("Erro ao cadastrar");
		console.log(error.message);

	});

}


