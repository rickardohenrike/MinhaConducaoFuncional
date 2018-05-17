function listarEstudantes() {

  firebase.database().ref("estudante")
  .on("value", function(estudante){

    var html = "";

    estudante.forEach(function(estudante){

    	html += '<tr>'+             
			  '<td>'+estudante.val().nomeest+'</td>'+
			  '<td>'+estudante.val().endereco+'</td>'+			 
              '<td>'+estudante.val().datanasc+'</td>'+
              '<td>'+estudante.val().escola+'</td>'+
                            '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+

			  '<td><button onclick=\'editarContatoEstudante("'+ estudante.key + '")\' class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></button></td>'+
              '<td><button onclick=\'removerEstudante("'+ estudante.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
            '</tr>';

    });

    $("#conteudoTabelaContatosEstudante").html(html);

  });

}

function removerEstudante(id_estudante, id_responsavel) {

    var deseja_apagar = confirm("Deseja apagar?");
  
    if (deseja_apagar==false) {
      return false;
    }
  
    firebase.database().ref("estudante/"+id_estudante).remove()
     
    firebase.database().ref("responsavel/"+id_responsavel).remove()
    .then(function(result)
    {
  
      alert("Removido com Sucesso!");
  
    })
    .catch(function(error){
  
      alert("Erro ao remover");
      console.log(error.message);
  
    });
  
  }
function editarContatoEstudante(id_estudante) {

    localStorage.setItem("id_estudante", id_estudante);
    location.href = "editarestudante.html";
  
  }
  function obterContatoEstudante() {
  
    var id_estudante= localStorage.getItem("id_estudante");
  
    firebase.database().ref("estudante/"+id_estudante)
    .once("value", function(estudante){
  
     
      $("#nomeest").val( estudante.val().nomeest );
      $("#datanasc").val( estudante.val().datanasc );
      $("#escola").val( estudante.val().escola );
      $("#endereco").val( estudante.val().endereco );
  
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
  
    firebase.database().ref("estudante/"+id_estudante).update(estudante)
    .then(function(result){
  
        alert("Atualizado com Sucesso!");
        location.href = "listarestudantes.html";
  
    })
    .catch(function(error){
  
      alert("Erro ao atualizar");
      console.log(error.message);
  
    });
  
  }
  