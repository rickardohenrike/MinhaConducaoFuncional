function listarEstudantes() {

  firebase.database().ref("contatos")
  .on("value", function(contatos){

    var html = "";

    contatos.forEach(function(contato){

    	html += '<tr>'+             
			  '<td>'+contato.val().nomeest+'</td>'+
			  '<td>'+contato.val().endereco+'</td>'+			 
              '<td>'+contato.val().datanasc+'</td>'+
              '<td>'+contato.val().escola+'</td>'+
                            '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+

			  '<td><button onclick=\'editarContatoEstudante("'+ contato.key +'")\' class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></button></td>'+
              '<td><button onclick=\'removerContato("'+ contato.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
            '</tr>';

    });

    $("#conteudoTabelaContatosEstudante").html(html);

  });

}
function listarResponsaveis() {

  firebase.database().ref("contatos")
  .on("value", function(contatos){

    var html = "";

    contatos.forEach(function(contatoresp){

    	html += '<tr>'+             
			  '<td>'+contatoresp.val().nome+'</td>'+
              '<td>'+contatoresp.val().telefone+'</td>'+
              '<td class="hidden-xs">'+contatoresp.val().email+'</td>'+
			  '<td>'+contatoresp.val().endereco+'</td>'+
			  '<td><button onclick=\'editarContato("'+ contatoresp.key +'")\' class="btn btn-warning" href="listarresponsavel.html"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
              '<td><button onclick=\'removerContato("'+ contatoresp.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
            '</tr>';

    });

    $("#conteudoTabelaContatos").html(html);

  });

}
function minhasrotas() {

  firebase.database().ref("contatos")
  .on("value", function(contatos){

    var html = "";

    contatos.forEach(function(contato){

    	html += '<tr>'+             
			  '<td>'+contato.val().nomeest+'</td>'+
			  '<td>'+contato.val().endereco+'</td>'+			 
              '<td>'+contato.val().datanasc+'</td>'+
              '<td>'+contato.val().escola+'</td>'+
               '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+
			'<td> <input type="checkbox" class="form-check-input" id="exampleCheck1"> <label class="form-check-label" for="exampleCheck1">Faltou</label></td>'+
			 
            '</tr>';

    });

    $("#conteudoTabelaContatosRotas").html(html);

  });

}
function cadastrarContato() {

	var nome = $("#nome").val();
	var telefone = $("#telefone").val();
	var email = $("#email").val();
	var endereco = $("#endereco").val();
    var nomeest = $("#nomeest").val();
	var datanasc = $("#datanasc").val();
	var escola = $("#escola").val();
	
	var contato = {
		nome: nome,
		telefone: telefone,
		email: email,
		endereco: endereco,
		nomeest: nomeest,
		datanasc: datanasc,
		escola: escola
	};

	firebase.database().ref("contatos").push(contato)
	.then(function(result){

		alert("Cadastrado com Sucesso!");
		location.href = "listarestudantes.html";

	})
	.catch(function(error){

		alert("Erro ao cadastrar");
		console.log(error.message);

	});

}

function removerContato(id_contatoresp) {

  var deseja_apagar = confirm("Deseja apagar?");

  if (deseja_apagar==false) {
    return false;
  }

  firebase.database().ref("contatos/"+id_contatoresp).remove()
  .then(function(result){

    alert("Removido com Sucesso!");

  })
  .catch(function(error){

    alert("Erro ao remover");
    console.log(error.message);

  });

}

function editarContato(id_contatoresp) {

  localStorage.setItem("id_contatoresp", id_contatoresp);
  location.href = "editar.html";

}

function obterContato() {

  var id_contatoresp = localStorage.getItem("id_contatoresp");

  firebase.database().ref("contatos/"+id_contatoresp)
  .once("value", function(contatoresp){

    $("#nome").val( contatoresp.val().nome );
    $("#email").val( contatoresp.val().email );
    $("#telefone").val( contatoresp.val().telefone );
	$("#endereco").val( contatoresp.val().endereco );


  });

}

function confirmarEditarContato() {

  var id_contatoresp = localStorage.getItem("id_contatoresp");

	let nome = $("#nome").val();
    let email = $("#email").val();
    let telefone = $("#telefone").val();
	let endereco = $("#endereco").val();
	

  	var contatoresp = {
		
		nome: nome,
		telefone: telefone,
		email: email,
		endereco: endereco
		
  };

  firebase.database().ref("contatos/"+id_contatoresp).update(contatoresp)
  .then(function(result){

      alert("Atualizado com Sucesso!");
      location.href = "listarresponsavel.html";

  })
  .catch(function(error){

    alert("Erro ao atualizar");
    console.log(error.message);

  });

}
function editarContatoEstudante(id_contato) {

  localStorage.setItem("id_contato", id_contato);
  location.href = "editarestudante.html";

}
function obterContatoEstudante() {

  var id_contato = localStorage.getItem("id_contato");

  firebase.database().ref("contatos/"+id_contato)
  .once("value", function(contato){

   
	$("#nomeest").val( contato.val().nomeest );
    $("#datanasc").val( contato.val().datanasc );
    $("#escola").val( contato.val().escola );

  });

}

function confirmarEditarContatoEstudante() {

  var id_contato = localStorage.getItem("id_contato");

    $("#nomeest").val( contato.val().nomeest );
    $("#datanasc").val( contato.val().datanasc );
    $("#escola").val( contato.val().escola );

  	var contato = {
		
		
		nomeest: nomeest,
		datanasc: datanasc,
		escola: escola
  };

  firebase.database().ref("contatos/"+id_contato).update(contato)
  .then(function(result){

      alert("Atualizado com Sucesso!");
      location.href = "listarestudantes.html";

  })
  .catch(function(error){

    alert("Erro ao atualizar");
    console.log(error.message);

  });

}