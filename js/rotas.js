function minhasrotas() {

    firebase.database().ref("rota").orderByChild('cod_estudante')
    .on("value", function(estudante){
    
      var html = "";
      
      
      var html_estudante = "";
      estudante.forEach(function(retorno){

        
        firebase.database().ref('estudante/'+retorno.val().cod_estudante)
        .on("value", function(estudante){
          
          
          html_estudante += '<tr>'+             
                                 '<td>'+estudante.val().nomeest +'</td>'+
                                 '<td>'+estudante.val().endereco +'</td>'+
                                 '<td>'+estudante.val().escola +'</td>'+
                                 '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+
                                 '<td><button onclick=\'removerEstudanteRota("'+ estudante.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
								 '<td> <input type="checkbox" class="form-check-input" id="exampleCheck1"> <label class="form-check-label" for="exampleCheck1">Faltou</label></td>'+
                                 '</tr>';
          
          $('#conteudoTabelaEstudantesRotas').html(html_estudante);

        }); 

      });
     
    });  
    
};


function removerEstudanteRota(id_estudante, id_responsavel) {
  
    var deseja_apagar = confirm("Deseja apagar?");
  
    if (deseja_apagar==false) {
      return false;
    }
   
   firebase.database().ref("rota")
   .orderByChild('cod_estudante').equalTo(id_estudante).on("child_added",function(snapshot){
    
    console.log(snapshot.key)

      firebase.database().ref("rota/"+snapshot.key).remove()
      .then(function(result)
      {          
    
            
          alert("Removido com Sucesso!");

        })
        .catch(function(error){

          alert("Erro ao remover");
          console.log(error.message);

        });
   
      
  });

}

