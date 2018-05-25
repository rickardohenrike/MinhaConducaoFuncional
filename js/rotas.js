function minhasrotas() {

  firebase.database().ref("rota").orderByChild('cod_estudante')
  .on("value", function(estudante){
    
    var html = "";

    estudante.forEach(function(retorno){
      console.log(retorno.val().cod_estudante);
      firebase.database().ref('estudante/'+retorno.val().cod_estudante)
	    .on("value", function(estudante){

        console.log(estudante.val().endereco);
        $('#teste').text(estudante.val().endereco);

        html = '<tr><td>'+estudante.val().endereço+'</td></tr>';


        // html += '<tr>'+             
			  // '<td>'+estudante.val().nomeest+'</td>'+
			  // '<td>'+estudante.val().endereco+'</td>'+
        // '<td>'+estudante.val().escola+'</td>'+
        // '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+
		  	// '<td> <input type="checkbox" class="form-check-input" id="exampleCheck1"> <label class="form-check-label" for="exampleCheck1">Faltou</label></td>'+
			 
        //     '</tr>';
          });
        
          
    });
    $('#conteudoTabelaEstudantesRotas').html(html);
     });
    
};
