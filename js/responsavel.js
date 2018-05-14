function listarResponsaveis() {

    firebase.database().ref("responsavel")
    .on("value", function(responsavel){
  
      var html = "";
  
      responsavel.forEach(function(responsavel){
  
          html += '<tr>'+             
                '<td>'+responsavel.val().nome+'</td>'+
                '<td>'+responsavel.val().telefone+'</td>'+
                '<td class="hidden-xs">'+responsavel.val().email+'</td>'+
                '<td><button onclick=\'editarResponsavel("'+ responsavel.key +'")\' class="btn btn-warning" href="listarresponsavel.html"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                '<td><button onclick=\'removerResponsavel("'+ responsavel.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
              '</tr>';
  
      });
  
      $("#conteudoTabelaResponsavel").html(html);
  
    });
  
  }

  function removerResponsavel(id_responsavel) {

    var deseja_apagar = confirm("Deseja apagar?");
  
    if (deseja_apagar==false) {
      return false;
    }
  
    firebase.database().ref("responsavel/"+id_responsavel).remove()
    .then(function(result){
  
      alert("Removido com Sucesso!");
  
    })
    .catch(function(error){
  
      alert("Erro ao remover");
      console.log(error.message);
  
    });
  
  }
  
function editarResponsavel(id_responsavel) {

    localStorage.setItem("id_responsavel", id_responsavel);
    location.href = "editarresponsavel.html";
  
  }
  
  function obterResponsavel() {
  
    var id_responsavel = localStorage.getItem("id_responsavel");
  
    firebase.database().ref("responsavel/"+id_responsavel)
    .once("value", function(responsavel){
  
      $("#nome").val( responsavel.val().nome );
      $("#email").val( responsavel.val().email );
      $("#telefone").val( responsavel.val().telefone );
      
  
  
    });
  
  }
  
  function confirmarEditarResponsavel() {
  
    var id_responsavel = localStorage.getItem("id_responsavel");
  
      let nome = $("#nome").val();
      let email = $("#email").val();
      let telefone = $("#telefone").val();
      
      
  
        var responsavel = {
          
          nome: nome,
          telefone: telefone,
          email: email,
          endereco: endereco
          
    };
  
    firebase.database().ref("responsavel/"+id_responsavel).update(responsavel)
    .then(function(result){
  
        alert("Atualizado com Sucesso!");
        location.href = "listarresponsavel.html";
  
    })
    .catch(function(error){
  
      alert("Erro ao atualizar");
      console.log(error.message);
  
    });
  
  }
  


